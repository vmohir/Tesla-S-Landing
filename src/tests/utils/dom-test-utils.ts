export function createElementFromHTML<T extends HTMLElement>(html: string) {
  const div = document.createElement('div');
  div.innerHTML = html.trim();
  return div.firstElementChild as T;
}
