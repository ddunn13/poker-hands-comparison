import getCardsList from '../getCardsList.js';

describe('getCardsList', () => {
    const cards = getCardsList();
	it(`cards deck size to be 52`, () => {
		expect(Object.keys(cards).length).toBe(52);
	});
});
