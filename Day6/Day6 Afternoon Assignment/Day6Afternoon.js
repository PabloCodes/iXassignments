
// Return 'yes' if the sentence contains only unique characters, 'no' otherwise
function allUniqueCharacters(sentence) {
  var charSplit = sentence.split("").sort().join('').trim();
  for (var i = 0; i < charSplit.length; i++){
  	if (charSplit[i] === charSplit[i+1]){
  		return "no";
  	}
  }
  return "yes";
}

// One number 1-10 is missing. Return it!
function missingNum(numbers) {
 var noMiss = [1,2,3,4,5,6,7,8,9,10];
 var lowHigh = numbers.sort(function(a,b){return a - b});
 for (var i = 0; i < numbers.length; i++) {
 	if (lowHigh[i] !== noMiss[i]) {
 		return i+1;
 	}
 }
}

// Return 'yes' if array1 and array2 are rotated versions of each other, 'no' otherwise
// e.g. [1,2,3,6,7,8] and [3,6,7,8,1,2] are rotated versions of each other
function areRotatedVersions(array1, array2) {
	var string1 = array1.join('');
	var string2 = array2.join('');
	string1 = string1 + string1;
	if (string1.includes(string2)) {
		return 'yes';
	}
	return 'no';
}

// Return a string of the first n prime numbers, separated by commas
// e.g. "1,2,3,4"
function isPrime(n) {
	    for(var i = 2; i < n; i++) {
	        if (n % i == 0)
	            return false;
	    }
	    return true;
	}
function nPrimeNums(n) {
	var num = 2;
	var answer = "";
	var counter = 0;
	while (n > counter){
		if (isPrime(num) === true) {
			answer += (num + ",");
			counter++;
		}
		num++;
	}
	return answer.substring(0,answer.length - 1);
}

// Return the output of running the function f twice
// e.g. doitTwice(function f() {return 1;}) === 2
function doItTwice(f) {
	var ff = f;
	ff = ff + ff;
	return ff.substring(22, ff.length - 4);
	return "Passed!";
}

// Return an object that has the properties: first name, last name, age, email, and favorite color
function objectFun(first, last, age, email, color) {
    var person = {

    }
    return person;
}

// Return the number of "children" obj has
function numChildren(obj) {

}

function greeting(name) {
    return "Hello, " + name + "!";
}

// Say hello! This function takes a function as a parameter (greet should be a function)
function sayHello(first, last, greet) {

}