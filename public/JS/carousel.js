/**
 * Created by aayusharora on 2/27/18.
 */

var initial_cards = document.getElementsByClassName('card o-layout-card');
// All cards in the cards array

var cards = new InitializeCards(initial_cards);

function InitializeCards(initial_cards) {
    this.card = Array.from(initial_cards);
    this.index = 0;
    this.card_removed = [];
}

InitializeCards.prototype.previous = function() {

      // reverse card
        this.reverse_card = this.card.reverse();
        this.ele = this.reverse_card.pop();
        // pop element from card
        // push element in card remove array
        if(this.ele) {
            this.card_removed.push(this.ele);
        }

};

InitializeCards.prototype.next = function() {
    this.ele = this.card_removed.pop();
    this.card.reverse();
    this.card.push(this.ele);
    this.card.reverse();
};

function previous() {
    cards.previous();
}

function next() {
    cards.next()

}

