const primaryColor = '#f29677';
export const styleBorder = (element: HTMLElement) => {
  element.style.border = `2px solid ${primaryColor}`;
};

export const generateHcsTagElement = () => {
  const div = document.createElement('div');
  div.setAttribute("id", "hcs-tag");
  // Create a span element
  const span = document.createElement('span');
  // Set the styles for the span element
  span.style.backgroundColor = '#ee1c24';
  span.style.color = 'white';
  span.style.borderRadius = '2px';
  span.style.display = 'inline';
  span.style.padding = '2px 4px';
  span.style.fontSize = '12px';
  span.style.fontWeight = '900';

  // Set the text content for the span element
  span.textContent = '♥ Healthier Choice';

  // Append the span to the div
  div.appendChild(span);
  return div;
};

// <div><span style="background-color: #ee1c24; color: white; border-radius: 2px; display: inline; padding: 2px 4px; font-size: 12px; font-weight: 900"> Healthier Choice</span></div>
