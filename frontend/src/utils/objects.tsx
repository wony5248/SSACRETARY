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

class Log {
  crawlingId: Number;
  date: Date;
  keywords: Array<String>;
  matchCounts: Array<Number>;
  matchSentences: Array<String>;

  constructor(
    crawlingId: Number,
    date: Date,
    keywords: Array<String>,
    matchCounts: Array<Number>,
    matchSentences: Array<String>
  ) {
    this.crawlingId = crawlingId;
    this.date = date;
    this.keywords = keywords;
    this.matchCounts = matchCounts;
    this.matchSentences = matchSentences;
  }
}

class User {
  email: String;
  nickname: String;
  phone: String;

  constructor(email: String, nickname: String, phone: String) {
    this.email = email;
    this.nickname = nickname;
    this.phone = phone;
  }
}

export { Crawling, Log, User };
