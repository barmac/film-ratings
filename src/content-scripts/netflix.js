import { setupRatings } from './common';

const itemSelectors = [
  '.title-card-container'
];

setupRatings({ itemSelectors, getTitle });

function getTitle(item) {
  const titleNode = item.querySelector('[aria-label]');

  if (titleNode) {
    return titleNode.getAttribute('aria-label');
  }
}
