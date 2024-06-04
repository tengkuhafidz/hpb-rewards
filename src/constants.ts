const supportedMerchants = [
  {
    name: 'Fairprice',
    url: 'https://https://www.fairprice.com.sg'
  },
  {
    name: 'Shopee',
    url: 'https://shopee.sg'
  },
  {
    name: 'Lazada',
    url: 'https://shopee.sg'
  }
];

export enum Store {
  FAIRPRICE = "Fairprice",
  SHOPEE = "Shopee",
  LAZADA = "Lazada",
  SHENGSIONG = "Sheng Siong",
}

export enum TabId {
  SCORE = "tab-score",
  HEALTHPOINTS = "tab-healthpoints",
  HISTORY = "tab-history"
}