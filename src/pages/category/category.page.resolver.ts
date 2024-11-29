import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RedirectCommand,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AppError, INewsRequestSucces, NewsAPISertvice } from '@common';
import { catchError, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { NewsAPIResolverService } from 'service/news.api.service';

export const categoryPageResolver: ResolveFn<INewsRequestSucces> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const category = route.params['cat'];
  const apiService = inject(NewsAPIResolverService);
  const router = inject(Router);

  return apiService.getNewsByCategory(category).pipe(
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

  // return fromFetch<INewsRequestSucces>(urlBuilder.toString(), {
  //   selector: (res) => res.json(),
  // });
};
