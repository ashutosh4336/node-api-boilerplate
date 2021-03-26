import mongoose from 'mongoose';

const DOCUMENT_NAME = 'Role';
const COLLECTION_NAME = 'roles';

const RoleCode = {
  USER: 'user',
  ADMIN: 'admin',
};

const RoleSchema = new mongoose.Schema(
  {
    value: {
      type: mongoose.Schema.Types.String,
      required: true,
      enum: [RoleCode.USER, RoleCode.ADMIN],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Role = mongoose.model(DOCUMENT_NAME, RoleSchema, COLLECTION_NAME);

export default Role;
