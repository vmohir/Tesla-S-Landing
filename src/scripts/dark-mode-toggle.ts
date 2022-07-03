export class DarkModeToggle {
  private readonly COLOR_SCHEME_STORAGE_KEY = 'color-scheme';
  private readonly carImageLightElm = document.getElementById('car-image-light');
  private readonly carImageDarkElm = document.getElementById('car-image-dark');

  constructor() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const storedMode = localStorage.getItem(this.COLOR_SCHEME_STORAGE_KEY);
    const darkModeCheckboxElm = document.getElementById('enable-dark-mode');

    if (!(darkModeCheckboxElm instanceof HTMLInputElement)) return;

    darkModeCheckboxElm.checked = storedMode === 'dark' || prefersDarkScheme.matches;
    this.updateDomColorScheme(darkModeCheckboxElm.checked ? 'dark' : 'light');

    darkModeCheckboxElm.addEventListener('change', (e) => {
      console.log('#ee e', e);
      const colorScheme = darkModeCheckboxElm.checked ? 'dark' : 'light';

      localStorage.setItem(this.COLOR_SCHEME_STORAGE_KEY, colorScheme);
      this.updateDomColorScheme(colorScheme);
    });
  }

  private handleCarImage(colorScheme: 'dark' | 'light') {
    if (
      !(this.carImageLightElm instanceof HTMLElement) ||
      !(this.carImageDarkElm instanceof HTMLElement)
    )
      return;

    this.carImageLightElm.style.display = colorScheme === 'light' ? 'initial' : 'none';
    this.carImageDarkElm.style.display = colorScheme === 'dark' ? 'initial' : 'none';
  }

  private updateDomColorScheme(colorScheme: 'dark' | 'light') {
    document.documentElement.setAttribute('color-scheme', colorScheme);
    this.handleCarImage(colorScheme);
  }
}
