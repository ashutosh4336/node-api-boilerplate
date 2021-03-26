import mongoose from 'mongoose';

const DOCUMENT_NAME = 'Month';
const COLLECTION_NAME = 'months';

export const monthCode = {
  JANUARY: 'january',
  FEBRUARY: 'february',
  MARCH: 'march',
  APRIL: 'april',
  MAY: 'may',
  JUNE: 'june',
  JULY: 'july',
  AUGUST: 'august',
  SEPTEMBER: 'september',
  OCTOBER: 'october',
  NOVEMBER: 'november',
  DECEMBER: 'december',
};

const MonthSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
    },
    value: {
      type: mongoose.Schema.Types.String,
      required: true,

      enum: [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december',
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Month = mongoose.model(DOCUMENT_NAME, MonthSchema, COLLECTION_NAME);

export default Month;
