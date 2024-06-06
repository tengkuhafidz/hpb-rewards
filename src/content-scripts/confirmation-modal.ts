import { isHcsItem } from '../utils/hcs';

export const observer = new MutationObserver(_mutations => {
  const originalPlaceOrderButton = document.querySelector(
    '#floating-area-place-order div button'
  );

  if (!originalPlaceOrderButton) {
    return;
  }

  const placeOrderButton = document.createElement('button');
  placeOrderButton.className = originalPlaceOrderButton?.className ?? ''; // steal the original CSS
  placeOrderButton.innerText = 'Place Order Spy';
  placeOrderButton.addEventListener('click', () => {
    showConfirmationModal();
  });

  originalPlaceOrderButton.replaceWith(placeOrderButton);
  observer.disconnect();
});

export const showConfirmationModal = () => {
  removeModalIfExists();

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

  modal.innerHTML = `
<button style="position: absolute; top: 0; right: 5px; padding: 8px 12px; font-size: 16px; border: none; border-radius: 20px; cursor: pointer">x</button>
<div id="confirmationModalContent" style="display: flex; gap: 16px; flex-direction: column;"></div>
`;

  let totalQuantity = 0;
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
    border: 1px solid #000;
    padding: 16px;
    `
    );

    itemDiv.innerText = `${product.productName} – ${product.quantity}`;
    contentDom.append(itemDiv);

    totalQuantity += +product.quantity;
  });

  const totalPointDiv = document.createElement('div');

  totalPointDiv.innerHTML = `Total points: <span style="font-size: 20px;">${
    totalQuantity * 5
  }</span>`;
  contentDom.append(totalPointDiv);

  document.body.appendChild(modal);

  modal.show();
  modal.querySelector('button')?.addEventListener('click', () => {
    modal.close();
  });
};

export const removeModalIfExists = () => {
  const modal = document.querySelector('#hpbRewardsConfirmationModal');
  if (!!modal) {
    modal.remove();
  }
};
