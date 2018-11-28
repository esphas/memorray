
export class Memo {
  public readonly key: string;
  public readonly date: Date;
  public readonly note: string;

  public creating: boolean = false;

  constructor(key: string, date: Date, note?: string) {
    this.key = key;
    this.date = date;
    this.note = note || '';
  }

}

export default Memo;
