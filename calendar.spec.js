const { test, expect } = require('C:/Users/monte/.copilot/session-state/36864685-c7b6-4341-9b40-0aaefdef4e07/node_modules/@playwright/test');

test('calendar navigation and event dialogs', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('#events-calendar-open').click();
  await expect(page.locator('#events-calendar-grid')).toBeVisible();
  await expect(page.locator('#events-view-all')).toBeVisible();
  await expect(page.locator('#calendar-dialog .events-legend-item')).toHaveCount(2);
  await expect(page.locator('#calendar-dialog .events-legend-item').nth(0)).toContainText('Dia selecionado');
  await expect(page.locator('#calendar-dialog .events-legend-item').nth(1)).toContainText('Dia com evento');
  await expect(page.locator('#calendar-dialog')).not.toContainText('Hoje');
  await expect(page.locator('#calendar-dialog .events-selected')).toHaveCount(0);

  await page.locator('#events-next-month').click();
  await expect(page.locator('#events-month-label')).not.toContainText('novembro');
  await page.locator('#events-prev-month').click();
  await expect(page.locator('#events-month-label')).toContainText('novembro');

  await page.keyboard.press('Escape');
  await expect(page.locator('#calendar-dialog')).not.toBeVisible();
  await page.locator('#events-calendar-open').click();
  await page.locator('#calendar-dialog .dialog-close').click();
  await expect(page.locator('#calendar-dialog')).not.toBeVisible();
  await page.locator('#events-calendar-open').click();

  const eventDay = page.getByRole('gridcell', { name: /18/ }).first();
  await eventDay.click();
  await expect(eventDay).toHaveAttribute('aria-selected', 'true');
  await expect(eventDay).toHaveClass(/has-event/);

  await page.locator('#events-view-all').click();
  await expect(page.locator('#events-dialog')).toBeVisible();
  await expect(page.locator('#events-dialog-list .event-list-button')).toHaveCount(4);
  await page.locator('#events-dialog-list .event-list-button').nth(1).click();
  await expect(page.locator('#events-dialog-detail')).toContainText('Passeio guiado');
});

test('calendar fits mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('#events-calendar-open').click();
  await expect(page.locator('#calendar-dialog')).toBeVisible();
  const box = await page.locator('#calendar-dialog').boundingBox();
  expect(box.width).toBeLessThanOrEqual(390);
  const body = await page.locator('#calendar-dialog .events-calendar-body').evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth
  }));
  expect(body.scrollWidth).toBeLessThanOrEqual(body.clientWidth + 1);
});
