import { DEPARTMENT_IMAGES } from '../assets/departments';

/**
 * Resolves an asset URL so that it works seamlessly both on
 * localhost (http://localhost:5173/) and on GitHub Pages (https://<user>.github.io/<repo>/).
 */
export function getAssetUrl(url?: string): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  // Strip leading slash so it is evaluated relative to the current base
  const clean = url.startsWith('/') ? url.slice(1) : url;
  return clean.startsWith('./') ? clean : `./${clean}`;
}

/**
 * Returns the exact, unique bundled image for a specific clinical department.
 */
export function getDepartmentImageUrl(id?: string, currentImage?: string): string {
  if (id && DEPARTMENT_IMAGES[id]) {
    return DEPARTMENT_IMAGES[id];
  }
  return getAssetUrl(currentImage);
}
