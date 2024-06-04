import { getHcsItems } from '../utils/hcs';
// import browser from 'webextension-polyfill';
import { highlightFairpriceHcsItems } from './fairprice';

export const highlightHcsItems = () => {
  const hcsItems = getHcsItems();

  // TODO: add support for other merchants
  highlightFairpriceHcsItems(hcsItems);
};
