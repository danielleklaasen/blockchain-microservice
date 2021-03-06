export default class Block  {
  public index: number;
  public previousHash: string;
  public hash: string;
  public nonce: number;
  public transactions: string[];

  constructor() {
    this.index = 0; // position of the block inside the blockchain
    this.previousHash = '';
    this.hash = '';
    this.nonce = 0;
    this.transactions = [];
  }

  get key() {
    return JSON.stringify(this.transactions) + this.index + this.previousHash + this.nonce;
  }

  public addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}
