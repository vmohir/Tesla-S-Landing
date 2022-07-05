import { createElementFromHTML } from '../tests/utils/dom-test-utils';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let calculatorService!: CalculatorService;
  const formElm = createElementFromHTML<HTMLFormElement>(`<form>
    <input type='number' name='kmh' />
    <input type='number' name='temp' />
    <input type='checkbox' name='ac' />
    <input type='radio' name='wheelsize' value='19' />
    <input type='radio' name='wheelsize' value='21' />
  </form>`);

  beforeEach(() => {
    calculatorService = new CalculatorService(formElm);
  });

  it('should call onFormDataChange callback on form changes', () => {
    const spy = jest.fn();
    calculatorService.setupFormHandler({ onFormDataChange: spy });
    formElm.dispatchEvent(new Event('change'));
    expect(spy).toBeCalledTimes(2);
  });

  it('should calculate form data', () => {
    (formElm.querySelector('[name=kmh]') as HTMLInputElement).value = '100';
    (formElm.querySelector('[name=temp]') as HTMLInputElement).value = '100';
    (formElm.querySelector('[name=ac]') as HTMLInputElement).checked = true;
    (formElm.querySelector('[name=wheelsize][value="19"]') as HTMLInputElement).checked = true;
    formElm.dispatchEvent(new Event('change'));

    expect(calculatorService.getFormData()).toEqual({
      kmh: 100,
      temp: 100,
      ac: 'on',
      wheelSize: 19,
    });

    (formElm.querySelector('[name=ac]') as HTMLInputElement).checked = false;
    formElm.dispatchEvent(new Event('change'));

    expect(calculatorService.getFormData()).toEqual({
      kmh: 100,
      temp: 100,
      ac: 'off',
      wheelSize: 19,
    });
  });
});
