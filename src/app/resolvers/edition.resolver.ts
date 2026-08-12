resolve(route: ActivatedRouteSnapshot): Observable<SiteEditionEntry> {
  const slug = route.paramMap.get('editionSlug');
  const entry = this.editionContext.getEditionEntry(slug);
  const fileConfigUrl = this.editionContext.getFileConfigUrl(entry.configBase);

  return from(this.appConfig.loadEditionBundle(fileConfigUrl)).pipe(
    tap(() => this.editionContext.setActiveEdition(entry)),
    map(() => entry),
  );
}