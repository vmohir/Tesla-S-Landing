export class DomUtils {
  static docReady() {
    return new Promise((resolve) => {
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        resolve(undefined);
      } else {
        document.addEventListener('DOMContentLoaded', () => {
          resolve(undefined);
        });
      }
    });
  }
}
