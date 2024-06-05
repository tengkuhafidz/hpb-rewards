import { isHcsItem } from '../utils/hcs';
import { generateHcsTagElement, styleBorder } from './utils';

export const highlightFairpriceHcsItems = () => {
  highlightListingItems();
  // item details page
  highlightItemsDetails();
  highlightSuggestedItems();
};

const highlightListingItems = () => {
  injectCardsStyling('[data-testid=product]', '[data-testid=highlighted-promo-label]');
};

const highlightSuggestedItems = () => {
  injectCardsStyling('[data-testid=compact-product]', 'span > div');
};

const highlightItemsDetails = () => {
  const borderElement: HTMLElement | null = document.querySelector(
    'main > div > div:nth-child(2) > div:nth-child(1)'
  );

  if (borderElement) {
    injectHcsTag(borderElement, 'span.drdope');
  }
};

// =============================================================================
// Helpers
// =============================================================================

const injectCardsStyling = (borderSelector: string, titleSelector: string) => {
  const listingItemBorderElements: NodeListOf<HTMLElement> = document.querySelectorAll(borderSelector);

  if (listingItemBorderElements && listingItemBorderElements.length > 0) {
    listingItemBorderElements.forEach(borderElement => {
      injectHcsTag(borderElement, titleSelector);
    });
  }
};

const injectHcsTag = (borderElement: HTMLElement, titleSelector: string) => {
  if (isHcsItem(borderElement.textContent)) {
    styleBorder(borderElement);
    const titleElement: HTMLElement | null =
      borderElement.querySelector(titleSelector);
    if (titleElement && !isTagExist()) {
      const hcsTagElement = generateHcsTagElement();
      titleElement.parentNode?.insertBefore(hcsTagElement, titleElement);
    }
  }
};

const isTagExist = () => {
  const hcsTag: NodeListOf<HTMLElement> = document.querySelectorAll('[id=hcs-tag]');
  return hcsTag.length > 0;
}
