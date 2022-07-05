export class NumberInputComponent {
  constructor(
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
