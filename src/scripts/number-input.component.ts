export class NumberInputComponent {
  constructor(
    private spinUpElm: HTMLButtonElement,
    private spinDownElm: HTMLButtonElement,
    private inputElm: HTMLInputElement,
  ) {
    this.handleDisablingSpinElements();

    spinUpElm.addEventListener('click', () => {
      this.stepUp();
      this.handleValueChange();
      this.inputElm.focus();
    });
    spinDownElm.addEventListener('click', () => {
      this.stepDown();
      this.handleValueChange();
      this.inputElm.focus();
    });

    // Only allow arrow up and down. Prevent entering numbers directly
    inputElm.addEventListener('keydown', (e) => {
      if (/^[\de ]$/.exec(e.key) && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        e.preventDefault();
      }
    });

    inputElm.addEventListener('input', (e) => {
      console.log('#ee e', e);
      this.handleDisablingSpinElements();
    });
  }

  private stepDown() {
    try {
      this.inputElm.stepDown();
    } catch (_) {
      // fix old browsers bug: https://stackoverflow.com/questions/22748502/testing-for-stepup-and-stepdown-method-support
      const step = parseInt(this.inputElm.step, 10);
      this.inputElm.value = (parseInt(this.inputElm.value, 10) - step).toString();
    }
  }

  private stepUp() {
    try {
      this.inputElm.stepUp();
    } catch (_) {
      // fix old browsers bug: https://stackoverflow.com/questions/22748502/testing-for-stepup-and-stepdown-method-support
      const step = parseInt(this.inputElm.step, 10);
      this.inputElm.value = (parseInt(this.inputElm.value, 10) + step).toString();
    }
  }

  private handleValueChange() {
    this.inputElm.dispatchEvent(new Event('change'));
    this.handleDisablingSpinElements();
  }

  handleDisablingSpinElements() {
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
