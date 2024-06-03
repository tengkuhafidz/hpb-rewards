import { getHcsItems } from '../utils/hcs';
import { highlightFairpriceHcsItems } from './fairprice';

export const highlightHcsItems = () => {
  const hcsItems = getHcsItems();

  // TODO: add support for other merchants
  highlightFairpriceHcsItems(hcsItems);
};
