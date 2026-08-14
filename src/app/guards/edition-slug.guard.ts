```typescript
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { EditionContextService } from '../services/edition-context.service';

@Injectable({
  providedIn: 'root',
})
export class EditionSlugGuard implements CanActivate {
  constructor(
    private editionContext: EditionContextService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const slug = route.paramMap.get('editionSlug');

    console.log('EDITION GUARD:', slug);
    console.log('SITE CONFIG:', this.editionContext.siteConfig);

    // If the site configuration has not loaded yet, don't reject the route.
    // The resolver will load the edition configuration.
    if (!this.editionContext.siteConfig) {
      console.log('SITE CONFIG NOT READY — allowing route');
      return true;
    }

    const valid = slug
      ? this.editionContext.isValidSlug(slug)
      : false;

    console.log('VALID SLUG:', valid);

    if (slug && valid) {
      return true;
    }

    return this.router.createUrlTree(['/']);
  }
}
```
