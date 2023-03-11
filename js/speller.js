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
	var oneLetterSymbols = new Set();
	var twoLetterSymbols = new Set();

	for (let i = 0; i < inputWord.length; i++) {
		// collect one letter symbol options
		if (inputWord[i] in symbols) {
			oneLetterSymbols.add(inputWord[i]);
		}

		// collect two letter symbol options
		if (i <= (inputWord.length - 2)) {
			let two = inputWord.slice(i,i+2);
			if (two in symbols) {
				twoLetterSymbols.add(two);
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
		for (let candidate of candidates) {
			let chunk = charsLeft.slice(0,candidate.length);
			if (candidate == chunk) {
				if (charsLeft.length > chunk.length) {
					let rest = charsLeft.slice(chunk.length);
					let res = spellWord(candidates,rest);
					if (res.length > 0) {
						return [ candidate, ...res ];
					}
				}
				else {
					return [ candidate ];
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
