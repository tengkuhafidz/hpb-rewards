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
  STORE = "tab-store",
  HEALTHPOINTS = "tab-healthpoints",
  HISTORY = "tab-history"
}

export interface Points {
  orderId: string;
  isClaimed: boolean;
  points: number;
}

export type MerchantPoints = {
  [key in Store]: Points[]
}

export type MerchantData = {
  [key in Store]: MerchantDataObj;
};

type MerchantDataObj = {
    logo: string;
    url: string;
    pendingPts: number;
    totalPts: number;
};

export type DisplayData = [Store, MerchantDataObj][];