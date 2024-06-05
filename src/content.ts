import browser from 'webextension-polyfill';
import { highlightFairpriceHcsItems } from './content-scripts/fairprice';
import { MERCHANTS } from './utils/merchants';

browser.runtime.onMessage.addListener(async (obj, sender, response) => {
  const { type } = obj;
	
	// TODO: add support for other merchants
	switch (type) {
		case MERCHANTS.FAIRPRICE:
			highlightFairpriceHcsItems();
			break;
	}
});