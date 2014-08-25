// Returns a random number between 0 (inclusive) and 1 (exclusive)
function getRandom() {
    return Math.random();
}
// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomBugPos() {
    return getRandomInt(50, 450);
}

// add foreign object to svg to allow text

function addForeignObject() {
    d3.select('#svg').append("foreignObject")
           .attr("width", 840)
           .attr("height", 500)
           .append("xhtml:body")
           .append("div")
           .attr("id", "instructions");
}

// sort the high scores array
function sortHighScores(arr) {
    var sortedArray = _.sortBy(arr, function (o) { return o.score; });
    return sortedArray.reverse();
}

//function getBugLegPath(bugPos, bugSize) {
//    var pos = bugPos + bugSize;
//    return "m 0,"+pos+" 4.32093,-0.887212 4.455,-0.05487 2.98611,-0.223573 1.58895,-0.97728 c 0,0 0.1244,-1.048222 -0.36561,-1.666148 -0.48997,-0.617917 -1.64522,-0.855146 -1.64522,-0.855146 l -2.42625,0.769281 c -1.59066,1.089541 0.29693,3.308169 1.14842,2.850164 z";
//}

//function getBugLegPath(bugPos, bugSize) {
//    var xStartPos = 0.3 * bugSize;
//    var yStartPos = bugPos - (app.Config.BUG_LEG * bugSize);
//    var legWidth = app.Config.BUG_LEG * bugSize;
//    var legHeight = -1 * (app.Config.BUG_LEG * bugSize);
//    return "M " +xStartPos + " " + yStartPos + " l "+legWidth+" " + legHeight+" h "+legWidth;
//}

//function getBugLegPath2(bugPos, bugSize) {
//    var xStartPos = 0.3 * bugSize;
//    var yStartPos = bugPos + (app.Config.BUG_LEG * bugSize);
//    var legWidth = app.Config.BUG_LEG * bugSize;
//    var legHeight = app.Config.BUG_LEG * bugSize;
//    return "M " + xStartPos + " " + yStartPos + " l " + legWidth + " " + legHeight + " h " + legWidth;
//}

//function getBugLegPath3(bugPos, bugSize) {
//    var xStartPos = -1 * 0.3 * bugSize;
//    var yStartPos = bugPos + (app.Config.BUG_LEG * bugSize);
//    var legWidth = -1 * app.Config.BUG_LEG * bugSize;
//    var legHeight = (app.Config.BUG_LEG * bugSize);
//    return "M " + xStartPos + " " + yStartPos + " l " + legWidth + " " + legHeight + " l " + legWidth + " 0";
//}

//function getBugLegPath4(bugPos, bugSize) {
//    var xStartPos = -1 * 0.3 * bugSize;
//    var yStartPos = bugPos - (app.Config.BUG_LEG * bugSize);
//    var legWidth = -1 * (app.Config.BUG_LEG * bugSize);
//    var legHeight = -1 * (app.Config.BUG_LEG * bugSize);
//    return "M " + xStartPos + " " + yStartPos + " l " + legWidth + " " + legHeight + " l " + legWidth + " 0";
//}

function getBugLegsPath(bugPos, bugSize) {
    var paths = [];
    var xStartPos = getBugOffset(bugSize);
    var xStartPosNeg = -1 * xStartPos;
    var bugLegSize = getBugLegSize(bugSize);
    var bugLegSizeNeg = -1 * bugLegSize;
    var yStartPos = bugPos + (1.2 *bugLegSize);
    var yStartPosNeg = bugPos - (1.2 *bugLegSize);
    
    var path = "M " + xStartPos + " " + yStartPosNeg + " l " + bugLegSize + " " + bugLegSizeNeg + " h " + bugLegSize;
    var path2 = "M " + xStartPos + " " + yStartPos + " l " + bugLegSize + " " + bugLegSize + " h " + bugLegSize;
    var path3 = "M " + xStartPosNeg + " " + yStartPos + " l " + bugLegSizeNeg + " " + bugLegSize + " l " + bugLegSizeNeg + " 0";
    var path4 = "M " + xStartPosNeg + " " + yStartPosNeg + " l " + bugLegSizeNeg + " " + bugLegSizeNeg + " l " + bugLegSizeNeg + " 0";

    paths.push(path, path2, path3, path4);
    return paths;
}

function getBugLegSize(bugSize) {
    return (app.Config.BUG_LEG * bugSize);
}

function getBugOffset(bugSize) {
    return (app.Config.BUG_LEG_OFFSET * bugSize);
}

function getBugHornsPath(bugPos, bugSize) {
    var paths = [];
    var xStartPos = 5 * getBugHornOffset(bugSize);
    //var xStartPosNeg = -1 * xStartPos;
    var bugHornSize = getBugHornSize(bugSize);
    var bugHornSizeNeg = -1 * bugHornSize;
    var yStartPos = bugPos + bugHornSize;
    var yStartPosNeg = bugPos - bugHornSize;

    var path = "M " + xStartPos + " " + yStartPosNeg + " l " + bugHornSize + " " + bugHornSizeNeg + " h " + bugHornSize;
    var path2 = "M " + xStartPos + " " + yStartPos + " l " + bugHornSize + " " + bugHornSize + " h " + bugHornSize;
    paths.push(path, path2);
    return paths;
}

function getBugHornSize(bugSize) {
    return (app.Config.BUG_HORN * bugSize);
}

function getBugHornOffset(bugSize) {
    return (app.Config.BUG_HORN_OFFSET * bugSize);
}