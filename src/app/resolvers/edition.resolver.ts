import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConfig } from '../app.config';
import { SiteEditionEntry } from '../models/site-config';
import { EditionContextService } from '../services/edition-context.service';

@Injectable({
  providedIn: 'root',
})
export class EditionResolver implements Resolve<SiteEditionEntry> {
  constructor(
    private appConfig: AppConfig,
    private editionContext: EditionContextService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<SiteEditionEntry> {
    const slug = route.paramMap.get('editionSlug');
    const entry = this.editionContext.getEditionEntry(slug);
    const fileConfigUrl = this.editionContext.getFileConfigUrl(entry.configBase);

    console.log('[EVT] RESOLVER START');
    console.log('[EVT] slug:', slug);
    console.log('[EVT] configBase:', entry.configBase);
    console.log('[EVT] fileConfigUrl:', fileConfigUrl);

    return from(this.appConfig.loadEditionBundle(fileConfigUrl)).pipe(
      tap(() => {
        console.log('[EVT] BUNDLE LOADED');
        console.log('[EVT] AppConfig editionUrls:',
          AppConfig.evtSettings?.files?.editionUrls);
        console.log('[EVT] AppConfig editionTitle:',
          AppConfig.evtSettings?.edition?.editionTitle);

        this.editionContext.setActiveEdition(entry);

        console.log('[EVT] ACTIVE EDITION:',
          this.editionContext.activeSlug);
      }),
      map(() => entry),
    );
  }
}