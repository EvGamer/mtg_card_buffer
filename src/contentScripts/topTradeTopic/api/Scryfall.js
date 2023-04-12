import debounce from 'lodash/debounce';
import { RequestQueue } from './RequestQueue';

const SCRYFALL_REQUEST_TIMEOUT = 100;
const SCRYFALL_API_URL = 'https://api.scryfall.com';

class Scryfall {
  requestQueue = new RequestQueue(SCRYFALL_REQUEST_TIMEOUT);

  search(query) {
    const url = new URL('cards/search', SCRYFALL_API_URL);

    url.searchParams.set('q', query);

    return this.requestQueue.add(url, { method: "GET" });
  }

  debouncedSearch = debounce(
    (query, callback, handleError) => this.search(query).then(callback, handleError),
    SCRYFALL_REQUEST_TIMEOUT
  )
}

export default new Scryfall();
