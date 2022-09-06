import { DateTimeFormatter } from 'src/utils/DateTimeFormatter/DateTimeFormatter';

describe('DateTimeFormatter', () => {
  const nowTimestamp = new Date().getTime();
  const yesterdayTimestamp = new Date(
    new Date().setDate(new Date().getDate() - 1)
  ).getTime();
  const testTimestamp1 = new Date(875300400000).getTime(); // 26/09/1997
  it('should run formattedDate() method and return "Today"', () => {
    const todayDateTimeFormatter = new DateTimeFormatter(nowTimestamp);
    expect(todayDateTimeFormatter.formattedDate).toBe('Today');
  });
  it('should run formattedDate() method and return "Yesterday"', () => {
    const yesterdayDateTimeFormatter = new DateTimeFormatter(
      yesterdayTimestamp
    );
    expect(yesterdayDateTimeFormatter.formattedDate).toBe('Yesterday');
  });
  it('should run formattedDate() method and return "26/09/1997"', () => {
    const dateTimeFormatter = new DateTimeFormatter(testTimestamp1);
    expect(dateTimeFormatter.formattedDate).toBe('26/09/1997');
  });
});
