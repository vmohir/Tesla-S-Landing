import { AcModeComponent } from './ac-mode.component';
import { acModeDataAttribute } from '../constants/dom-selectors.constant';
import { createElementFromHTML } from '../tests/utils/dom-test-utils';

describe('AcModeComponent', () => {
  let acModeComponent!: AcModeComponent;
  const tempControlElm = createElementFromHTML<HTMLInputElement>(`<input type="number"/>`);
  const acModeElm = createElementFromHTML<HTMLElement>(`<div></div>`);
  const acCheckboxElm = createElementFromHTML<HTMLInputElement>(`<input type='checkbox' />`);

  const updateAcModeSpy = jest.spyOn(AcModeComponent.prototype, 'updateAcMode');

  beforeEach(() => {
    acModeComponent = new AcModeComponent(tempControlElm, acModeElm, acCheckboxElm);
  });

  it('should call updateAcMode method when form temp input changes', () => {
    tempControlElm.dispatchEvent(new Event('change'));
    expect(updateAcModeSpy).toBeCalledTimes(2);
  });

  it.each([
    ['20', 'cool'],
    ['10', 'heat'],
    ['40', 'cool'],
  ])('should update ac mode when temperature is changed', (temp, mode) => {
    tempControlElm.value = temp;
    tempControlElm.dispatchEvent(new Event('change'));
    expect(acModeElm.getAttribute(acModeDataAttribute)).toBe(mode);
  });
});
