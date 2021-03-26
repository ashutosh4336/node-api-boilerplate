import mongoose from 'mongoose';

const DOCUMENT_NAME = 'Country';
const COLLECTION_NAME = 'countries';

const CountrySchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
    },

    countryName: {
      type: mongoose.Schema.Types.String,
      required: true,
    },

    aplhaTwo: {
      type: mongoose.Schema.Types.String,
      required: true,
    },

    aplhaThree: {
      type: mongoose.Schema.Types.String,
      required: true,
    },

    countryCode: {
      type: mongoose.Schema.Types.String,
      required: true,
    },

    iso: {
      type: mongoose.Schema.Types.String,
    },

    region: {
      type: mongoose.Schema.Types.String,
    },

    subRegion: {
      type: mongoose.Schema.Types.String,
    },

    intermediateRegion: {
      type: mongoose.Schema.Types.String,
    },

    regionCode: {
      type: mongoose.Schema.Types.String,
    },

    subRegionCode: {
      type: mongoose.Schema.Types.String,
    },

    intermediateRegionCode: {
      type: mongoose.Schema.Types.String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Country = mongoose.model(DOCUMENT_NAME, CountrySchema, COLLECTION_NAME);

export default Country;
