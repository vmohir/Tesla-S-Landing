import { acCheckboxId, acModeDataAttribute, tempControlInputId } from '../constants/dom-selectors.constant';
import { AcModeComponent } from './ac-mode.component';

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
