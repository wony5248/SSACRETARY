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
export default Log;
