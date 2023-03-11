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

function check(charsLeft) {
	if (charsLeft.length == 0) {
		return [];
	}
	else {
		// check for two letter symbols first
		if (charsLeft.length >= 2) {
			let two = charsLeft.slice(0,2);
			let rest = charsLeft.slice(2);
			if (two in symbols) {
				if (rest != "") {
					let result = [ two, ...check(rest) ];
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
			if (one in symbols) {
				if (rest != "") {
					let result = [ one, ...check(rest) ];
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

function lookup(elementSymbol) {
	return symbols[elementSymbol];
}
