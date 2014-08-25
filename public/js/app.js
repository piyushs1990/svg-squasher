var screen, game, welcomeVM, nextLevelVM, gameOverVM;
var svgId = '#svg';
var instructionsId = '#instructions';
$(document).ready(function () {
    screen = Snap(svgId);
    game = new GameViewModel();
    ko.applyBindings(game);
    welcomeVM = new WelcomeViewModel();
    nextLevelVM = new NextLevelViewModel();
    gameOverVM = new GameOverViewModel();
    //game.startGame();
    welcomeVM.showWelcomeScreen();
});

function GameOver() {
    //alert("Game Over");
}

//function onSVGLoaded(data) {
//    data.animate({ cx: 400 }, 5000, null, GameOver);
//   var p = s.append(data);
//    var g = p.select("#bug");
//    g.setAttribute("attributeName", "transform");
//    g.setAttribute("attributeType", "xml");
//    g.setAttribute("type", "translate");
//    g.setAttribute("from", "10");
//    g.setAttribute("to", "100");
//    g.setAttribute("begin", "0s");
//    g.setAttribute("dur", "2s");
//    g.setAttribute("fill", "freeze");
    
//     g.drag();
//    g.animate({ transform: 'rotate(90, 283, 300)' });
//    g.animate({ transform: 'translate(1000)'}, 5000, null, GameOver);
//    g.animate({ transform: 'translate(500)' }, 4000);
//    g.drag();
//    var t = data.clone();
//    s.append(t);
//    g.transform("t100,100");
//}
