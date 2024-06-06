import browser from 'webextension-polyfill';
import { removeModalIfExists } from './content-scripts/confirmation-modal';
import { MERCHANTS } from './utils/merchants';

console.log('background script running...');

browser.runtime.onInstalled.addListener(async () => {
  for (const cs of browser.runtime.getManifest().content_scripts ?? []) {
    for (const tab of await browser.tabs.query({ url: cs.matches })) {
      if (tab.url?.match(/(chrome|chrome-extension):\/\//gi)) {
        continue;
      }

      if (!tab.id) {
        // to eliminate typing warning below
        continue;
      }

      await browser.scripting.executeScript({
        files: cs.js,
        target: { tabId: tab.id, allFrames: cs.all_frames },
        injectImmediately: cs.run_at === 'document_idle'
        // world: cs.world, // uncomment if you use it in manifest.json in Chrome 111+
      });
    }
  }
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab.url && changeInfo.status !== 'complete') {
    return;
  }

  const currPage = tab.url;
  if (tab.url?.includes(MERCHANTS.FAIRPRICE)) {
    browser.tabs.sendMessage(tabId, {
      type: MERCHANTS.FAIRPRICE,
      currPage
    });
  }
  if (tab.url?.includes(MERCHANTS.LAZADA)) {
    browser.tabs.sendMessage(tabId, {
      type: MERCHANTS.LAZADA,
      currPage
    });
  }
  if (tab.url?.includes(MERCHANTS.SHOPEE)) {
    browser.tabs.sendMessage(tabId, {
      type: MERCHANTS.SHOPEE,
      currPage
    });
  }

  // remove confirmation modal if user navigate else where
  browser.scripting.executeScript({
    target: { tabId },
    func: removeModalIfExists
  });
});

browser.storage.onChanged.addListener((changes, namespace) => {
  for (let key in changes) {
    let storageChange = changes[key];
    console.log('Storage Changes', storageChange);
    console.log(`Storage key "${ key }" in namespace "${ namespace }" changed.`);
    // Note: Perform actions based on the change
    // It will contain storageChange.newValue and .oldValue
  }
});
