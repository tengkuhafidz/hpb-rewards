import { isHcsItem } from '../utils/hcs';
import { generateHcsTagElement, styleBorder } from './utils';

export const highlightFairpriceHcsItems = () => {
  highlightListingItems();
  // item details page
  highlightItemsDetails();
  highlightSuggestedItems();
};

const highlightListingItems = () => {
  injectCardsStyling('div.sc-405e7c3c-1', 'div.sc-68f2a4d-0.knzffB');
};

const highlightSuggestedItems = () => {
  injectCardsStyling('div.sc-622eddb3-1', 'div.sc-68f2a4d-0');
};

const highlightItemsDetails = () => {
  const borderElement: HTMLElement | null = document.querySelector(
    '#__next > div > div:nth-child(1) > div.sc-ef6bad94-2.kyvEoN > main > div > div.sc-934106e3-0.fVFcqn > div:nth-child(1)'
  );

  if (borderElement) {
    injectHcsTag(borderElement, 'span.sc-aa673588-1.drdope');
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
      injectHcsTag(borderElement, titleSelector);
    });
  }
};

const injectHcsTag = (borderElement: HTMLElement, titleSelector: string) => {
  if (isHcsItem(borderElement.textContent)) {
    styleBorder(borderElement);
    const titleElement: HTMLElement | null =
      borderElement.querySelector(titleSelector);
    if (titleElement) {
      const hcsTagElement = generateHcsTagElement();
      titleElement.parentNode?.insertBefore(hcsTagElement, titleElement);
    }
  }
};
