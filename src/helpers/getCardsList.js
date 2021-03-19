import config from '../config.json';

const {
    suits,
    cards
} = config;

const getCardsList = () => {
    let cardsDeck = {};

    suits.map((suitType) => {
        cards.map((cardType, index) => {
            const cardName = String(`${cardType}${suitType[0]}`);
            cardsDeck[cardName] = { 
                value: index + 1,
                suitType
            };
        });
    });

    return cardsDeck;
};

export default getCardsList;