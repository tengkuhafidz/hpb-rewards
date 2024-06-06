import browser from 'webextension-polyfill';
import { type BrowserMessageType, type ColorScheme } from './models';
import { MERCHANTS } from './utils/merchants';

console.log('background script running...');

browser.runtime.onInstalled.addListener(async () => {
  for (const cs of browser.runtime.getManifest().content_scripts) {
    for (const tab of await browser.tabs.query({ url: cs.matches })) {
      if (tab.url.match(/(chrome|chrome-extension):\/\//gi)) {
        continue;
      }
      browser.scripting.executeScript({
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
  if (tab.url.includes(MERCHANTS.FAIRPRICE)) {
    browser.tabs.sendMessage(tabId, {
      type: MERCHANTS.FAIRPRICE,
      currPage,
    });
  }
  if (tab.url.includes(MERCHANTS.LAZADA)) {
    browser.tabs.sendMessage(tabId, {
      type: MERCHANTS.LAZADA,
      currPage,
    });
  }
  if (tab.url.includes(MERCHANTS.SHOPEE)) {
    browser.tabs.sendMessage(tabId, {
      type: MERCHANTS.SHOPEE,
      currPage,
    });
  }
});

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('got message', message);
  switch (message.type as BrowserMessageType) {
    case 'gotColorScheme': {
      updateIcon(message.value as ColorScheme).then(sendResponse);
      return true;
    }
  }
});

async function updateIcon(colorScheme: ColorScheme) {
  console.log('updating icon', colorScheme);
  // do work here
}

browser.storage.onChanged.addListener((changes, namespace) => {
  for (let key in changes) {
    let storageChange = changes[key];
    console.log("Storage Changes",storageChange);
    console.log(`Storage key "${key}" in namespace "${namespace}" changed.`);
    // Note: Perform actions based on the change
    // It will contain storageChange.newValue and .oldValue
  }
});
