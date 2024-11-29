import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { AppError, IArticle, INewsRequestSucces } from '@common';
import { LoaderComponent } from 'components/loader/loader.component';
import { NewsCardComponent } from 'components/news-card/news-card.component';
import { PaginationComponent } from 'components/pagination/pagination.component';
import { CarouselComponent } from 'pages/home/carousel/carousel.component';
import { HomePageNewsService } from 'pages/home/home.api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CarouselComponent,
    NewsCardComponent,
    LoaderComponent,
    PaginationComponent,
  ],
  providers: [HomePageNewsService],
  templateUrl: './home.page.component.html',
  styleUrl: './home.page.component.scss',
})
export class HomePage implements OnInit {
  public routeData!: INewsRequestSucces;
  public restNews!: IArticle[];
  public isLoading: boolean = false;
  public pageArticles: Record<number, IArticle[]> = {};
  public currentPage = 1;

  public totalresults: number;
  public pageLoading = true;

  constructor(
    private hps: HomePageNewsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.routeData = this.activatedRoute.snapshot.data['news'];

    this.restNews = this.routeData.articles.slice(3);
    this.pageArticles[this.currentPage] = this.routeData.articles;
    this.totalresults = this.routeData.totalResults;
  }
  public ngOnInit(): void {}

  public getPaginationNumbers() {
    const x = Math.ceil(
      this.routeData.totalResults / this.routeData.articles.length
    );

    return new Array(x).fill(0).map((_, index) => index + 1);
  }

  public setPage(pageNum: number) {
    if (this.pageArticles[pageNum]) {
      this.currentPage = pageNum;
      return;
    }

    this.isLoading = true;
    this.hps.getTopHeadlinesWithPage(pageNum).subscribe({
      next: (data) => {
        this.pageArticles[pageNum] = data.articles;
        this.restNews = this.pageArticles[pageNum];
        this.currentPage = pageNum;
        this.isLoading = false;
      },
    });
  }
}
