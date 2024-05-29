const items = ['100 plus', 'milo'];

function highlightItems() {
  // TODO: add support for other merchants
  highlightFairpriceItems();
}

function highlightFairpriceItems() {
  // Get all text-containing elements
  const elements = document.querySelectorAll(
    '#productCollection > div > div > div > div > a > div'
  );
  elements.forEach(element => {
    // Check if the element's text content matches any item in the list
    items.forEach(item => {
      if (element.textContent.toLowerCase().includes(item.toLowerCase())) {
        // Highlight the matching item
        element.style.border = '8px solid #ADD8E6';
      }
    });
  });
}

// Run the highlight function
highlightItems();
