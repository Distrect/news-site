import { inject } from '@angular/core';
import { ResolveFn, Router, RedirectCommand } from '@angular/router';
import { AppError, INewsRequestSucces } from '@common';
import { catchError, of } from 'rxjs';
import { NewsAPIResolverService } from 'service/news.api.service';

export const topNewsResolver: ResolveFn<INewsRequestSucces | AppError> = () => {
  const apiresolver = inject(NewsAPIResolverService);
  const router = inject(Router);
  return apiresolver.getTopHeadlines().pipe(
    catchError((err) => {
      const { error, message, name, status, statusText } = err;
      return of(
        new RedirectCommand(router.createUrlTree(['**']), {
          state: {
            error: new AppError(
              error.message || message || 'An error occurred',
              status || 500
            ),
          },
        })
      );
    })
  );
};
