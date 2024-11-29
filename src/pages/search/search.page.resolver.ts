import { inject } from '@angular/core';
import {
  ResolveFn,
  Router,
  RedirectCommand,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AppError, INewsRequestSucces, NewsAPISertvice } from '@common';
import { catchError, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { NewsAPIResolverService } from 'service/news.api.service';

export const searchNews: ResolveFn<INewsRequestSucces | AppError> = (
  snapshot: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const apiresolver = inject(NewsAPIResolverService);
  const router = inject(Router);
  const q = snapshot.queryParams?.['q'];

  if (!q) throw new Error('Query param is missing');

  return apiresolver.searchNews(q).pipe(
    catchError((err) => {
      const { error, message, name, status, statusText } = err;
      return of(
        new RedirectCommand(router.createUrlTree(['**']), {
          state: {
            error: new AppError(
              error.message || message || 'An error occured',
              status || 500
            ),
          },
        })
      );
    })
  );
};
