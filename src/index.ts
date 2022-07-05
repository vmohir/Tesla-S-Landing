import { App } from './scripts/app';
import { formId } from './constants/dom-selectors.constant';
import { DomUtils } from './scripts/dom.utils';
import { DarkModeToggleComponent } from './scripts/dark-mode-toggle.component';

DomUtils.docReady().then(() => {
  const calcForm = document.getElementById(formId);

  if (!(calcForm instanceof HTMLFormElement)) {
    return;
  }
  const app = new App(calcForm);
  app.setupApp();

  const darkModeCheckboxElm = document.getElementById('enable-dark-mode');
  if (!(darkModeCheckboxElm instanceof HTMLInputElement)) return;

  new DarkModeToggleComponent(darkModeCheckboxElm);
});
