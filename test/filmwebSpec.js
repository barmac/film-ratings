import { stub } from 'sinon';
import assert from 'assert';

import {
  getFixture
} from './helper';

import { getFilmWebRating } from '../src/filmweb';

describe('filmweb', () => {

  /** @type {stub} */
  let fetch;

  beforeEach(() => {
    fetch = stub(global.window, 'fetch');
  });

  afterEach(() => {
    fetch.restore();
  });


  it('should return rating', async () => {

    // given
    const fixture = getFixture('titanic');
    fetch.resolves({
      ok: true,
      text() {
        return fixture;
      }
    });

    // when
    const rating = await getFilmWebRating('Titanic');

    // then
    assert.strictEqual(rating, '7.3');
  });


  it('should return null for no results', async () => {

    // given
    const fixture = getFixture('no-results');
    fetch.resolves({
      ok: true,
      text() {
        return fixture;
      }
    });

    // when
    const rating = await getFilmWebRating('Titanic');

    // then
    assert.strictEqual(rating, null);
  });
});
