import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INewsRequestSucces, NewsAPISertvice } from '@common';

@Injectable()
export class HomePageNewsService extends NewsAPISertvice {
  constructor(private httpClient: HttpClient) {
    super();
  }

  public getTopHeadlines() {
    return this.httpClient.get<INewsRequestSucces>(this.topHeadlines);
  }

  public getTopHeadlinesWithPage(page: number) {
    if (page <= 0) throw new Error('Page number cannot be 0');

    const url = new URL(this.topHeadlines);
    url.searchParams.append('page', page.toString());

    return this.httpClient.get<INewsRequestSucces>(url.toString());
  }
}
