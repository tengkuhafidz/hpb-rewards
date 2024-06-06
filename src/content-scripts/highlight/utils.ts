const borderColor = '#f29677';
export const styleBorder = (element: HTMLElement) => {
  element.setAttribute('id', 'hcs-border');
  element.style.border = `2px solid ${borderColor}`;
};

// =============================================================================
// HCS Tag
// =============================================================================

export const generateHcsTagElement = () => {
  const container = document.createElement('div');
  container.setAttribute('id', 'hcs-tag');

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
  container.appendChild(span);
  return container;
};

// =============================================================================
// HPB Reward Box
// =============================================================================

export const generateHpbRewardBoxElement = () => {
  const container = document.createElement('div');
  container.setAttribute('id', 'hpb-reward-box');

  // Create the reward container
  const rewardContainer = document.createElement('div');
  rewardContainer.style.display = 'inline-flex';
  rewardContainer.style.justifyContent = 'space-between';
  rewardContainer.style.alignItems = 'center';
  rewardContainer.style.borderRadius = '4px'; // Adjust this as needed
  rewardContainer.style.padding = '10px 20px';
  rewardContainer.style.border = `1px solid #666`; // Optionally add a border
  rewardContainer.style.backgroundColor = borderColor;

  // Create the image logo
  const imgLogo = document.createElement('img');
  imgLogo.src = 'https://media.publit.io/file/randomassets/hcs.png'; // Replace with the actual path to your logo
  imgLogo.alt = 'Healthier Logo';
  imgLogo.style.width = '36px'; // Adjust size as needed
  imgLogo.style.height = '36px';
  imgLogo.style.marginRight = '20px'; // Space between logo and text

  // Create the reward text
  const rewardText = document.createElement('span');
  rewardText.textContent = 'Eligible for HPB Rewards';
  rewardText.style.fontSize = '14px'; // Adjust the text size as needed
  rewardText.style.color = '#333';

  // Append logo and text to the container
  rewardContainer.appendChild(imgLogo);
  rewardContainer.appendChild(rewardText);
  container.appendChild(rewardContainer);
  return container;
};

// =============================================================================
// Total HPB Reward Text
// =============================================================================

export const generateTotalHpbRewardTextElement = () => {
  const container = document.createElement('div');
  container.setAttribute('id', 'total-hpb-reward-text');

  // Create the reward container
  const rewardContainer = document.createElement('div');
  rewardContainer.style.display = 'inline-flex';
  rewardContainer.style.justifyContent = 'space-between';
  rewardContainer.style.marginTop = '10px'; // Adjust this as needed

  // Create the image logo
  const imgLogo = document.createElement('img');
  imgLogo.src = 'https://media.publit.io/file/randomassets/hcs.png'; // Replace with the actual path to your logo
  imgLogo.alt = 'Healthier Logo';
  imgLogo.style.width = '24px'; // Adjust size as needed
  imgLogo.style.height = '24px';
  imgLogo.style.margin = '0 8px 0 2px'; // Space between logo and text

  // Create the reward text
  const rewardText = document.createElement('span');
  rewardText.textContent = 'You will earn HPB points';
  rewardText.style.fontSize = '12px'; // Adjust the text size as needed
  rewardText.style.color = '#696969';
  rewardText.style.marginTop = '4px';

  // Append logo and text to the container
  rewardContainer.appendChild(imgLogo);
  rewardContainer.appendChild(rewardText);
  container.appendChild(rewardContainer);
  return container;
};

// =============================================================================
// HPB Reward Cart Info
// =============================================================================

export const generateCartItemRewardInElement = () => {
  const container = document.createElement('div');
  container.setAttribute('id', 'hpb-reward-info-cart');

  // Create the reward container
  const rewardInfoContainer = document.createElement('div');
  rewardInfoContainer.style.display = 'inline';
  rewardInfoContainer.style.padding = '0 8px 2px 8px';
  rewardInfoContainer.style.border = `1px solid ${borderColor}`;
  rewardInfoContainer.style.borderRadius = '2px';

  // Create the reward text
  const rewardinfoText = document.createElement('span');
  rewardinfoText.textContent = ' ♥ 5 HPB points per quantity ';
  rewardinfoText.style.fontSize = '12px'; // Adjust the text size as needed
  rewardinfoText.style.color = '#ee1c24';

  // Append logo and text to the container
  rewardInfoContainer.appendChild(rewardinfoText);
  container.appendChild(rewardInfoContainer);
  return container;
};
