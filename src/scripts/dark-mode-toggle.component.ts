export class DarkModeToggleComponent {
  private readonly COLOR_SCHEME_STORAGE_KEY = 'color-scheme';
  private readonly carImageLightElm = document.getElementById('car-image-light');
  private readonly carImageDarkElm = document.getElementById('car-image-dark');

  constructor(darkModeCheckboxElm: HTMLInputElement) {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const storedMode = localStorage.getItem(this.COLOR_SCHEME_STORAGE_KEY);

    darkModeCheckboxElm.checked = storedMode === 'dark' || prefersDarkScheme.matches;
    this.updateDomColorScheme(darkModeCheckboxElm.checked ? 'dark' : 'light');

    darkModeCheckboxElm.addEventListener('change', () => {
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

  updateDomColorScheme(colorScheme: 'dark' | 'light') {
    document.documentElement.setAttribute('color-scheme', colorScheme);
    this.handleCarImage(colorScheme);
  }
}
