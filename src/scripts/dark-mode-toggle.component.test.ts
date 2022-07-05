import { createElementFromHTML } from '../tests/utils/dom-test-utils';
import { DarkModeToggleComponent } from './dark-mode-toggle.component';

describe('DarkModeToggleComponent', () => {
  let darkModeToggleComponent!: DarkModeToggleComponent;
  const inputElm = createElementFromHTML<HTMLInputElement>(`<input />`);
  // jest.spyOn(DarkModeToggleComponent.prototype as any, 'getCarData').mockImplementation(() => {});
  // jest.mock('fetch');

  global.matchMedia = jest.fn(() => false) as jest.Mock;
  global.localStorage.getItem = jest.fn((_) => 'false') as jest.Mock;
  global.localStorage.setItem = jest.fn((_, __) => undefined) as jest.Mock;

  const updateDomColorSchemeSpy = jest.spyOn(
    DarkModeToggleComponent.prototype,
    'updateDomColorScheme',
  );

  beforeEach(() => {
    darkModeToggleComponent = new DarkModeToggleComponent(inputElm);
  });

  it('should update boy color-scheme attribute', () => {
    darkModeToggleComponent.updateDomColorScheme('dark');
    expect(document.documentElement.getAttribute('color-scheme')).toBe('dark');
  });

  it('should listen to dark mode checkbox changes', () => {
    expect(updateDomColorSchemeSpy).toBeCalled();
  });
});
