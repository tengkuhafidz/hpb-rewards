import { Store } from "../constants";

export const merchants = [
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


export const merchantClaimUrl = (store:Store,orderId:string) =>{
  switch(store){
    case Store.FAIRPRICE:
      return `https://www.fairprice.com.sg/orders/${orderId}`;
    case Store.SHENGSIONG:
      return `https://www.shengsiong.com.sg/orders/${orderId}`;
    case Store.SHOPEE:
      return `https://www.shopee.com.sg/orders/${orderId}`;
    default:
      return "";
  }
}