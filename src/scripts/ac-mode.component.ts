import { acModeDataAttribute } from '../constants/dom-selectors.constant';
import { COOL_HEAT_TRESHOLD } from '../constants/calculator.constant';

export class AcModeComponent {
  constructor(
    private tempControlElm: HTMLInputElement,
    private acModeElm: HTMLElement,
    private acCheckboxElm: HTMLInputElement,
  ) {
    this.setup();
  }

  private setup() {
    this.updateAcMode();

    this.tempControlElm.addEventListener('change', () => {
      this.updateAcMode();
    });
  }

  updateAcMode() {
    const oldMode = this.acModeElm.getAttribute(acModeDataAttribute);
    const newMode = AcModeComponent.getModeFromValue(this.tempControlElm.value);
    this.acModeElm.setAttribute(acModeDataAttribute, newMode);
    if (oldMode !== newMode) {
      this.acCheckboxElm.checked = false;
      this.acCheckboxElm.dispatchEvent(new Event('change'));
    }
  }

  static getModeFromValue(value: string) {
    return parseInt(value, 10) > COOL_HEAT_TRESHOLD ? 'cool' : 'heat';
  }
}
