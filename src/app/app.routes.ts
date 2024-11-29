import { Routes } from '@angular/router';
import { CategoryPage, categoryPageResolver } from '@pages/category';
import { HomePage, topNewsResolver } from '@pages/home';
import { searchNews } from '@pages/search';
import { ErrorPage } from '@pages/error';
import { SearchPage } from '@pages/search';
import { NewsAPIResolverService } from 'service/news.api.service';
import { AboutPage } from '@pages/about';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    title: 'Home',
    providers: [NewsAPIResolverService],
    resolve: {
      news: topNewsResolver,
    },
  },
  {
    path: 'category/:cat',
    component: CategoryPage,
    providers: [NewsAPIResolverService],
    title: 'Category',

    resolve: {
      categoryData: categoryPageResolver,
    },
  },
  {
    path: 'search',
    component: SearchPage,
    providers: [NewsAPIResolverService],
    title: 'Category',

    resolve: {
      news: searchNews,
    },
  },
  {
    path: 'about',
    component: AboutPage,
  },
  {
    path: '**',
    component: ErrorPage,
  },
];
