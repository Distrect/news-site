import { Routes } from '@angular/router';
import { categoryPageResolver } from '@pages/category';
import { topNewsResolver } from '@pages/home';
import { searchNews } from '@pages/search';
import { ErrorPage } from '@pages/error';
import { NewsAPIResolverService } from 'service/news.api.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@pages/home').then((page) => page.HomePage),
    title: 'Home',
    providers: [NewsAPIResolverService],
    resolve: {
      news: topNewsResolver,
    },
  },
  {
    path: 'category/:cat',
    loadComponent: () =>
      import('@pages/category').then((page) => page.CategoryPage),
    providers: [NewsAPIResolverService],
    title: 'Category',
    resolve: {
      categoryData: categoryPageResolver,
    },
  },
  {
    path: 'search',
    loadComponent: () =>
      import('@pages/search').then((page) => page.SearchPage),
    providers: [NewsAPIResolverService],
    title: 'Search',

    resolve: {
      news: searchNews,
    },
  },
  {
    path: 'about',
    loadComponent: () => import('@pages/about').then((page) => page.AboutPage),
  },
  {
    path: '**',
    component: ErrorPage,
  },
];
