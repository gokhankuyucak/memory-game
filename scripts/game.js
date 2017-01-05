$(window).on('load', function () {

});
var deck = [];
var clickCount = 0;

function startGame() {
    clickCount = 0;
    deck=[];
    cardCount = $('#inputCardCount').val();
    $('#gameBoard').empty();
    createBoard(cardCount);
    deckCards(cardCount);
    $('img').click(function () {
        toggleImage($(this));
    });
}

function deckCards(cardCount) {
    totalCardCount = cardCount * 2;
    for (var i = 0; i < totalCardCount; i++) {
        deck[i] = (i % cardCount) + 1;
    }
    shuffledDeck = shuffle(deck);
    for (var i = 0; i < totalCardCount; i++) {
        imgIndex = i + 1;
        imgId = 'img_' + imgIndex;
        $("img[id=" + imgId + "]").attr('cardValue', shuffledDeck[i]);

    }
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function toggleImage(img) {
    var currentOpenedCardCount = $("img[status='opened']").length;
    clickCount++;
    if (currentOpenedCardCount == 0) {
        openAndSetCard(img, 'opened');
    } else if (currentOpenedCardCount == 1) {
        if ($("img[status='opened']").attr('cardValue') == img.attr('cardValue')) {
            openAndSetCard(img, 'matched');
            $("img[status='opened']").attr('status', 'matched');
            checkGameStatus();
        } else {
            openAndSetCard(img, 'opened');
            setTimeout(function () {
                // closeCards(img, 'closed');
                closeCards($("img[status='opened']"), 'closed');

            }, 2000);
        }
    } else {
        closeCards(img, 'closed');
    }


}


function openAndSetCard(img, status) {
    value = img.attr('cardValue');

    img.fadeOut('fast', function () {
        img.attr('src', './images/frozen/' + value + '.jpeg');
        img.fadeIn();
    });
    img.attr('status', status);
}

function closeCards(img, status) {

    img.fadeOut('fast', function () {
        img.attr('src', './images/frozen/game.jpeg');
        img.fadeIn();
    });
    img.attr('status', status);

}

function getRandomNumber(minimum, maximum) {
    var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function checkGameStatus() {
    matchedCount = $("img[status='matched']").length;

    if (matchedCount == deck.length) {
        score = calculateScore(deck.length);
        $('.modal-body').html('Your Score:' + score);
        $('#modal-transparent').modal('show');
    }
}

function calculateScore(cardCount) {
    if (clickCount == cardCount) {
        score = 100;
    } else if (clickCount > cardCount) {
        score = 100 - ((clickCount - cardCount) * 5);
        if (score < 0) {
            score = 0;
        }
    } else {
        score = "CHEATER!";
    }
    return score;
}

function createBoard(cardCount) {
    cardCount = cardCount * 2;
    rowCount = Math.ceil(cardCount / 5) + 1;
    for (var i = 1; i < rowCount; i++) {
        jQuery('<div/>', {
            id: 'row_' + i,
            class: 'row.row-eq-height'
        }).appendTo('#gameBoard');



    }

    for (var i = 1; i < cardCount + 1; i++) {
        currentRow = Math.ceil(i / 5);

        jQuery('<div/>', {
            id: 'card_' + i,
            class: 'col-xs-2',
            html: '<img id="img_' + i + '" class="img-responsive img" src="./images/frozen/game.jpeg" />'
        }).appendTo('#row_' + currentRow);

    }


}