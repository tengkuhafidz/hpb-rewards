import { isHcsItem, type HcsItem } from '../utils/hcs';
import { generateHcsTagElement, styleBorder } from './utils';

export const highlightFairpriceHcsItems = (hcsItems: HcsItem[]) => {
  highlightListingItems(hcsItems);
  // item details page
  highlightItemsDetails(hcsItems);
  highlightSuggestedItems(hcsItems);
};

const highlightListingItems = (hcsItems: HcsItem[]) => {
  injectCardsStyling(hcsItems, 'div.sc-405e7c3c-1', 'div.sc-68f2a4d-0.knzffB');
};

const highlightSuggestedItems = (hcsItems: HcsItem[]) => {
  injectCardsStyling(hcsItems, 'div.sc-622eddb3-1', 'div.sc-68f2a4d-0');
};

const highlightItemsDetails = (hcsItems: HcsItem[]) => {
  const borderElement: HTMLElement | null = document.querySelector(
    '#__next > div > div:nth-child(1) > div.sc-ef6bad94-2.kyvEoN > main > div > div.sc-934106e3-0.fVFcqn > div:nth-child(1)'
  );

  if (borderElement) {
    injectHcsTag(hcsItems, borderElement, 'span.sc-aa673588-1.drdope');
  }
};

// =============================================================================
// Helpers
// =============================================================================

const injectCardsStyling = (
  hcsItems: HcsItem[],
  borderSelector: string,
  titleSelector: string
) => {
  const listingItemBorderElements: NodeListOf<HTMLElement> =
    document.querySelectorAll(borderSelector);

  if (listingItemBorderElements && listingItemBorderElements.length > 0) {
    listingItemBorderElements.forEach(borderElement => {
      injectHcsTag(hcsItems, borderElement, titleSelector);
    });
  }
};

const injectHcsTag = (
  hcsItems: HcsItem[],
  borderElement: HTMLElement,
  titleSelector: string
) => {
  hcsItems.forEach(item => {
    if (
      borderElement.textContent &&
      isHcsItem(borderElement.textContent, item.tokens)
    ) {
      styleBorder(borderElement);
      const titleElement: HTMLElement | null =
        borderElement.querySelector(titleSelector);
      if (titleElement) {
        const hcsTagElement = generateHcsTagElement();
        titleElement.parentNode?.insertBefore(hcsTagElement, titleElement);
      }
    }
  });
};
