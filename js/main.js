// The API is https://www.deckofcardsapi.com/

let deckId = '' 

// We need to shuffle the cards and get the deck id and pass it to the button 
fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json()) 
    .then(data => {
        console.log(data)
        deckId = data.deck_id
    })
    .catch(err => {
        console.log(`error ${err}`)
    });


let p1Score = 0
let p2Score = 0

document.querySelector('button').addEventListener('click', drawTwo)

function drawTwo(){
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json()) 
        .then(data => {
            console.log(data)

            // Set the images to the HTML
            document.getElementById('player1').src = data.cards[0].image
            document.getElementById('player2').src = data.cards[1].image

            // There are string values so we make them numbers
            let player1Result = convert2Number(data.cards[0].value)
            let player2Result = convert2Number(data.cards[1].value)

            // Check the WINNER
            if (player1Result > player2Result){
                console.log('Player 1 is the WINNER')
                document.getElementById('winner1').innerHTML = "WINNER"
                p1Score += 1
                document.querySelector('#p1ScoreCount').innerText = p1Score

            } else if (player1Result < player2Result){
                console.log('Player 2 is the WINNER')
                document.getElementById('winner2').innerHTML = "WINNER"
                p2Score += 1
                document.querySelector('#p2ScoreCount').innerText = p2Score

            } else {
                console.log("Bad it's a tie...")
                document.getElementById('tie').innerHTML = "It's a TIE"
            }

            clearTheWinner();

            if(data.remaining === 0){
                document.getElementById('end').innerHTML = "GAME OVER\n refresh & replay <3"
            }
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}


function convert2Number(val)
{
    if (val === 'ACE') {
        return 14
    } else if (val === 'KING') {
        return 13
    } else if (val === 'QUEEN') {
        return 12
    } else if (val === 'JACK') {
        return 11
    } else {
        return val
    }
}

function clearTheWinner() 
{
    setTimeout(function () { 
        document.getElementById('winner1').innerHTML = ''
        document.getElementById('winner2').innerHTML = ''
        document.getElementById('tie').innerHTML = ''
    }, 1100);
}