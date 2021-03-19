import getPlayerCardValues, { isPair, isTwoPairs, isThreeOfAKind, isStraight, isFlush, isFullHouse, isFourOfAKind, isStraightFlush, isRoyalFlush } from '../getPlayerCardValues.js';

describe('getPlayerCardValues', () => {
    it(`returns isPair correctly`, () => {
        expect(isPair(['AS','AD'])).toBeTruthy();
        expect(isPair(['AS','2D'])).toBeFalsy();
    });
    
    it(`returns isTwoPairs correctly`, () => {
        expect(isTwoPairs(['AS','AD','2D','2S'])).toBeTruthy();
        expect(isTwoPairs(['AS','AD','2D','3S'])).toBeFalsy();
	});

    it(`returns isThreeOfAKind correctly`, () => {
        expect(isThreeOfAKind(['AS','AD','2D','2S','AC'])).toBeTruthy();
        expect(isThreeOfAKind(['AS','AD','2D','2S','3C'])).toBeFalsy();
    });

    it(`returns isStraight correctly`, () => {
        expect(isStraight(['2S','3S','4S','5D','6D'])).toBeTruthy();
        expect(isStraight(['2S','3S','4S','5D','2D'])).toBeFalsy();
    });

    it(`returns isFlush correctly`, () => {
        expect(isFlush(['2S','3S','4S','5S','6S'])).toBeTruthy();
        expect(isFlush(['3D','2D','4D','5D','AD'])).toBeTruthy();
        expect(isFlush(['2S','3S','4S','5D','2D'])).toBeFalsy();
    });

    it(`returns isFullHouse correctly`, () => {
        expect(isFullHouse(['KS','KH','KD','7H','7D'])).toBeTruthy();
        expect(isFullHouse(['KS','KH','KD','7H','6D'])).toBeFalsy();
    });

    it(`returns isFourOfAKind correctly`, () => {
        expect(isFourOfAKind(['AS','AD','2D','AH','AC'])).toBeTruthy();
        expect(isFourOfAKind(['AS','AD','2D','KH','AC'])).toBeFalsy();
    });

    it(`returns isStraightFlush correctly`, () => {
        expect(isStraightFlush(['2S','3S','4S','5S','6S'])).toBeTruthy();
        expect(isStraightFlush(['2S','3S','4S','5S','6D'])).toBeFalsy();
    });

    it(`returns isRoyalFlush correctly`, () => {
        expect(isRoyalFlush(['TS','JS','QS','KS','AS'])).toBeTruthy();
        expect(isRoyalFlush(['TD','JD','QD','KD','AD'])).toBeTruthy();

        expect(isRoyalFlush(['TS','JS','QS','KD','AS'])).toBeFalsy();
    });

	it(`royal flush hand should equal value of 10`, () => {
		expect(getPlayerCardValues('TS JS QS KS AS')).toBe(10);
	});

    it(`straight flush hand should equal value of 9`, () => {
		expect(getPlayerCardValues('2S 3S 4S 5S 6S')).toBe(9);
    });
    
    it(`four of a kind hand should equal value of 8`, () => {
		expect(getPlayerCardValues('AS AD 2D AH AC')).toBe(8);
	});

    it(`full house hand should equal value of 7`, () => {
		expect(getPlayerCardValues('KS KH KD 7H 7D')).toBe(7);
    });
    
    it(`is flush hand should equal value of 6`, () => {
		expect(getPlayerCardValues('2S QS 4S 5S 6S')).toBe(6);
    });
    
    it(`is straight hand should equal value of 5`, () => {
		expect(getPlayerCardValues('2S 3S 4S 5D 6D')).toBe(5);
    });
    
    it(`is three of a kind hand should equal value of 4`, () => {
		expect(getPlayerCardValues('AS AD 2D 3S AC')).toBe(4);
    });
    
    it(`is two pairs hand should equal value of 3`, () => {
		expect(getPlayerCardValues('AS AD 2D 2S KC')).toBe(3);
    });

    it(`is pair hand should equal value of 2`, () => {
		expect(getPlayerCardValues('AS AD 5D 4S 3C')).toBe(2);
    });

    it(`is not any valid match hand should equal value of 1`, () => {
		expect(getPlayerCardValues('2S 6D 4D 3H 5C')).toBe(1);
    });
});
