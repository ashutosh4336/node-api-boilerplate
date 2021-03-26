import mongoose from 'mongoose';

const DOCUMENT_NAME = 'AccountStatus';
const COLLECTION_NAME = 'account_status';

export const AccountCode = {
  NEW: 'new',
  ARCHIVED: 'archived',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

const AccountStatusSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
    },
    value: {
      type: mongoose.Schema.Types.String,
      required: true,
      enum: [
        AccountCode.NEW,
        AccountCode.ARCHIVED,
        AccountCode.APPROVED,
        AccountCode.REJECTED,
        AccountCode.ACTIVE,
        AccountCode.INACTIVE,
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AccountStatus = mongoose.model(
  DOCUMENT_NAME,
  AccountStatusSchema,
  COLLECTION_NAME
);

export default AccountStatus;
