import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INewsRequestSucces, NewsAPISertvice } from '@common';

@Injectable({ providedIn: 'root' })
export class NewsAPIResolverService extends NewsAPISertvice {
  constructor(private httpClient: HttpClient) {
    super();
  }

  public getTopHeadlines() {
    return this.httpClient.get<INewsRequestSucces>(this.topHeadlines);
  }

  public getNewsByCategory(category: string) {
    const urlBuilder = new URL(this.topHeadlines);

    urlBuilder.searchParams.append('category', category);
    return this.httpClient.get<INewsRequestSucces>(urlBuilder.toString());
  }

  public searchNews(q: string, page?: number) {
    const urlBuidler = new URL(this.topHeadlines);
    urlBuidler.searchParams.append('q', q);

    if (page) urlBuidler.searchParams.append('page', page.toString());

    return this.httpClient.get<INewsRequestSucces>(urlBuidler.toString());
  }
}
