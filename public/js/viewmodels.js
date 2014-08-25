function GameViewModel() {
    var self = this;
    self.score = ko.observable(0);
    self.level = ko.observable(1);
    self.timeRemaining = ko.observable(app.Config.LEVEL_TIME);
    self.levelComplete = false;
    var gameTimerId;
    self.updateScore = function (bugType) {
        self.score(self.score() + self.getBugTypeScore(bugType));
        self.createBug(bugType);
    },
    self.getBugTypeScore = function (bugType) {
        if (bugType === app.Config.BUG_TYPES.Easy)
            return 1;
        else if (bugType === app.Config.BUG_TYPES.Medium)
            return 2;
        else return 3;
    },
    self.nextLevel = function () {
        self.level(self.level() + 1);
        self.levelComplete = false;
        self.startGame();
    },
    self.restartGame = function () {
        self.clearContent();
        self.level(1);
        self.score(0);
        self.startGame();
    },
    self.startGame = function () {
        self.startTimer();
        self.createBugs();
    },
    self.createBugs = function () {
        self.createBug(app.Config.BUG_TYPES.Easy);
        self.createBug(app.Config.BUG_TYPES.Medium);
        self.createBug(app.Config.BUG_TYPES.Hard);
    },
    self.createBug = function (bugType) {
        var bug = new Bug(bugType);
        setTimeout(bug.init(), getRandomInt(0, 2000));
    },
    self.startTimer = function () {
        self.timeRemaining(app.Config.LEVEL_TIME);
        gameTimerId = setInterval(self.decrementTime, 1000);
    },
    self.decrementTime = function () {
        self.timeRemaining(self.timeRemaining() - 1);
        if (self.timeRemaining() === 0) {
            //Level Complete
            clearInterval(gameTimerId);
            self.clearContent();
            self.showNextLevelScreen();
        }
    },
    self.clearContent = function () {
        //d3.select(svgId).selectAll('*').remove();
        $(svgId).empty();
    },
    self.clearGame = function () {
        clearInterval(gameTimerId);
        //d3.select(svgId).selectAll('*').stop();
        screen.selectAll('g').forEach(function (elem, i) {
            elem.stop();
        });
        d3.select(svgId).selectAll('*').remove();
    },
    self.showNextLevelScreen = function () {
        self.levelComplete = true;
        self.clearGameScreen();
        $(instructionsId).load("templates/NextLevelTemplate.tmpl.html", function () {
            ko.cleanNode($(instructionsId)[0]);
            ko.applyBindings(nextLevelVM, $(instructionsId)[0]);
        });

    },
    self.nextLevelBtnClick = function () {
        self.clearContent();
        self.nextLevel();
    },
    self.clearGameScreen = function () {
        self.clearGame();
        self.clearContent();
        addForeignObject();
    },
    self.gameOver = function (event) {
        if (self.timeRemaining() === 0 || self.levelComplete || this.node.id !== self.level().toString()) return;
        self.clearGameScreen();
        $(instructionsId).load("templates/GameOverTemplate.tmpl.html", function () {
            ko.cleanNode($(instructionsId)[0]);
            gameOverVM.checkHighScore();
            ko.applyBindings(gameOverVM, $(instructionsId)[0]);
            if (gameOverVM.highScoreCrossed()) $('#game-restart').hide();
        });

    };
    // self.startGame();
}

function WelcomeViewModel() {
    var self = this;
    self.heading = "Bug Squasher";
    self.buttonText = "Start Game";
    self.onStartGameClick = function () {
        $('#display').show();
        game.restartGame();
    },
    self.showWelcomeScreen = function () {
        $('#display').hide();
        game.clearGameScreen();
        $(instructionsId).load("templates/WelcomeTemplate.tmpl.html", function () {
            ko.cleanNode($(instructionsId)[0]);
            ko.applyBindings(welcomeVM, $(instructionsId)[0]);
        });
    };
}

function NextLevelViewModel() {
    var self = this;
    self.heading = "Level Complete!";
    self.buttonText = "Start Next Level";
    self.onNextLevelClick = function () {
        game.nextLevelBtnClick();
    };
}

function GameOverViewModel() {
    var self = this;
    self.highScoreHeading = "Congratulations! New high score!";
    self.gameOverHeading = "Game Over!";
    self.gameOverBtnText = "Done";
    self.highScoreButtonText = "Submit";
    self.playerName = ko.observable("");
    self.highScoreCrossed = ko.observable(true);
    self.highScores = ko.observableArray();
    self.onHighScoreSubmitClick = function () {
        if (self.highScoreCrossed()) {
            var newHighScore = new Object();
            newHighScore.name = self.playerName();
            newHighScore.score = game.score();
            self.highScores.push(newHighScore);
        }
        if (self.highScores().length > 1) {
            var tempArray = self.highScores();
            self.highScores([]);
            self.highScores(sortHighScores(tempArray));
        }
        $('#game-highscore').hide();
        $('#game-highscore-display').show();
        $('#game-restart').show();
    },
    self.checkHighScore = function () {
        if (game.score() === 0) {
            self.highScoreCrossed(false);
            return;
        }
        if (self.highScores().length >= 10) {
            if (self.highScores()[9].score >= game.score()) self.highScoreCrossed(false);
            return;
        }
        self.highScoreCrossed(true);
    },
    self.onDoneClick = function () {
        welcomeVM.showWelcomeScreen();
    };
}
