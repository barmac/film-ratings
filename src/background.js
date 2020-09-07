import browser from 'webextension-polyfill';

import { getFilmWebRating } from './filmweb';

browser.runtime.onMessage.addListener(fetchRating);

async function fetchRating(message) {
  if (message.type !== 'getRating') {
    return;
  }

  const { title } = message;

  let rating = await getSavedRating(title);

  if (rating) {
    return rating;
  }

  rating = await getFilmWebRating(title);

  if (rating) {
    await saveRating(title, rating);
  }

  return rating;
}

async function getSavedRating(title) {
  let data;
  try {
    data = await browser.storage.local.get(title);
    return data && data[title] && data[title].rating;
  } catch (error) {
    console.error('unable to get rating: ', error);
    return null;
  }
}

function saveRating(title, rating) {
  return browser.storage.local.set({ [title]: { rating } });
}
