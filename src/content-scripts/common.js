import browser from 'webextension-polyfill';

const ratingTemplate = document.createElement('div');
ratingTemplate.className = 'film-rating';

export function setupRatings({
  itemSelectors = [],
  getTitle = () => null
} = {}) {
  const itemSelector = itemSelectors.map(selector => `${selector}:not([rating-added])`).join(',');

  const observed = new WeakSet();

  const intersectionObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const item = entry.target;

        addRating(item);
        observer.unobserve(item);
      }
    }
  }, { threshold: 0.5 });

  const mutationObserver = new MutationObserver(observeItems);
  mutationObserver.observe(document.body, { childList: true });

  const observeInterval = setInterval(observeItems, 1000);
  observeItems();

  return () => {
    clearInterval(observeInterval);
    intersectionObserver.disconnect();
    mutationObserver.disconnect();
  };

  function observeItems() {
    const items = getItems();
    items.forEach(ensureIsObserved);
  }

  function ensureIsObserved(item) {
    if (observed.has(item)) {
      return;
    }

    intersectionObserver.observe(item);
    observed.add(item);
  }

  function getItems() {
    const items = document.querySelectorAll(itemSelector);

    return items;
  }

  async function addRating(item) {
    const title = getTitle(item);
    const rating = await getRating(title);

    if (rating) {
      addRatingToDOM(item, rating);
    }
  }
}

async function getRating(title) {
  if (!title) {
    return;
  }

  const rating = await browser.runtime.sendMessage({ type: 'getRating', title });

  return rating;
}

/**
 *
 * @param {HTMLElement} item
 * @param {string|number} rating
 */
function addRatingToDOM(item, rating) {
  const node = ratingTemplate.cloneNode();
  node.innerText = rating;

  item.appendChild(node);
  item.setAttribute('rating-added', true);
}
