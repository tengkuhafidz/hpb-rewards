import { Store } from '../../constants';
import { merchantClaimUrl } from '../../utils/merchants';
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

  const response = await fetchData('userId123');
  const data = response['userId123'];

  if (data) {
    const fairPriceOrders = data[Store.FAIRPRICE];
    const currentOrderIndex = fairPriceOrders.findIndex(
      order => order.orderId === orderId
    );

    if (currentOrderIndex >= 0) {
      const currentOrder = fairPriceOrders[currentOrderIndex];
      if (orderCancelElementExist) {
        fairPriceOrders.splice(currentOrderIndex, 1);

        console.log('🚀 ~ processFairPriceClaim ~ data:', data);
        await saveData(data, 'userId123');
        alert(`Order has been cancelled, points will not be rewarded`);
        return;
      }
      if (!completedElementExist) {
        alert('The order is still being process...cannot be claimed');
        return;
      }

      if (currentOrder.isClaimed) {
        alert(`This ${orderId} id is already claimed!`);
        return;
      }
      fairPriceOrders[currentOrderIndex] = {
        ...currentOrder,
        isClaimed: true
      };

      await saveData(data, 'userId123');
      alert(`You have claimed ${currentOrder.points} HDB Points`);
    }
  }
};
