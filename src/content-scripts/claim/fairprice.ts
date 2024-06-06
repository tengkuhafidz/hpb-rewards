import { MerchantPoints, Store } from '../../constants';
import { fetchData, saveData } from '../../utils/storage';

export const processFairPriceClaim = async (currPage: string) => {
  const values = currPage.split('/');
  const orderId = values[values.length - 1];

  const fairPriceOrderIdSelector = `Delivery ID: ORD${orderId}`;

  const orderIdElementExist =
    document.documentElement.textContent ||
    document.documentElement.innerText.indexOf(fairPriceOrderIdSelector) > -1;
  const completedElementExist =
    document.documentElement.innerText.indexOf('Order delivered!') > -1;
  const orderCancelElementExist =
    document.documentElement.innerText.indexOf('Order cancelled') > -1;

  if (!currPage.includes(merchantClaimUrl(Store.FAIRPRICE, orderId))) {
    return;
  }

  if (!orderIdElementExist) {
    return;
  }

  if (orderCancelElementExist) {
    return;
  }

  if (!completedElementExist) {
    alert('The order is still being process...cannot be claimed');
    return;
  }

  const response = await fetchData('userId123');
  const data: MerchantPoints = response['userId123'];

  if (data) {
    const fairPriceOrders = data[Store.FAIRPRICE];
    const currentOrderIndex = fairPriceOrders.findIndex(
      order => order.orderId === orderId
    );

    if (currentOrderIndex >= 0) {
      const currentOrder = fairPriceOrders[currentOrderIndex];
      if (currentOrder.isClaimed) {
        alert(`This ${orderId} id is already claimed!`);
      } else {
        fairPriceOrders[currentOrderIndex] = {
          ...currentOrder,
          isClaimed: true
        };

        saveData(data, 'userId123');
        alert(`You have claimed ${currentOrder.points} HDB Points`);
      }
    }
  }
};
