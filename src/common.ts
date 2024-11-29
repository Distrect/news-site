const API_KEY_1: Readonly<string> = '6e33a04fa73746f0828a75cdc3f2430a';

export abstract class NewsAPISertvice {
  protected readonly baseURL: string = `https://newsapi.org/v2`;
  protected readonly topHeadlines: string = `${this.baseURL}/top-headlines?apiKey=${API_KEY_1}&country=us&pageSize=20`;
}

export class AppError extends Error {
  constructor(
    public override message: string = 'An error occured',
    public code?: number,
    public options?: ErrorOptions
  ) {
    super(message, options);
  }
}

export type ArticleSource = {
  id: string | null;
  name: string;
};

export interface IArticle {
  source: ArticleSource;
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: null | string;
}

export interface INewsRequestSucces {
  status: 'ok';
  totalResults: number;
  articles: IArticle[];
}

export interface INewsRequestError {
  status: 'error';
  code: string;
  message: string;
}

export const categories: Readonly<string[]> = [
  'Business',
  'Entertainment',
  'General',
  'Health',
  'Science',
  'Sports',
  'Technology',
];

export type NewsFilter = {
  category: string | null;
  q: string | null;
};
