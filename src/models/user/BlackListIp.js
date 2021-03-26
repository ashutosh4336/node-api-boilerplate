// @ts-nocheck
import mongoose from 'mongoose';

const DOCUMENT_NAME = 'Blacklistip';
const COLLECTION_NAME = 'blaclistips';

const BlackListIpSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      trim: true,
      required: [true, 'Please Provide an IP address'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME,
  }
);

const BlackListIp = mongoose.model(DOCUMENT_NAME, BlackListIpSchema);
export default BlackListIp;
