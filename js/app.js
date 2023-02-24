import Speller from "./speller.js";


if (/complete|interactive|loaded/.test(document.readyState)) {
	ready();
}
else {
	document.addEventListener("DOMContentLoaded",ready);
}


// ****************************

function ready(){
	var enterWordEl = document.getElementById("enter-word");
	var spellBtn = document.getElementById("spell-btn");
	var wordSpellingEl = document.getElementById("word-spelling");

	enterWordEl.addEventListener("keydown",onKeydown,false);
	spellBtn.addEventListener("click",checkWord,false);


	// ********************************

	function onKeydown(evt) {
		if (evt.key == "Enter") {
			checkWord();
		}
	}

	function checkWord() {
		var inputWord = enterWordEl.value.toLowerCase().trim();
		enterWordEl.value = inputWord;

		// validate the input
		if (!/^[a-z]{3,}$/.test(inputWord)) {
			alert("Enter a word at least 3 letters long!");
			return;
		}

		// attempt to spell word
		var symbols = Speller.check(inputWord);

		// was a valid spelling found?
		if (symbols.length > 0) {
			enterWordEl.value = "";
			spellWord(symbols);
		}
		else {
			wordSpellingEl.innerHTML = "<strong>-- couldn't spell it! --</strong>";
		}
	}

	function spellWord(symbols) {
		wordSpellingEl.innerHTML = "";

		for (let symbol of symbols) {
			let elementEntry = Speller.lookup(symbol);
			let elementDiv = document.createElement("div");
			elementDiv.className = "element";
			elementDiv.innerHTML = `
				<div class="number">${elementEntry.number}</div>
				<div class="symbol">${elementEntry.symbol}</div>
				<div class="name">${elementEntry.name}</div>
			`;
			wordSpellingEl.appendChild(elementDiv);
		}
	}
}

// TEST WORDS
//
// [
//   "accept","access","accessibilities","accrete","accrual","accuracy","accuse","aces","ache",
//   "acids","acne","acorn","action","agitation","agnostic","ago","alimony","alpacas","america",
//   "american","amish","amputate","amputation","aspirin","attention","auction","autistic","bacon",
//   "ballistic","banana","band","bane","bank","baptism","barf","base","bay","bears","because",
//   "beers","berserk","body","bone","bonfire","boo","boy","brain","brains","bro","brunch","bunch",
//   "burn","busy","butane","cacti","cafe","camp","can","candy","candycane","canine","cannibal",
//   "cap","car","cheers","china","chocolate","clock","coffees","cone","cook","counts","cover","cow",
//   "coy","coyote","cufflinks","cuisine","cup","cute","cuteness","cyborg","cyclic","cyclone",
//   "cynics","dyes","dynamic","dynamite","dynamo","dynasties","dysfunctional","erosion","erotic",
//   "erupt","essence","faces","false","fat","fear","feline","fence","fetish","fibs","final","fire",
//   "flash","flog","flow","fog","forever","fraction","frog","frolic","fry","fun","function",
//   "functional","functions","fusion","gala","gasp","gear","gene","generation","genesis","genius",
//   "hack","hacker","hackers","halos","harp","has","hats","heat","heinous","helicopter","heretic",
//   "honk","hook","hose","hundreds","hymn","hymnal","hyperbolic","icky","icon","inclines","inspire",
//   "insulin","iron","irresponsibilities","kick","kind","knife","knits","know","krypton","lab",
//   "lady","lifespan","lips","lubrication","lucky","mock","mockery","more","motion","mouse","neon",
//   "nits","notification","nun","osmosis","ostentatious","pancreas","papyrus","patcher","patchier",
//   "phone","physics","pirate","play","player","poacher","poison","police","polish","posh","pounds",
//   "preparer","pretender","psychic","puffer","raccoon","rage","recluse","rescues","researh",
//   "resin","responsibilities","retina","reunite","reverse","rhubarb","rub","ruby","ruin","run",
//   "rune","rush","sack","sag","salvation","sarcasm","sassy","satin","scallion","scandal","scares",
//   "scotch","septic","sickness","siphon","skunk","sniper","snowy","soccer","sociopath","spam",
//   "span","spin","sure","tavern","taxes","teach","team","tetanus","tether","that","thin","think",
//   "tick","ticklish","under","unicorns","union","unreal","use","utah","vaccine","vampire","verse",
//   "violin","virus","viscosities","voice","vote","war","wash","wasp","watch","water","what","when",
//   "who","wife","wise","witch","with","won","wonder","wonky","yams","yards","yarn","yikes","you",
//   "youth","yucky"
// ]
