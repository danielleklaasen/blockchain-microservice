import { sha256 } from 'js-sha256';
import { IBlock } from '../types/types';
import logger from '../util/logger';
// tslint:disable-next-line
import Block from './block';

export default class Blockchain {
  public blocks: IBlock[];
  public currentTransactions: string[];

  constructor(genesisBlock) { // genesisBlock = first block
    this.currentTransactions = [];
    this.blocks = [];
    this.addBlock(genesisBlock);
  }

  public newTransaction(data) {
    const transaction = JSON.stringify(data);
    this.currentTransactions.push(transaction);
  }

  public addBlock(block) {
    if (this.blocks.length === 0) { // genesis block
      block.previousHash = '0000000000000000';
      block.hash = this.generateHash(block);
    }

    this.blocks.push(block);
  }

  public getNextBlock(transactions) { // mining
    const block = new Block();

    this.currentTransactions.forEach((transaction) => {
      block.addTransaction(transaction);
    });

    const previousBlock = this.getPreviousBlock();

    block.index = this.blocks.length;
    block.previousHash = previousBlock.hash;
    block.hash = this.generateHash(block);

    return block;
  }

  public getPreviousBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  private generateHash(block) {
    return sha256(block.key);
  }
}
