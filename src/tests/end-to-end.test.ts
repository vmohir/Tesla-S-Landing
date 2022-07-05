import { Builder, By, ThenableWebDriver } from 'selenium-webdriver';

const url = 'http://localhost:9000/';

describe.skip('executing test scenario on the website www.selenium.dev', () => {
  let driver: ThenableWebDriver;
  beforeAll(async () => {
    driver = new Builder().forBrowser('chrome').build();
    await driver.get(url);
  });

  test.skip('it performs a validation of title on the home page', async () => {
    const title = await driver.findElement(By.tagName('h1')).getText();
    expect(title).toContain('SeleniumHQ Browser Automation');
  });

  afterAll(async () => {
    await driver.quit();
  }, 15000);
});

// beforeEach(() => {
//   initializeCityDatabase();
// });
