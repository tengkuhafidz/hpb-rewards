import { isHcsItem, type HcsItem } from '../utils/hcs';

export const highlightFairpriceHcsItems = (hcsItems: HcsItem[]) => {
  highlightItemsInCartsPage(hcsItems);
  highlightItemsInDetailsPage(hcsItems);
  highlightItemsInListingPage(hcsItems);
};

const highlightItemsInListingPage = (hcsItems: HcsItem[]) => {
  const listingElements = document.querySelectorAll(
    '#productCollection > div > div > div > div > a > div'
  );

  if (listingElements && listingElements.length > 0) {
    listingElements.forEach(element => {
      hcsItems.forEach(item => {
        if (
          element.textContent &&
          isHcsItem(element.textContent, item.tokens)
        ) {
          // Highlight the matching item
          element.setAttribute("style", "border: #ADD8E6 solid 8px;");
        }
      });
    });
  }
};

const highlightItemsInDetailsPage = (hcsItems: HcsItem[]) => {
  const productDetailsElement = document.querySelector(
    '#__next > div > div:nth-child(1) > div.sc-ef6bad94-2.kyvEoN > main > div > div.sc-934106e3-0.fVFcqn > div:nth-child(1)'
  );

  if (productDetailsElement) {
    hcsItems.forEach(item => {
      if (
        productDetailsElement.textContent &&
        isHcsItem(productDetailsElement.textContent, item.tokens)
      ) {
        // Highlight the matching item
        productDetailsElement.setAttribute("style", "border: #ADD8E6 solid 8px;");
      }
    });
  }
};

const highlightItemsInCartsPage = (hcsItems: HcsItem[]) => {
  const cartItemElements = document.querySelectorAll('#product-group > div');

  if (cartItemElements && cartItemElements.length > 0) {
    cartItemElements.forEach(element => {
      hcsItems.forEach(item => {
        if (
          element.textContent &&
          isHcsItem(element.textContent, item.tokens)
        ) {
          // Highlight the matching item
          element.setAttribute("style", "border: #ADD8E6 solid 8px;");
        }
      });
    });
  }
};
