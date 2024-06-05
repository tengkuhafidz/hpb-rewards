import browser from 'webextension-polyfill';

export const saveData = (data:Record<string,any>,key:string) =>{
    browser.storage.sync.set({
        [key]:data
    });
}

export const fetchData = (key:String) => {
    return browser.storage.sync.get(key);
}