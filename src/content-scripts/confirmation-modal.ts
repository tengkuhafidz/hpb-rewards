import { Store, type MerchantPoints } from '../constants';
import { isHcsItem } from '../utils/hcs';
import { MERCHANTS } from '../utils/merchants';
import { fetchData, saveData } from '../utils/storage';

// to hijack the Place Order button
export const observer = new MutationObserver(_mutations => {
  const originalPlaceOrderButton = document.querySelector(
    '#floating-area-place-order div button'
  );

  if (!originalPlaceOrderButton) {
    return;
  }

  const placeOrderButton = document.createElement('button');
  placeOrderButton.className = originalPlaceOrderButton?.className ?? ''; // steal the original CSS
  placeOrderButton.innerText = 'Place Order [⚠️ FAKE ⚠️]';
  placeOrderButton.addEventListener('click', () => {
    void saveRewardsPointToStorage();
  });

  originalPlaceOrderButton.replaceWith(placeOrderButton);
  observer.disconnect();
});

const getItemsWithRewards = () => {
  const products: { productName: string; quantity: string }[] = [];
  const elements = document.querySelectorAll(
    '#product-group div[data-testid=cartProduct]'
  );

  elements.forEach(element => {
    if (isHcsItem(element.textContent)) {
      const productName =
        element.querySelector(
          'a[data-testid=cart-product-detail-link] > div > div > span > span:last-child'
        )?.textContent ?? '';
      const quantity = element.querySelector('input')?.value ?? '1';
      products.push({
        productName,
        quantity
      });
    }
  });

  return products;
};

const getMerchantFromUrl = (url: string) => {
  if (url.includes(MERCHANTS.FAIRPRICE)) {
    return Store.FAIRPRICE;
  }

  if (url.includes(MERCHANTS.LAZADA)) {
    return Store.LAZADA;
  }

  if (url.includes(MERCHANTS.SHOPEE)) {
    return Store.SHOPEE;
  }

  if (url.includes(MERCHANTS.SHENGSIONG)) {
    return Store.SHENGSIONG;
  }
};

export const saveRewardsPointToStorage = async () => {
  const products = getItemsWithRewards();
  if (products.length === 0) {
    console.log('No healthier choice items being purchased.');
    return;
  }

  const currentUrl = window.location.href;
  const currentStore = getMerchantFromUrl(currentUrl);
  if (!currentStore) {
    console.log('Current store not supported.');
    return;
  }

  // hardcode the orderId here, will need to have a function to get orderId for each type of Store
  const orderId = '64278725' || currentUrl.split('/').pop();
  const userId = 'userId123'; // hardcoding user id for demo
  let totalQuantity = 0;
  products.forEach(product => {
    totalQuantity += +product.quantity;
  });

  // hardcoding userId
  const existingData = await fetchData(userId);
  const existingUserMerchantPoints = existingData[userId];

  if (!existingUserMerchantPoints) {
    // create store for new user
    const emptyState: MerchantPoints = {
      [Store.FAIRPRICE]: [],
      [Store.LAZADA]: [],
      [Store.SHENGSIONG]: [],
      [Store.SHOPEE]: []
    };

    const data = {
      ...emptyState,
      [currentStore]: [{ orderId, isClaimed: false, points: totalQuantity * 5 }]
    };
    await saveData(data, userId);

    showConfirmationModal();
    return;
  }

  const existingStorePointsForTheUser =
    existingUserMerchantPoints[currentStore];

  // find if orderId already exist
  const existingTrackingForOrderId = existingStorePointsForTheUser.findIndex(
    points => {
      return points.orderId === orderId;
    }
  );

  // to exit if the order has already been tracked (not sure if will ever happen IRL
  if (existingTrackingForOrderId !== -1) {
    console.log(
      'Current order has already been tracked.',
      existingStorePointsForTheUser[existingTrackingForOrderId]
    );
    return;
  }

  await saveData(
    {
      ...existingUserMerchantPoints,
      [currentStore]: [
        { orderId, isClaimed: false, points: totalQuantity * 5 },
        ...existingStorePointsForTheUser
      ]
    },
    userId
  );

  showConfirmationModal();
};

export const showConfirmationModal = () => {
  removeModalIfExists();

  const products = getItemsWithRewards();
  if (products.length === 0) {
    return;
  }

  const modal = document.createElement('dialog');
  modal.id = 'hpbRewardsConfirmationModal';

  modal.setAttribute(
    'style',
    `
padding: 32px;
border: none;
max-width: 350px;
width: 100%; 
top: 16px;
margin-right: 16px;
border-radius: 20px;
background-color: white;
position: fixed; 
box-shadow: 0px 12px 48px rgba(29, 5, 64, 0.32);
`
  );
  let totalPoints = 0;
  products.forEach(product => {
    totalPoints += +product.quantity * 5;
  });

  modal.innerHTML = `
<button style="position: absolute; top: 0; right: 5px; padding: 8px 12px; font-size: 16px; border: none; border-radius: 20px; cursor: pointer">x</button>
<h1 style="padding: 0px; margin: 0; text-align: center; font-weight: bold; font-size: 40px;"><img src="https://media.publit.io/file/randomassets/hcs.png" style="height: 36px; margin-right: 8px;"/>${totalPoints}pts</h1>
<p style="text-align: center; margin: 12px 0;">Healthier Choice points to be claimed upon order confirmation</p>
<hr />
<div id="confirmationModalContent" style="display: flex; gap: 8px; flex-direction: column; margin-top:12px; text-align: center"></div>
`;

  const contentDom = modal.querySelector('#confirmationModalContent');

  if (!contentDom) {
    return;
  }

  products.forEach(product => {
    const itemDiv = document.createElement('div');
    itemDiv.setAttribute(
      'style',
      `
    display: flex;
    font-size: 14px;
    `
    );

    itemDiv.innerText = `${product.quantity} x ${product.productName} (${
      +product.quantity * 5
    }pts) `;
    contentDom.append(itemDiv);
  });

  document.body.appendChild(modal);
  modal.querySelector('button')?.addEventListener('click', () => {
    modal.close();
  });

  modal.show();
};

export const removeModalIfExists = () => {
  const modal = document.querySelector('#hpbRewardsConfirmationModal');
  if (!!modal) {
    modal.remove();
  }
};
