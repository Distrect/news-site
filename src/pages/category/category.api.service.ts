import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RedirectCommand, Router } from '@angular/router';
import {
  AppError,
  INewsRequestSucces,
  NewsAPISertvice,
  NewsFilter,
} from '@common';
import { catchError, of } from 'rxjs';

@Injectable()
export class CategoryAPIService extends NewsAPISertvice {
  constructor(private httpClient: HttpClient, private router: Router) {
    super();
  }

  public getCategoryFilter(category: string) {
    const urlBuilder = new URL(this.topHeadlines);
    urlBuilder.searchParams.append('category', category);

    return this.httpClient.get<INewsRequestSucces>(urlBuilder.toString());
  }

  public filterNews({ category, q }: NewsFilter, page: number | null = null) {
    const urlBuilder = new URL(this.topHeadlines);

    if (q) urlBuilder.searchParams.append('q', q);
    if (category) urlBuilder.searchParams.append('category', category);
    if (page) urlBuilder.searchParams.append('page', page.toString());

    return this.httpClient.get<INewsRequestSucces>(urlBuilder.toString());
  }
}
