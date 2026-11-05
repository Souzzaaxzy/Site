/**
 * Resolves a path inside `public/` against Vite's configured base. With
 * `base: './'` this keeps the same build working at a domain root and under a
 * GitHub Pages project path such as `/Site/`.
 */
export function asset(path: string) {
  const base = import.meta.env.BASE_URL
  return `${base}${path.replace(/^\//, '')}`
}
