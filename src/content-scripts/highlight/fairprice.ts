import { isHcsItem } from '../../utils/hcs';
import {
  generateCartItemRewardInElement,
  generateHcsTagElement,
  generateHpbRewardBoxElement,
  generateTotalHpbRewardTextElement,
  styleBorder
} from './utils';

export const highlightFairpriceHcsItems = () => {
  // listing pages
  highlightListingItems();
  // item details page
  highlightItemsDetails();
  highlightSuggestedItems();
  highlightCartItemsAndInjectTotalPoints();
};

const highlightListingItems = () => {
  injectCardsStyling(
    '[data-testid=product]',
    '[data-testid=highlighted-promo-label]'
  );
};

const highlightSuggestedItems = () => {
  injectCardsStyling('[data-testid=compact-product]', 'span > div');
};

const highlightItemsDetails = () => {
  const borderElement: HTMLElement | null = document.querySelector(
    'main > div > div:nth-child(2) > div:nth-child(1)'
  );

  if (borderElement && isHcsItem(borderElement.textContent)) {
    styleBorder(borderElement);
    const titleElementSelector = 'span.drdope';
    injectHcsTag(borderElement, titleElementSelector);
    const addToCartButtonElementSelector =
      'div#hcs-border > div:last-of-type > div:last-of-type > div:last-of-type';
    injectRewardBox(borderElement, addToCartButtonElementSelector);
  }
};

// =============================================================================
// Helpers
// =============================================================================

const injectCardsStyling = (borderSelector: string, titleSelector: string) => {
  const listingItemBorderElements: NodeListOf<HTMLElement> =
    document.querySelectorAll(borderSelector);

  if (listingItemBorderElements && listingItemBorderElements.length > 0) {
    listingItemBorderElements.forEach(borderElement => {
      if (isHcsItem(borderElement.textContent)) {
        styleBorder(borderElement);
        injectHcsTag(borderElement, titleSelector);
      }
    });
  }
};

const injectHcsTag = (borderElement: HTMLElement, titleSelector: string) => {
  if (hasInjectedElement('[id=hcs-tag]', borderElement)) {
    return;
  }
  injectElement(
    borderElement,
    titleSelector,
    generateHcsTagElement(),
    'beforebegin'
  );
};

const injectRewardBox = (
  borderElement: HTMLElement,
  buttonDivSelector: string
) => {
  if (hasInjectedElement('[id=hpb-reward-box]', borderElement)) {
    return;
  }
  injectElement(
    borderElement,
    buttonDivSelector,
    generateHpbRewardBoxElement(),
    'afterend'
  );
};

const injectCartItemRewardInfo = (
  cartItemElement: HTMLElement,
  refSelector: string
) => {
  if (hasInjectedElement('[id=hpb-reward-info-cart]', cartItemElement)) {
    return;
  }
  injectElement(
    cartItemElement,
    refSelector,
    generateCartItemRewardInElement(),
    'afterend'
  );
};

const injectElement = (
  parentElement: HTMLElement,
  refSelector: string,
  newElement: HTMLElement,
  newElementPosition: 'beforebegin' | 'afterend'
) => {
  const refElement: HTMLElement | null =
    parentElement.querySelector(refSelector);
  if (refElement) {
    refElement.insertAdjacentElement(newElementPosition, newElement);
  }
};

const highlightCartItemsAndInjectTotalPoints = () => {
  if (isCartPageReady()) {
    const cartTotalContainerElement = document.querySelector(
      '[data-testid=cart-summary-total]'
    );

    if (
      cartTotalContainerElement &&
      !hasInjectedElement('[id=total-hpb-reward-text]')
    ) {
      cartTotalContainerElement.parentElement?.insertAdjacentElement(
        'afterend',
        generateTotalHpbRewardTextElement()
      );
    }

    const cartItemElements: NodeListOf<HTMLElement> = document.querySelectorAll(
      '[data-testid=cartProduct]'
    );

    if (cartItemElements && cartItemElements.length > 0) {
      cartItemElements.forEach(itemElement => {
        if (isHcsItem(itemElement.textContent)) {
          injectCartItemRewardInfo(itemElement, 'div > div:nth-child(1)');
        }
      });
    }
  }
};

const isCartPageReady = () => {
  const lastToLoadElement = document.querySelector(
    '[data-testid=cart-summary-subtotal]'
  );

  let isPageReady = false;

  const observer = new MutationObserver(mutations => {
    isPageReady = mutations.some(mutation => {
      if (
        mutation.type === 'childList' &&
        lastToLoadElement?.children &&
        lastToLoadElement?.children.length > 0
      ) {
        // Once injected, disconnect the observer to avoid re-injections
        observer.disconnect();
        return true;
      }
    });
  });

  observer.observe(lastToLoadElement!, {
    childList: true,
    subtree: true
  });

  return true;
};

const hasInjectedElement = (selector: string, parentElement?: HTMLElement) => {
  const injectedElements = (parentElement ?? document).querySelector(selector);
  return injectedElements;
};
