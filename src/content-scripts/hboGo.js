import { setupRatings } from './common';

const itemSelectors = [
  '.shelf-item:not(.showall-item):not(.placeholder)',
  '.grid-item[data-type="movie"]',
  '.grid-item[data-type="series"]'
];

setupRatings({ itemSelectors, getTitle });

function getTitle(item) {
  const titleNode = item.querySelector('.title');

  if (titleNode) {
    return titleNode.innerText;
  }

  const image = item.querySelector('.title-image');

  if (image) {
    return image.alt;
  }
}
