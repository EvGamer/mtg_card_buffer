import debounce from 'lodash/debounce';
import { mapSlices } from '../../../utils/mapSlices';
import { RequestQueue } from './RequestQueue';

const SCRYFALL_REQUEST_TIMEOUT = 200;
const SCRYFALL_API_URL = 'https://api.scryfall.com';

class Scryfall {
  constructor() {
    this.requestQueue = new RequestQueue(SCRYFALL_REQUEST_TIMEOUT);

    this.debouncedSearch = debounce(
      (query, callback, handleError) => this.search(query).then(callback, handleError),
      SCRYFALL_REQUEST_TIMEOUT
    )
  }

  search(query) {
    const url = new URL('cards/search', SCRYFALL_API_URL);

    url.searchParams.set('q', query);

    return this.requestQueue.add(url, { method: "GET" });
  }

  fetchSets() {
    const url = new URL('sets', SCRYFALL_API_URL);

    return this.requestQueue.add(url, { method: "GET" });
  }

  fetchCardListSliceData(cardIdentifiers) {
    const url = new URL('cards/collection', SCRYFALL_API_URL);

    return this.requestQueue.add(url, {
      method: 'POST',
      body: JSON.stringify({
        identifiers: cardIdentifiers
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }

  async fetchCardListData(cards) {
    const cardIdentifiers = cards.map((card) => {
      const identifier = { name: card.name };
      if (card.set) identifier.set = card.set.toLowerCase();
      return identifier;
    })

    const results = await Promise.all(
      mapSlices(cardIdentifiers, 75, async (cardsSlice, start) => {
        const response = await this.fetchCardListSliceData(cardsSlice);
        const responseBody = await response.json();
        const { data, not_found } = responseBody;

        let matchIdentifier = (identifier, cardData) => (
          (identifier.name === cardData.name)
          || (!identifier.set || identifier.set === cardData.set)
        )

        let sliceIndex = 0;
        let dataIndex = 0;
        let notFoundIndex = 0;

        const results = [];

        while (sliceIndex < cardsSlice.length && dataIndex < data.length) {
          const identifier = cardsSlice[sliceIndex];
          const card = cards[start + sliceIndex];
          const cardData = data[dataIndex];

          const isNotFound = (
            notFoundIndex < not_found.length
            && matchIdentifier(identifier, not_found[notFoundIndex])
          )

          if (isNotFound) {
            results.push(card);
            sliceIndex++;
            notFoundIndex++;
            continue;
          }

          results.push({
            ...card,
            ...cardData,
            imageUrl: cardData.image_uris ? cardData.image_uris.normal : card.imageUrl,
            set: cardData.set_name,
          });

          sliceIndex++;
          dataIndex++;
        }

        return results;
      })
    );

    const joinedList = [];

    results.forEach((enrichedCards) => {
      joinedList.push(...enrichedCards);
    })

    return joinedList;
  }
}

export default new Scryfall();
