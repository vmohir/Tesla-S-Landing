import { App } from './scripts/app';
import { car100DId, carP100DId, formId } from './constants/dom-selectors.constant';
import { DomUtils } from './scripts/dom.utils';
import { DarkModeToggle } from './scripts/dark-mode-toggle';

DomUtils.docReady().then(() => {
  const app = new App(car100DId, carP100DId, formId);
  app.setupApp();
  new DarkModeToggle();
});
