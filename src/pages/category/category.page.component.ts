import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  Event,
  NavigationEnd,
  RedirectCommand,
} from '@angular/router';
import { IArticle, INewsRequestSucces, NewsFilter, categories } from '@common';
import { LoaderComponent } from 'components/loader/loader.component';
import { NewsCardComponent } from 'components/news-card/news-card.component';
import { PaginationComponent } from 'components/pagination/pagination.component';
import { CategoryAPIService } from 'pages/category/category.api.service';
import { filter, tap } from 'rxjs';

interface IFilterNewsForm {
  category: FormControl<string | null>;
  query: FormControl<string>;
}

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [
    NewsCardComponent,
    HttpClientModule,
    LoaderComponent,
    ReactiveFormsModule,
    PaginationComponent,
  ],
  providers: [CategoryAPIService],
  templateUrl: './category.page.component.html',
  styleUrl: './category.page.component.scss',
})
export class CategoryPage implements OnInit {
  public categories = categories;
  public category: string;
  public news: IArticle[];
  public isLoading: boolean = false;

  public isFilterVisible: boolean = false;

  public totalCount: number;
  public resultCount: number;

  public currentFilters: NewsFilter = {
    category: null,
    q: null,
  };

  public filterForm = new FormGroup<IFilterNewsForm>({
    category: new FormControl<string | null>(''),
    query: new FormControl<string>('', { nonNullable: true }),
  });

  constructor(
    private categoryAPIService: CategoryAPIService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.category = this.activatedRoute.snapshot.params['cat'];
    this.news = this.activatedRoute.snapshot.data['categoryData'].articles;

    this.currentFilters.category = this.category;

    this.totalCount = (<INewsRequestSucces>(
      this.activatedRoute.snapshot.data['categoryData']
    )).totalResults;
    this.resultCount = this.news.length;
  }

  public ngOnInit(): void {
    this.router.events.subscribe((event) => this.routeEvent(event));
  }

  private routeEvent(evt: Event) {
    if (!(evt instanceof NavigationEnd)) return;
    this.filterForm.reset();
    const param = evt.url.split('/').filter((st) => st !== '')[1];

    this.isLoading = true;

    this.categoryAPIService
      .getCategoryFilter(param)
      .pipe(tap((data) => this.setPagination(data.totalResults)))
      .subscribe((data) => this.loadData(data));
  }

  private loadData(data: INewsRequestSucces) {
    this.news = data.articles;
    this.isLoading = false;
  }

  private setPagination(total: number) {
    this.totalCount = total;
    this.resultCount = 20;
  }

  public setFilterVisibility() {
    this.isFilterVisible = !this.isFilterVisible;
  }

  private checkIfFormIsEmpty() {
    return Object.values(this.filterForm.getRawValue()).every(
      (item) => item === ''
    );
  }

  public filterNews(event: MouseEvent) {
    event.preventDefault();

    if (this.checkIfFormIsEmpty()) return;

    const { category, query } = this.filterForm.getRawValue();

    this.currentFilters = {
      q: query === '' ? null : query,
      category: category === '' ? null : category,
    };

    this.categoryAPIService
      .filterNews(this.currentFilters)
      .subscribe((data) => this.loadData(data));
  }

  public changePage(event: number) {
    this.isLoading = true;
    this.categoryAPIService
      .filterNews(this.currentFilters, event)
      .pipe(tap((data) => this.setPagination(data.totalResults)))
      .subscribe((data) => this.loadData(data));
  }
}
