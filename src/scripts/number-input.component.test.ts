import { NumberInputComponent } from './number-input.component';

describe('NumberInputComponent', () => {
  let numberInputComponent!: NumberInputComponent;

  document.body.innerHTML = `<div class='number-input'>
    <input type='number' data-js-number-input min='10' step='10' max='50' />
    <button data-js-spin-up></button>
    <button data-js-spin-down></button>
  </div>`;
  const spinUpElm = document.querySelector('[data-js-spin-up]') as HTMLButtonElement;
  const spinDownElm = document.querySelector('[data-js-spin-down]') as HTMLButtonElement;
  const inputElm = document.querySelector('[data-js-number-input]') as HTMLInputElement;

  beforeEach(() => {
    numberInputComponent = new NumberInputComponent(spinUpElm, spinDownElm, inputElm);
  });

  it.each([
    ['10', true, false, '10'],
    ['50', false, true, '50'],
    ['40', false, false, '40'],
    ['0', true, false, '10'],
    ['60', false, true, '50'],
  ])(
    'should disable spin elements when the value is on edge',
    (value, isSpinDownDisabled, isSpinUpDisabled, result) => {
      inputElm.value = value;
      numberInputComponent.handleDisablingSpinElements();

      expect(spinDownElm.disabled).toBe(isSpinDownDisabled);
      expect(spinUpElm.disabled).toBe(isSpinUpDisabled);
      expect(inputElm.value).toBe(result);
    },
  );

  it.each([
    ['10', () => spinUpElm.click(), '20'],
    ['20', () => spinDownElm.click(), '10'],
    [
      '20',
      () => {
        spinDownElm.click();
        spinDownElm.click();
      },
      '10',
    ],
    [
      '30',
      () => {
        spinUpElm.click();
        spinUpElm.click();
        spinUpElm.click();
        spinUpElm.click();
      },
      '50',
    ],
  ])(
    'should update input value when spin elements are clicked',
    async (initialValue, clicks, result) => {
      inputElm.value = initialValue;

      clicks();
      setTimeout(() => {
        expect(inputElm.value).toBe(result);
      });
    },
  );
});
