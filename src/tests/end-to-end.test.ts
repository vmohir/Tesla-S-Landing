import { Builder, ThenableWebDriver } from 'selenium-webdriver';

const config = require('../../config.json');
const url = `http://localhost:${config.port}/`;

describe('End to end tests', () => {
  let driver: ThenableWebDriver;
  beforeAll(async () => {
    driver = new Builder().forBrowser('chrome').build();
    await driver.get(url);
  });

  it('should scroll to calculator on chevron down icon click', async () => {
    await driver.executeScript(() => {
      (document.querySelector('.scroll-to-calculator') as HTMLLinkElement).click();
    });
    expect(await driver.getCurrentUrl()).toContain('#range-calculator');
  });

  it.each([
    ['100', '20', false, '19', '594', '572'],
    ['90', '30', true, '21', '614', '577'],
  ])(
    'should calculate initial values for calculator',
    async (kmh, temp, ac, wheel, car100, carP100) => {
      await driver.executeScript(
        (kmh: string, temp: string, ac: boolean, wheel: string) => {
          (document.querySelector('[name="kmh"]') as HTMLInputElement).value = kmh;
          (document.querySelector('[name="temp"]') as HTMLInputElement).value = temp;
          (document.querySelector('[name="ac"]') as HTMLInputElement).checked = ac;
          (
            document.querySelector(`[name="wheelsize"][value="${wheel}"]`) as HTMLInputElement
          ).checked = true;
        },
        kmh,
        temp,
        ac,
        wheel,
      );
      // wait 100ms because form value changes aren't reflected immediately
      await new Promise((r) => setTimeout(r, 100));
      const areValuesCorrect = await driver.executeScript(
        (car100: string, carP100: string) => {
          return (
            (document.getElementById('100d-km') as HTMLElement).innerText === car100 &&
            (document.getElementById('p100d-km') as HTMLElement).innerText === carP100
          );
        },
        car100,
        carP100,
      );
      expect(areValuesCorrect).toBe(true);
    },
  );

  afterAll(async () => {
    await driver.quit();
  }, 15000);
});
