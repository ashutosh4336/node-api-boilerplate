// @ts-nocheck
import colors from 'colors';

// Import Models
import AccountStatus from '../models/static/AccountStatus.js';
import Country from '../models/static/Country.js';
import Role from '../models/static/Role.js';
import Month from '../models/static/Month.js';

// IMPORT DATA
import {
  ROLEDATA,
  COUNTRIESDATA,
  MONTHDATA,
  ACCOUNTSTATUSDATA,
} from '../data/MasterData.js';

const createMasterData = async () => {
  try {
    console.log(
      '👋️ ' +
        colors.green.bold.underline('Hang On... Creating Master Data !!!')
    );

    const role = await Role.findOne({}).lean();
    if (!role) {
      let tempRole = [];

      ROLEDATA.forEach((item) => tempRole.push({ value: item }));
      await Role.insertMany(tempRole);
    }

    const accountStatus = await AccountStatus.findOne({}).lean();
    if (!accountStatus) {
      let tempAccountStatus = [];

      ACCOUNTSTATUSDATA.forEach((item) =>
        tempAccountStatus.push({ value: item })
      );
      await AccountStatus.insertMany(tempAccountStatus);
    }

    const month = await Month.findOne({}).lean();
    if (!month) {
      let tempMonth = [];

      MONTHDATA.forEach((item) => tempMonth.push({ value: item }));
      await Month.insertMany(tempMonth);
    }

    const countries = await Country.findOne({}).lean();
    if (!countries) {
      await Country.insertMany(COUNTRIESDATA);
    }
  } catch (err) {
    console.error(err);
  }
};

export default createMasterData;
