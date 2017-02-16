/*
 *words.js
 */
class Report {
    constructor(scrambled, original, userguess, score, timeTaken) {
	this.scrambled = scrambled;
	this.original = original;
	this.userguess = userguess;
	this.score = score;
	this.timeTaken = timeTaken;
    }
}
var r = new Report(1,2,3,4);

var app = angular.module('scrambledApp', []);

app.controller('scrambledCtrl', function($scope, $http) {

    $scope.set_word_list = function(){
 	$http.get('webapp/scripts/words.json').then(function(words) {
	    var wordlist = words.data.all;
	    // shuffle and get sub-array of first n elements AFTER shuffle
	    const shuffled = wordlist.sort(() => .5 - Math.random()).slice(0, $scope.numQ);// shuffle
	    $scope.wordSet = shuffled;
    	    get_next_word();
	});
    };
    $scope.startOver = function (){
	$scope.gameover = false;
	$scope.numQ = 10;
	$scope.thisQNum = 0;
	$scope.score = 0;
	$scope.correct = false;
	$scope.report = [];
	$scope.set_word_list();
	angular.forEach(
	    document.querySelectorAll('.guess input'), function(elem) { elem.focus(); });
    };

    $scope.startOver();
    
    $scope.checkGuess = function(){
	if (!$scope.gameover){
	    if ($scope.guess.toLowerCase() == $scope.randomWord.toLowerCase()){
		$scope.stopTime = new Date().getTime();
		$scope.correct = true;
		$scope.score++;
		report_stats();
		if ($scope.thisQNum < $scope.numQ){
		    get_next_word();
		}else{
		    $scope.gameover = true;
		}
	    }
	}
    };

    $scope.nextWord = function(){
	if (!$scope.gameover){
  	    $scope.stopTime = new Date().getTime();
	    if ($scope.guess.toLowerCase() == $scope.randomWord.toLowerCase()){
		$scope.correct = true;
		$scope.score++;
	    }
	    report_stats();
	    if ($scope.thisQNum < $scope.numQ){
		get_next_word();
	    }else{
		$scope.gameover = true;
	    }	
	}
    };
    function get_next_word(){
	$scope.randomWord = $scope.wordSet[$scope.thisQNum].toLowerCase();
	$scope.scrambledWord =  get_scrambled_word($scope.randomWord);
	$scope.thisQNum++;
	$scope.guess = '';
	$scope.correct = false;
	//TODO: Try to use jqLite instead
	angular.forEach(
	    document.querySelectorAll('.guess input'), function(elem) { elem.focus(); });
	$scope.startTime = new Date().getTime();
    };
    
    function report_stats(){
	$scope.report.push(new Report($scope.scrambledWord, $scope.randomWord, $scope.guess, $scope.correct, ($scope.stopTime - $scope.startTime)/1000));
    }

    function get_random_words(n){
    }

});


function shuffle_FisherYates(array) {
    //https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    //http://www.itsmycodeblog.com/shuffling-a-javascript-array/
    var currentIndex = array.length, temporaryValue, randomIndex ;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
	// Pick a remaining element...
	randomIndex = Math.floor(Math.random() * currentIndex);
	currentIndex -= 1;
	// And swap it with the current element.
	temporaryValue = array[currentIndex];
	array[currentIndex] = array[randomIndex];
	array[randomIndex] = temporaryValue;
    }
    return array;
}

function get_scrambled_word(random_word){
    random_word_middle = random_word.slice(1, -1)
    // Sort letters in the middle alphabetically or reverse alphabetically
    middle_shuffled = random_word_middle.split('').sort()
    if (Math.random() >= 0.5){
	middle_shuffled.reverse()
    }
    middle_shuffled = middle_shuffled.join('')
    if (middle_shuffled == random_word_middle){
	//If alphabetical sorting doesn't scramble, sort randomly
	middle_shuffled = random_word_middle.split('').sort(
	    function(a, b){return 0.5 - Math.random()}).join('')
    }
    if (middle_shuffled == random_word_middle){
	//if random sort also doesn't scramble, sort using Fisher-Yates shuffle method
	middle_shuffled = shuffle_FisherYates(random_word_middle.split('')).join('')
    }
    scrambled = random_word[0].concat(
	middle_shuffled,
	random_word[random_word.length - 1])
    return scrambled
}
