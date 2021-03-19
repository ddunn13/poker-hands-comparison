import config from './config.json';
import getPlayerCardValues from './helpers/getPlayerCardValues.js';

const {
    results: {
        win,
        loss,
        tie
    }
} = config;

export class PokerHand {
    constructor(playerHand) {
        this.playerCardValue = getPlayerCardValues(playerHand);
    }

    compareWith(opponentValue) {
        if (this.playerCardValue > opponentValue) {
            return win;
        } else if (this.playerCardValue < opponentValue) {
            return loss;
        } else {
            return tie;
        }
    }
}

export default PokerHand;