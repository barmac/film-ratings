const SEARCH_URL = 'https://www.filmweb.pl/search?q=';

/**
 *
 * @param {string} title
 */
export async function getFilmWebRating(title) {
  try {
    const res = await fetchToText(`${SEARCH_URL}${title}`);

    if (!/Wynik wyszukiwania/.test(res)) {
      return null;
    }

    const result = findInText(/data-rate="(\d\.\d+)"/, res);

    if (!result) {
      return null;
    }

    const rating = Number(result).toPrecision(2);

    return rating;
  } catch (error) {
    console.error('Unable to fetch rating: ', error);
  }

  return null;
}

function fetchToText(url, options = {}) {
  return window.fetch(url, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return res.text();
    });
}

function findInText(regex, text) {
  const result = regex.exec(text);

  return result && result[1];
}