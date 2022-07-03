import { CalculatorService } from './calculator.service';

export class NumberInputService {
  private readonly CLASS_NAME = 'number-input';
  constructor(private calculator: CalculatorService) {}

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

      new NumberInputComponent(this.calculator, spinUpElm, spinDownElm, inputElm);
    });
  }
}

class NumberInputComponent {
  constructor(
    private calculator: CalculatorService,
    private spinUpElm: HTMLButtonElement,
    private spinDownElm: HTMLButtonElement,
    private inputElm: HTMLInputElement,
  ) {
    this.handleDisablingSpinElements();

    spinUpElm.addEventListener('click', () => {
      inputElm.stepUp();
      this.handleValueChange();
    });
    spinDownElm.addEventListener('click', () => {
      inputElm.stepDown();
      this.handleValueChange();
    });

    // Only allow arrow up and down. Prevent entering numbers directly
    inputElm.addEventListener('keydown', (e) => {
      if (/^[\de ]$/.exec(e.key) && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        e.preventDefault();
      }
    });
  }

  private handleValueChange() {
    this.inputElm.dispatchEvent(new Event('change'));
    this.handleDisablingSpinElements();
    this.calculator.updateCarKilometers();
  }

  private handleDisablingSpinElements() {
    const min = parseInt(this.inputElm.min, 10);
    const value = parseInt(this.inputElm.value, 10);
    const max = parseInt(this.inputElm.max, 10);

    this.spinDownElm.disabled = min >= value;
    this.spinUpElm.disabled = max <= value;

    if (min > value) {
      this.inputElm.value = min.toString();
    }
    if (max < value) {
      this.inputElm.value = max.toString();
    }
  }
}
