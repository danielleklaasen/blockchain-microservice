import { Request, Response } from 'express';
import Block from '../models/Block';
import Blockchain from '../models/Blockchain';
import logger from '../util/logger';

const maxTransactions = 2;
// TODO: connect to mongo
// if no blockchain collection: init blockchain
const genesisBlock = new Block();
const blockchain = new Blockchain(genesisBlock);
logger.info('initialize blockchain');

/**
 * POST /
 * Transaction (activity log)
 */
export let addTransaction = (req: Request, res: Response) => {
  // TODO: add validation for incoming transaction (if needed)
  let message = "Transaction added. ";
  blockchain.newTransaction(req.body); // TODO: mongo blockchain collection

  if (blockchain.currentTransactions.length === maxTransactions) {
    generateBlock();
    message += "Block generated and Transactions cleared.";
  }

  logger.info(message);
  res.send(req.body);
};

/**
 *
 * Generate a block and add it to the blockchain.
 */
export let generateBlock = () => {
  // TODO: mongo blockchain collection
  const block = blockchain.getNextBlock(blockchain.currentTransactions);
  blockchain.addBlock(block);
  blockchain.currentTransactions = [];
};

/**
 * GET /blockchain
 * Return full blockchain
 */
export let getBlockchain = (req: Request, res: Response) => {
  // TODO: blockchain from mongo
  res.json(blockchain);
};
