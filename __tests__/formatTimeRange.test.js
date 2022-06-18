require('../src/bootstrap');

test('format time range of 1,30 and 10,30 returns 1:00 AM to 10:30 AM', () => {
  expect(formatTimeRange({hours:1,minutes:30},{hours:10,minutes:30})).toBe("1:30 AM to 10:30 AM");
});


test('format time range of 0,00 and 24,00 returns 12:00 AM to 12:00 PM', () => {
  expect(formatTimeRange({hours:0,minutes:0},{hours:24,minutes:0})).toBe("12:00 AM to 12:00 PM");
});