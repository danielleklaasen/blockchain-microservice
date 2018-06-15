import * as mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    currentTransactions: [String],
    blocks: [Object]
  },
  {
    timestamps: {
      createdAt: 'created_ad',
    },
  });

const BlockchainSchema = mongoose.model('Blockchain', schema);
export default BlockchainSchema;
