import browser from 'webextension-polyfill';
import { highlightFairpriceHcsItems } from './content-scripts/highlight/fairprice';
import { observer } from './content-scripts/confirmation-modal';
import { MERCHANTS } from './utils/merchants';

// Observe in checkout page to inject the mock Place order button when it appears in the DOM
observer.observe(document, { childList: true, subtree: true });

browser.runtime.onMessage.addListener(async (obj, sender, response) => {
  const { type } = obj;

	// TODO: add support for other merchants
	switch (type) {
		case MERCHANTS.FAIRPRICE:
			highlightFairpriceHcsItems();
			break;
	}
});
