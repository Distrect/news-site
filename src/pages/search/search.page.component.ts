import { PaginationComponent } from 'components/pagination/pagination.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { IArticle, INewsRequestSucces } from '@common';
import { NewsCardComponent } from 'components/news-card/news-card.component';
import { NewsAPIResolverService } from 'service/news.api.service';
import { catchError, of, tap } from 'rxjs';
import { LoaderComponent } from 'components/loader/loader.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NewsCardComponent, PaginationComponent, LoaderComponent],
  templateUrl: './search.page.component.html',
  styleUrl: './search.page.component.scss',
})
export class SearchPage implements OnInit {
  public articles: IArticle[];

  public totalResults: number;
  public isLoading = false;

  public currentQuery: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private newsService: NewsAPIResolverService,
    private router: Router
  ) {
    this.articles = (<INewsRequestSucces>(
      activatedRoute.snapshot.data?.['news']
    )).articles;
    this.totalResults = (<INewsRequestSucces>(
      activatedRoute.snapshot.data?.['news']
    )).totalResults;

    this.currentQuery = this.activatedRoute.snapshot.queryParams?.['q'];
  }

  public ngOnInit(): void {
    this.router.events.subscribe((event) => this.routeEvent(event));
  }

  private routeEvent(evt: Event) {
    if (!(evt instanceof NavigationEnd)) return;
    const q = this.activatedRoute.snapshot.queryParams?.['q'];

    if (!q) throw new Error('q');

    this.currentQuery = q;

    this.newsService
      .searchNews(q)
      .pipe(
        tap((x) => {
          this.isLoading = true;
          this.totalResults = x.totalResults;
        }),
        catchError((err) => of(err))
      )
      .subscribe((data) => this.loadData(data));
  }

  public loadData(data: INewsRequestSucces) {
    this.articles = data.articles;
    this.isLoading = false;
  }

  private beforeRequest(data: INewsRequestSucces) {
    this.totalResults = data.totalResults;
    this.isLoading = true;
  }

  public changePage(page: number) {
    this.newsService
      .searchNews(this.currentQuery, page)
      .pipe(tap((data) => this.beforeRequest(data)))
      .subscribe((data) => this.loadData(data));
  }
}
