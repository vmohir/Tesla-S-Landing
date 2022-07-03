import {
  acCheckboxId,
  acModeDataAttribute,
  tempControlInputId,
} from '../constants/dom-selectors.constant';
import { COOL_HEAT_TRESHOLD } from '../constants/calculator.constant';

export class AcModeService {
  constructor() {
    const tempControlElm = document.getElementById(tempControlInputId);
    const acModeElm = document.querySelector(`[${acModeDataAttribute}]`);
    const acCheckboxElm = document.getElementById(acCheckboxId);

    if (
      !(tempControlElm instanceof HTMLInputElement) ||
      !(acModeElm instanceof HTMLElement) ||
      !(acCheckboxElm instanceof HTMLInputElement)
    )
      return;

    new AcModeComponent(tempControlElm, acModeElm, acCheckboxElm);
  }
}

class AcModeComponent {
  constructor(
    private tempControlElm: HTMLInputElement,
    private acModeElm: HTMLElement,
    private acCheckboxElm: HTMLInputElement,
  ) {
    this.updateAcMode();

    tempControlElm.addEventListener('change', () => {
      this.updateAcMode();
    });
  }

  private updateAcMode() {
    const oldMode = this.acModeElm.getAttribute(acModeDataAttribute);
    const newMode = parseInt(this.tempControlElm.value, 10) > COOL_HEAT_TRESHOLD ? 'cool' : 'heat';
    this.acModeElm.setAttribute(acModeDataAttribute, newMode);
    if (oldMode !== newMode) {
      this.acCheckboxElm.checked = false;
      this.acCheckboxElm.dispatchEvent(new Event('change'));
    }
  }
}
