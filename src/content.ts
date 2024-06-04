import browser from 'webextension-polyfill';
import { MERCHANTS } from './utils/merchants';
import { getHcsItems } from './utils/hcs';
import { highlightFairpriceHcsItems } from './content-scripts/fairprice';

browser.runtime.onMessage.addListener((obj, sender, response) => {
    const { type } = obj;

    // TODO: add support for other merchants
    switch(type) {
        case MERCHANTS.FAIRPRICE:
            const hcsItems = getHcsItems();

            highlightFairpriceHcsItems(hcsItems);
            break;
    }
})