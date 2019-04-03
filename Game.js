var GameCanvas;
var ctx;
var GameMode = 'Start';
var GameWon = false;
var GameDrawn = false;
var TwistStickPanel;
var GameOverPanel;
var Cards = [];
var GameStatusLabel;


function CreateTwistStickPanel()
{
    var panel = new Panel('TwistStick', 500, 737, 1000, 125, 'rgb(0, 255, 125)');
    TwistStickPanel = panel;
    Space.UI.addElement(panel);
    panel.visible = true;

    var button = new Button('Twist', - 250, 0, 450, 100, 'rgb(0, 0 , 255)');
    button.onClick = function()
    {
        Twist(Space.OwnedCards);
    }
	panel.addElement(button);
	button.addLabel('Twist!', 'label1', 'rgb(255, 255, 255)', 40);
	
	button = new Button('Stick..',  250, 0, 450, 100, 'rgb(255, 0, 0)');
    button.onClick = function()
    {
        Stick(Space.OwnedCards);
    }
	panel.addElement(button);
	button.addLabel('Stick..', 'label1', 'rgb(255, 255, 255)', 40);

}

function CreateGameOverPanel()
{
    var panel = new Panel('Restart', 500, 400, 1000, 800, 'rgb(0, 255, 125)');
    Space.UI.addElement(panel);
    panel.visible = false;
    GameOverPanel = panel;
    console.log(GameOverPanel);

    var button = new Button('Restart', 0, 0, 150, 100, 'rgb(0, 0, 255)');
    button.onClick = function()
    {
        RestartGame();
    }
    panel.addElement(button);
    button.addLabel('Restart', 'label1', 'rgb(0, 0, 0)', 30);

    GameStatusLabel = new Label('Game Status', '', 500, 250, 'rgb(0, 0, 0)', 100);
    Space.UI.addElement(GameStatusLabel);

}

function GameOver()
{  
    GameOverPanel.visible = true;
    TwistStickPanel.visible = false;
    GameMode = 'GameOver';
    if (GameWon)
    {
        GameStatusLabel.text = 'You Won!'; 
    }
    else if (!GameWon && !GameDrawn)
    {
        GameStatusLabel.text = 'You Lost!'; 
    }
    else if (!GameWon && GameDrawn)
    {
        GameStatusLabel.text = 'You Drew!'; 
    }
}

function GenerateCards()
{
    Cards = [];
    for (var t = 0; t < 52; t++)
    {
        Cards[t] = t;
    }
    
    for (var t = 0; t < 100; t++)
    {
        var choice1 = Math.random() * 52 | 0;
        var choice2 = Math.random() * 52 | 0;
        var temp = Cards[choice1];
        Cards[choice1] = Cards[choice2];
        Cards[choice2] = temp; 
    }
}

function DealCard()
{
    var card = Cards[0];
    Cards.splice(0, 1);
    return card;
}

function DealersTurn()
{
    GameMode = 'DealersTurn';
    DealersAI();
}

function DealersAI()
{
    Twist(Space.OppCards);
    Twist(Space.OppCards);

    for (var t = 0; t < 3; t++)
    {
        if (CalculateValueOfCards(Space.OppCards) < 16)
        {
            Twist(Space.OppCards);
        }
    }

    if (HasBust(Space.OppCards))
    {
        GameWon = true;
    }
    else if (IsPontoon(Space.OwnedCards) && IsPontoon(Space.OppCards))
    {
        GameDrawn = true;
    }
    else if (IsPontoon(Space.OwnedCards) && !IsPontoon(Space.OppCards))
    {
        GameWon = true;
    }
    else if (!IsPontoon(Space.OwnedCards) && IsPontoon(Space.OppCards))
    {
        GameWon = false;
    }
    else if (Is5CardTrick(Space.OwnedCards) && Is5CardTrick(Space.OppCards))
    {
        GameDrawn = true;
    }
    else if (Is5CardTrick(Space.OwnedCards) && !Is5CardTrick(Space.OppCards))
    {
        GameWon = true;
    }
    else if (!Is5CardTrick(Space.OwnedCards) && Is5CardTrick(Space.OppCards))
    {
        GameWon = false;
    }
    else if (CalculateValueOfCards(Space.OwnedCards) == CalculateValueOfCards(Space.OppCards))
    {
        GameDrawn = true;
    }
    else if (CalculateValueOfCards(Space.OwnedCards) > CalculateValueOfCards(Space.OppCards))
    {
        GameWon = true;
    }
    else if (CalculateValueOfCards(Space.OwnedCards) <= CalculateValueOfCards(Space.OppCards))
    {
        GameWon = false;
    }
    GameOver();
}

function Stick(cards)
{
    var total = 0;
    var acePresent = false;

    for (var t = 0; t < cards.length; t++)
    {
        var card = cards[t].number + 1;
        if (card == 1)
        {
            acePresent = true;
        }

        if (card > 10)
        {
            card = 10;
        }

        total += card;
    }

    if (total < 16)
    {
        if (acePresent && total <= 11)
        {
            total += 10;
        }
        if (total < 16)
        {
            console.log('Cannot stick under 16!')
        }   
    }

    if (total >= 16)
    {
        DealersTurn();
    }
}

function CalculateValueOfCards(cards)
{
    var total = 0;
    var acePresent = false;

    for (var t = 0; t < cards.length; t++)
    {
        var card = cards[t].number + 1;
        if (card == 1)
        {
            acePresent = true;
        }

        if (card > 10)
        {
            card = 10;
        }

        total += card;
    }

    if (total < 16)
    {
        if (acePresent && total <= 11)
        {
            total += 10;
        }
    }
    return total;
}

function Twist(cards)
{
    var chosenCard = DealCard();
    var x = cards.length * 160 + 130;
    var card;
    if (cards == Space.OwnedCards)
    {
        card = new Card('', x, 500, 100, 100, false)
    }
    else
    {
        card = new Card('', x, 50, 100, 100, true)
    }
    card.number = chosenCard % 13;
    card.shown = true;
    cards.push(card);

    if (HasBust(cards))
    {
        GameWon = false;
        GameOver();
    }
}

function IsPontoon(cards)
{
    if (cards.length < 2)
    {
        return false;
    }
    if (cards[0].number == 0 && cards[1].number >= 10)
    {
        return true;
    }
    if (cards[1].number == 0 && cards[0].number >= 10)
    {
        return true;
    }
    return false;
}

function Is5CardTrick(cards)
{
    if (cards.length == 5)
    {
        return true;
    }
    return false;
}

function HasBust(cards)
{
    var total = 0;

    for (var t = 0; t < cards.length; t++)
    {
        var card = cards[t].number + 1;

        if (card > 10)
        {
            card = 10;
        }

        total += card;
    }
    if (total > 21)
    {
        return true;
    }
    return false;
}

function StartGame()
{
    GameCanvas = document.getElementById('game_canvas');
    ctx = GameCanvas.getContext('2d');

    window.addEventListener('click', MouseClick, true);

    Space.UI = new UI(0, 0); 
    CreateTwistStickPanel();
    CreateGameOverPanel();

    GenerateCards();
    Twist(Space.OwnedCards);
    Twist(Space.OwnedCards);



    MainLoop();
}

function RestartGame()
{
    Space.OwnedCards = [];
    Space.OppCards = [];
    GameMode = 'Start';
    TwistStickPanel.visible = true;
    GameOverPanel.visible = false;
    GenerateCards();
    Twist(Space.OwnedCards);
    Twist(Space.OwnedCards);
    GameStatusLabel.text = '';
    GameDrawn = false;

}

function MouseClick(Event)
{
    var x = Event.layerX;
    var y = Event.layerY;

    Space.UI.clicked(x, y);
}

function MainLoop()
{
    ctx.clearRect(0, 0, 1000, 800)

    Space.UI.update();
    Space.UI.draw();

    for (var t = 0; t < Space.OwnedCards.length; t++)
    {
        Space.OwnedCards[t].update();
    }
    
    for (var t = 0; t < Space.OppCards.length; t++)
    {
        Space.OppCards[t].update();
    }

    setTimeout(MainLoop, 16);
}

window.onload = function(e)
{
    console.log('Game Started');
    StartGame();
}