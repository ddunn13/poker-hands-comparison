import getCardsList from './getCardsList.js';
import config from '../config.json';

const cardsDeck = getCardsList();

const __getGroupedCardValues = (cards) => {
    const cardsValues = {};

    cards.forEach((card) => {
        const cardValue = parseInt(cardsDeck[card.toUpperCase()]?.value);
        if (cardValue) {
            if (!cardsValues[cardValue]) {
                cardsValues[cardValue] = 0;
            }
            cardsValues[cardValue] = cardsValues[cardValue] + 1;
        }
    });

    return cardsValues;
};

const __findCardsMatchByAmount = (cards, amount) => {
    let matchedType;
    const cardsValues = __getGroupedCardValues(cards);

    Object.keys(cardsValues).map(value => {
        if (cardsValues[value] === amount) {
            matchedType = value;
        }
    });

    return matchedType;
};

export const isPair = (cards) => {
    let pairFound = false;
    const cardsValues = [];

    cards.forEach((card) => {
        const cardValue = parseInt(cardsDeck[card.toUpperCase()]?.value);
        if (cardValue && !pairFound) {
            if (cardsValues.includes(cardValue)) {
                pairFound = true;
            } else {
                cardsValues.push(cardValue);
            }
        }
    });
    return pairFound;
};

export const isTwoPairs = (cards) => {
    const cardsValues = __getGroupedCardValues(cards);
    let pairsFound = 0;

    for (const cardCounts in cardsValues) {
        if (cardsValues[cardCounts] > 1) {
            pairsFound++;
        }
    }

    return pairsFound > 1;
};

export const isThreeOfAKind = (cards) => {
    return !!__findCardsMatchByAmount(cards, 3);
};

export const isStraight = (cards) => {
    const first = parseInt(cardsDeck[cards[0].toUpperCase()]?.value);
    const isStraight = cards.every((card, index) => parseInt(cardsDeck[card.toUpperCase()]?.value) - first === index);

    return isStraight;
};

export const isFlush = (cards) => {
    const first = cardsDeck[cards[0]]?.suitType;
    const isFlush = cards.every((card) => cardsDeck[card]?.suitType === first);

    return isFlush;
};

export const isFullHouse = (cards) => {
    let result = false;
    const threeOfAKindType = __findCardsMatchByAmount(cards, 3);

    if (threeOfAKindType) {
        const cardsLeftOver = cards.filter((card) => {
            return parseInt(cardsDeck[card.toUpperCase()]?.value) != threeOfAKindType;
        });

        result = isPair(cardsLeftOver);
    };

    return result;
};

export const isFourOfAKind = (cards) => {
    return !!__findCardsMatchByAmount(cards, 4);
};

export const isStraightFlush = (cards) => {
    return isFlush(cards) && isStraight(cards);
};

export const isRoyalFlush = (cards) => {
    const inExpectedOrder = parseInt(cardsDeck[cards[0]]?.value) === 9 &&
        parseInt(cardsDeck[cards[1]]?.value) === 10 &&
        parseInt(cardsDeck[cards[2]]?.value) === 11 &&
        parseInt(cardsDeck[cards[3]]?.value) === 12 &&
        parseInt(cardsDeck[cards[4]]?.value) === 13;


    return inExpectedOrder && isFlush(cards) && isStraight(cards);
};

const getPlayerCardValues = (playerHand = "") => {
    let value;

    const {
        rank
    } = config;
    const cards = playerHand.split(' ');

    if (cards.length !== 5) {
        console.warn('incorrect hand length');
        return null;
    }

    if (isRoyalFlush(cards)) {
        value = rank.RoyalFlush
    } else if (isStraightFlush(cards)) {
        value = rank.StraightFlush;
    } else if (isFourOfAKind(cards)) {
        value = rank.FourOfAKind;
    } else if (isFullHouse(cards)) {
        value = rank.FullHouse;
    } else if (isFlush(cards)) {
        value = rank.Flush;
    } else if (isStraight(cards)) {
        value = rank.Straight;
    } else if (isThreeOfAKind(cards)) {
        value = rank.ThreeOfAKind;
    } else if (isTwoPairs(cards)) {
        value = rank.TwoPairs;
    } else if (isPair(cards)) {
        value = rank.Pair;
    } else {
        value = rank.Highcard
    }

    return value;
};

export default getPlayerCardValues;