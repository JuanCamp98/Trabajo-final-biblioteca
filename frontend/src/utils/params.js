export function removeEmptyValues(object) {
  return Object.fromEntries(Object.entries(object).filter(([, value]) => value !== ''));
}
