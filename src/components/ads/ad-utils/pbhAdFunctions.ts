import { AD_FUNCS_MAP } from '../ad-constants';
import { getAdId } from './getAdId';

type AdRegisterFunc = (id: string) => void;
interface AdRegisterFuncMap { [k: string]: AdRegisterFunc; }

// Don't load ads until we have at least this many registered
const MIN_AD_COUNT = 2;

// These are defined on the window object as part of the PBH ad api
interface PbhAdApi {
  PbhAdUnit_cmd: VoidFunction[];
  PbhAdUnit_load: VoidFunction[];
  pbh_start_ads: VoidFunction;
  pbh_ad_units: {
    [k: string]: {
      display: VoidFunction;
    };
  };
}

/**
 * GetCreateAdFuncForType
 *
 * This function takes an adType, resolves the associated pbh ad function name
 * and tries to resolve it from the window object.
 * Logs a console.warn if unsuccessful
 *
 * @param {String} adType - the type of add from the AD_TYPE enum in constants
 * @returns {Function} || {undefined}
 */
const getCreateAdFuncForType = (adType: string): AdRegisterFunc | undefined => {
  const adFuncName = AD_FUNCS_MAP[adType];
  const adFuncMap = (window as any) as AdRegisterFuncMap;

  const adFunc = adFuncMap[adFuncName];
  if (adFunc) {
    return adFunc;
  }

  console.error(`getCreateAdFuncForType: function ${adFunc} not found`);
};

let registered_ad_count = 0;

/**
 * GetIdFromGlobalAdRegistration
 *
 * Registers instance of PBH ad function for given ad type and returns the
 * associated ID. Used in the MakeAdComponent HOC.
 *
 * @param {String} adType - the type of add from the AD_TYPE enum in constants
 * @returns {String} id
 */
export const registerAd = (adType: string): string | undefined => {
  const adFunc = getCreateAdFuncForType(adType);
  if (!adFunc) {
    console.error('loading ad', adType, 'adFunc not found');
    return;
  }

  const adId = getAdId();

  setTimeout(() => {
    console.log('register', adId);
    registered_ad_count++;
    registerIdWithAdFunction(adFunc, adId);
  });

  return adId;
};

/**
 * StartAds
 *
 * Appends pbh_start_ads to the end of the PbhAdUnit_load queue array.
 * Used in the App component's componentDidMount method
 */
export const startAds = () => {
  if (registered_ad_count < MIN_AD_COUNT) {
    setTimeout(startAds);
    return;
  }
  const w = getAdApi();

  console.log('start');
  registerAdLoadCallback(w.pbh_start_ads);
};

/**
 * DisplayAd
 *
 * Appends display function for the ad instance to the end of the PbhAdUnit_cmd
 * queue array.
 * Used in the MakeAdComponent HOC's componentDidMount method
 */
export const displayAd = (adId: string) => {
  registerAdCommand(() => {
    const w = getAdApi();

    console.log('display', adId);

    try {
      w.pbh_ad_units[adId].display();
    } catch (e) {
      console.error('error displaying ad', adId);
    }
  });
};

/**
 * RegisterAdFunctionWithId
 *
 * Appends create function to the PbhAdUnit_load queue array
 * @param {Function} adFunc
 * @param {String} adId
 */
const registerIdWithAdFunction = (adFunc: Function, adId: string) => {
  registerAdLoadCallback(() => adFunc(adId));
};

function registerAdLoadCallback(cb: () => any) {
  const w = getAdApi();

  w.PbhAdUnit_load = w.PbhAdUnit_load || [];

  w.PbhAdUnit_load.push(cb);
}

function registerAdCommand(cb: () => void) {
  const w = getAdApi();

  w.PbhAdUnit_cmd = w.PbhAdUnit_cmd || [];

  w.PbhAdUnit_cmd.push(cb);
}

function getAdApi(): PbhAdApi {
  const w = (window as any) as PbhAdApi;
  return w;
}
