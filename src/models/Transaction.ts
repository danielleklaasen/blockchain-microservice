import * as mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    action: String,
    action_result: String,
    additionalData: {
      jobId: String,
    },
    category: String,
    createdAt: String,
    entity: {
      fullMessage: String,
      type: String,
      value: String,
    },
    error: String,
    subcategory: String,
    updatedAt: String,
    user: {
      email: String,
      fullname: String,
      id: String,
      role: [String],
    },
    vhost: String,
  },
  {
    timestamps: {
      createdAt: 'created_ad',
    },
  });

const transaction = mongoose.model('Transaction', transactionSchema);
export default transaction;
