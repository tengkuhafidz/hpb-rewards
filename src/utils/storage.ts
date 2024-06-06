import browser from 'webextension-polyfill';
import type { MerchantPoints } from '../constants';

export const saveData = async (data: MerchantPoints, key: string) => {
  await browser.storage.sync.set({
    [key]: data
  });
};

export const fetchData = async (key: String): Promise<Record<string, MerchantPoints>> => {
  return browser.storage.sync.get(key);
};