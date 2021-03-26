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

    nativeCountryName: {
      type: mongoose.Schema.Types.String,
    },

    phone: {
      type: mongoose.Schema.Types.String,
    },

    continent: {
      type: mongoose.Schema.Types.String,
    },

    capital: {
      type: mongoose.Schema.Types.String,
    },

    currency: {
      type: mongoose.Schema.Types.String,
    },

    languages: {
      type: mongoose.Schema.Types.Array,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * {
    countryName: 'Afghanistan',
    aplhaTwo: 'AF',
    aplhaThree: 'AFG',
    countryCode: '004',
    iso: 'ISO 3166-2:AF',
    region: 'Asia',
    subRegion: 'Southern Asia',
    intermediateRegion: '',
    regionCode: '142',
    subRegionCode: '034',
    intermediateRegionCode: '',
    nativeCountryName: 'افغانستان',
    phone: '93',
    continent: 'AS',
    capital: 'Kabul',
    currency: 'AFN',
    languages: ['ps', 'uz', 'tk'],
  },
 */

const Country = mongoose.model(DOCUMENT_NAME, CountrySchema, COLLECTION_NAME);

export default Country;
