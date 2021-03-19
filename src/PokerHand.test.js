import PokerHand from './PokerHand.js';
import config from './config.json';

describe('PokerHand', () => {
	const { results: {win, loss, tie} } = config;

	describe('compareWith()', () => {
		it(`ties`, () => {
			const hand1 = new PokerHand('AC 4S 5S 8C AH');
			const hand2 = new PokerHand('4S 5S 8C AS AD');

			expect(hand1.compareWith(hand2.playerCardValue)).toBe(tie);
		});

		it(`ties with pair`, () => {
			const hand1 = new PokerHand('AS AD 5D 4S 3C');
			const hand2 = new PokerHand('KS KD 5D 4S 3C');

			expect(hand1.compareWith(hand2.playerCardValue)).toBe(tie);
		});

		it(`win`, () => {
			const hand1 = new PokerHand('AC AS KS KC AH');
			const hand2 = new PokerHand('4S KD 8C AS AD');

			expect(hand1.compareWith(hand2.playerCardValue)).toBe(win);
		});

		it(`win - royal flush vs full house`, () => {
			const hand1 = new PokerHand('TS JS QS KS AS');
			const hand2 = new PokerHand('KS KH KD 7H 7D');
			
			expect(hand1.compareWith(hand2.playerCardValue)).toBe(win);
		});

		it(`loss`, () => {
			const hand1 = new PokerHand('7C 2S 3S 8C AH');
			const hand2 = new PokerHand('AS TD TC AS AD');

			expect(hand1.compareWith(hand2.playerCardValue)).toBe(loss);
		});
	});

});
