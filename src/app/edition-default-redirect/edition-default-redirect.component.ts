import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteEditionEntry } from '../models/site-config';

@Component({
  selector: 'evt-edition-default-redirect',
  template: '',
})
export class EditionDefaultRedirectComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const edition = this.route.parent?.snapshot.data?.edition as SiteEditionEntry | undefined;
    const view = edition?.defaultViewMode ?? 'imageText';
    const editionSlug = this.route.parent?.snapshot.paramMap.get('editionSlug');

    if (editionSlug) {
      this.router.navigate(
        ['/', editionSlug, view],
        { replaceUrl: true }
      );
    }
  }
}