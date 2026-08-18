import { parseGhPagesRedirectUrl } from '../utils/gh-pages-url';

/**
 * GitHub Pages fallback.
 *
 * The 404.html script puts the requested Angular route into
 * the query string. Do not navigate here because AppConfig must
 * load site_config.json before the edition guard runs.
 */
export function normalizeGhPagesUrl(): () => void {
  return () => {
    const target = parseGhPagesRedirectUrl();

    if (target) {
      console.log('GH PAGES TARGET:', target);
      window.history.replaceState({}, '', target);
      console.log('NORMALIZED URL:', window.location.pathname);
    }
  };
}