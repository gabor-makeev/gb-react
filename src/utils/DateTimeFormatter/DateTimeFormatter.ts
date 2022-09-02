export class DateTimeFormatter {
  private readonly unixTime: number;
  private readonly date: Date;
  private readonly currentDate: Date;

  constructor(unixTime: number) {
    this.unixTime = unixTime;
    this.date = new Date(this.unixTime);
    this.currentDate = new Date();
  }

  get formattedDate() {
    if (this.isDateToday()) {
      return 'Today';
    } else if (this.isDateYesterday()) {
      return 'Yesterday';
    }

    return this.getDMYDate();
  }

  get amPmTimeString() {
    const hours = this.date.getHours();
    const minutes = this.date.getMinutes();

    if (hours >= 12) {
      if (hours === 12) {
        return `${hours}:${minutes}pm`;
      }
      return `${hours % 12}:${minutes}pm`;
    }

    if (hours === 0) {
      return `12:${minutes}am`;
    }

    return `${hours}:${minutes}am`;
  }

  getDMYDate() {
    const day = this.getDayOrMonthWithZero(this.date.getDate());
    const month = this.getDayOrMonthWithZero(this.date.getMonth() + 1);
    const year = this.date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  isDateToday() {
    return (
      this.date.getFullYear() === this.currentDate.getFullYear() &&
      this.date.getMonth() === this.currentDate.getMonth() &&
      this.date.getDate() === this.currentDate.getDate()
    );
  }

  isDateYesterday() {
    const today = new Date(this.currentDate);
    const yesterday = new Date(today.setDate(today.getDate() - 1));

    yesterday.setHours(
      this.date.getHours(),
      this.date.getMinutes(),
      this.date.getSeconds(),
      this.date.getMilliseconds()
    );

    return this.date.getTime() === yesterday.getTime();
  }

  getDayOrMonthWithZero(dayOrMonth: number) {
    return dayOrMonth.toString().length === 1 ? `0${dayOrMonth}` : dayOrMonth;
  }
}
