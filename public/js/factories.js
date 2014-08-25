function Bug(bugType) {
    var self = this;
    //self.centerX = centerX;
    //self.centerY = centerY;
    self.bugType = bugType;
    self.getRadius = function () {
        if (self.bugType === app.Config.BUG_TYPES.Easy)
            return 20;
        else if (self.bugType === app.Config.BUG_TYPES.Medium)
            return 15;
        else return 10;
    };
    self.getBugSpeed = function () {
        var baseSpeed = self.getStartSpeed();
        if (self.bugType === app.Config.BUG_TYPES.Easy)
            return baseSpeed;
        else if (self.bugType === app.Config.BUG_TYPES.Medium)
            return (baseSpeed - 500);
        else return (baseSpeed - 1000);
    };
    self.getStartSpeed = function () {
        return (app.Config.BUG_BASE_SPEED - (game.level() * 500));
    };
    self.init = function () {
        var speed = self.getBugSpeed();
        var curLevel = game.level();
        var bugPos = getRandomBugPos();
        var bugSize = self.getRadius();
        var body = screen.ellipse(0, bugPos, bugSize, 0.8 * bugSize);
        body.attr({
            fill: '#D80000',
            stroke: '#000',
            strokeWidth: 1
        });
        var head = screen.circle(bugSize, bugPos, bugSize / 3);
        var legs = [];
        var legsPath = getBugLegsPath(bugPos, bugSize);
        _.each(legsPath, function (val) {
            var leg = screen.path(val);
            leg.attr({
                fill: 'none',
                stroke: '#000',
                strokeWidth: 3
            });
            legs.push(leg);
        });
        var horns = [];
        var hornsPath = getBugHornsPath(bugPos, bugSize);
        _.each(hornsPath, function (val) {
            var horn = screen.path(val);
            horn.attr({
                fill: 'none',
                stroke: '#000',
                strokeWidth: 2
            });
            horns.push(horn);
        });
        var bug = screen.group(body, head, legs[0], legs[1], legs[2], legs[3], horns[0], horns[1]);
        bug.attr({
            id: curLevel,
        });
        self = bug;
        var translateWidth = 'translate(' + app.Config.LEVEL_WIDTH + ')';
        self.animate({ transform: translateWidth }, speed, null, game.gameOver);
        //self.animate({ cx: 900 }, null, null, game.gameOver);
        self.node.onclick = function () {
            self.stop();
            self.node.remove();
            game.updateScore(bugType);
        };
    };

    //self.BugOnClick = function() {
    //    self.remove();
    //},

    //self.init();
}
