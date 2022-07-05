import { NumberInputComponent } from './number-input.component';

export class NumberInputService {
  private readonly CLASS_NAME = 'number-input';

  setupNumberInputs() {
    const numberInputs = document.getElementsByClassName(this.CLASS_NAME);
    Array.from(numberInputs).forEach((n) => {
      const spinUpElm = n.querySelector('[data-js-spin-up]');
      const spinDownElm = n.querySelector('[data-js-spin-down]');
      const inputElm = n.querySelector('[data-js-number-input]');

      if (
        !(spinUpElm instanceof HTMLButtonElement) ||
        !(spinDownElm instanceof HTMLButtonElement) ||
        !(inputElm instanceof HTMLInputElement)
      ) {
        console.warn('WARNING: some of mandatory elements in number-input are missing');
        return;
      }

      new NumberInputComponent(spinUpElm, spinDownElm, inputElm);
    });
  }
}
