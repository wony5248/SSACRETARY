class Crawling {
  name: String;
  email: String;
  type: String;
  keywords: Array<String>;
  url: String;
  period: Number;
  mailAlarm: Boolean;
  smsAlarm: Boolean;

  constructor(
    name: String,
    email: String,
    type: String,
    keywords: Array<String>,
    url: String,
    period: Number,
    mailAlarm: Boolean,
    smsAlarm: Boolean
  ) {
    this.name = name;
    this.email = email;
    this.type = type;
    this.keywords = keywords;
    this.url = url;
    this.period = period;
    this.mailAlarm = mailAlarm;
    this.smsAlarm = smsAlarm;
  }
}

export default Crawling;
