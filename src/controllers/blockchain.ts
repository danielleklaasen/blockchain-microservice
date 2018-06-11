import { Request, Response } from 'express';
import Block from '../models/Block';
import Blockchain from '../models/Blockchain';
import Transaction from '../models/Transaction';
import logger from '../util/logger';

export let initBlockChain = () => {
  /*const genesisBlock = new Block();
  const blockchain = new Blockchain(genesisBlock);
  */
  // blockchain mongodb research
  logger.info('initialize blockchain');
};
/**
 * POST /
 * Transaction (activity log)
 */
export let addTransaction = (req: Request, res: Response) => {
  logger.info('new transaction');
  const transaction = new Transaction({ any: req.body });
  logger.info('new transaction created');

  // Add authentication / authorization

  transaction.saveAsync()
    .then((log) => {
      res.send(log);
    })
    .catch((error) => {
      res.send(error);
    });
  logger.info('new transaction saved');
};
/**
 * GET /transactions
 * Return all transactions
 */
export let allTransactions = (req: Request, res: Response) => {
  Transaction.findAsync()
    .then((transactions) => {
      res.send(transactions);
    })
    .catch((error) => {
      res.send(error);
    });
};
/**
 * GET /block
 * Generate a block and add it to the blockchain.
 */
export let generateBlock = (req: Request, res: Response) => {
  res.send('Block generated. Haha NOT, its just a string');
  // check if there are transactions
  // if no then give error

  // find out where to init blockchain

  // const block = blockchain.getNextBlock(transactions);
  // blockchain.addBlock(block);

  // clear array of transactions

  // response
};
/**
 * GET /blockchain
 * Return full blockchain
 */
export let getBlockchain = (req: Request, res: Response) => {
  res.send('Hello Blockchain');
  // return full blockchain
};
