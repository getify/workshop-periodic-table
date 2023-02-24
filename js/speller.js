export default {
	check,
	lookup,
};

var elements;

await loadPeriodicTable();


// ****************************

async function loadPeriodicTable() {
	elements = await (await fetch("periodic-table.json")).json();
}

function check(inputWord) {
	if (inputWord.length > 0) {
		// check every element for a symbol matching the next
		// 1-2 characters of the input word
		for (let element of elements) {
			let symbol = element.symbol.toLowerCase();
			if (symbol.length <= inputWord.length) {
				if (inputWord.slice(0,symbol.length) == symbol) {
					// more characters in the input word to try
					// to match to symbols?
					if (inputWord.length > symbol.length) {
						// recurse to check the remainder of the
						// input word
						let res = check(inputWord.slice(symbol.length));

						// was the check successful?
						if (res.length > 0) {
							return [ symbol, ...res ];
						}
					}
					else {
						return [ symbol ];
					}
				}
			}
		}
	}

	return [];
}

function lookup(elementSymbol) {
	// search all elements to find the matching
	// symbol (lowercase)
	for (let element of elements) {
		if (element.symbol.toLowerCase() == elementSymbol) {
			return element;
		}
	}
}
