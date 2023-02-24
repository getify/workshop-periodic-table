export default {
	check,
	lookup,
};

var elements;
var symbols = {};

await loadPeriodicTable();


// ****************************

async function loadPeriodicTable() {
	elements = await (await fetch("periodic-table.json")).json();
	for (let element of elements) {
		symbols[element.symbol.toLowerCase()] = element;
	}
}

function findCandidates(inputWord) {
	var oneLetterSymbols = [];
	var twoLetterSymbols = [];

	for (let i = 0; i < inputWord.length; i++) {
		// collect one letter symbol options
		if (inputWord[i] in symbols && !oneLetterSymbols.includes(inputWord[i])) {
			oneLetterSymbols.push(inputWord[i]);
		}

		// collect two letter symbol options
		if (i <= (inputWord.length - 2)) {
			let two = inputWord.slice(i,i+2);
			if (two in symbols && !twoLetterSymbols.includes(two)) {
				twoLetterSymbols.push(two);
			}
		}
	}

	return [ ...twoLetterSymbols, ...oneLetterSymbols ];
}

function spellWord(candidates,charsLeft) {
	if (charsLeft.length == 0) {
		return [];
	}
	else {
		// check for two letter symbols first
		if (charsLeft.length >= 2) {
			let two = charsLeft.slice(0,2);
			let rest = charsLeft.slice(2);
			if (candidates.includes(two)) {
				if (rest != "") {
					let result = [ two, ...spellWord(candidates,rest) ];
					if (result.join("") == charsLeft) {
						return result;
					}
				}
				else {
					return [ two ];
				}
			}
		}
		// now check for one letter symbols
		if (charsLeft.length >= 1) {
			let one = charsLeft[0];
			let rest = charsLeft.slice(1);
			if (candidates.includes(one)) {
				if (rest != "") {
					let result = [ one, ...spellWord(candidates,rest) ];
					if (result.join("") == charsLeft) {
						return result;
					}
				}
				else {
					return [ one ];
				}
			}
		}
	}
	return [];
}

function check(inputWord) {
	var candidates = findCandidates(inputWord);
	return spellWord(candidates,inputWord);
}

function lookup(elementSymbol) {
	return symbols[elementSymbol];
}
