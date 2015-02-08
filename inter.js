/* <var>:- [<sec_var>].*/
/* <sec_var> = <var>[, <sec_var>] */
function Sentence (sentence_line) {
	var sentence_str = sentence_line.toString();
	var rt_str;
	//detect errors.

	console.log("Sentence str: " + sentence_str + "\n");
	sentence_str = sentence_str.trim();
	this.lt = sentence_str[0];
	rt_str = sentence_str.slice(sentence_str.indexOf(':') + 2, sentence_str.indexOf('.'))
	.trim();

	if (rt_str.length > 0) {
		this.rt = rt_str.split(new RegExp(",[ ]*"));
	}
}

Sentence.prototype.rtLenght = function() {
	if (this.rt) {
		return this.rt.length;
	}
	else return 0;
}

Sentence.prototype.doEvaluate = function() {
    if (this.rtLength === 0) {
        return true;
    }
    return undefined;
};

Sentence.prototype.test = function(currentOutput) {
	var l = currentOutput.length;
	var matches = [];
	if (l > 0) {

		var i = 0;
		var end = false;
		var index;
		do {
			index = this.rt.indexOf(currentOutput[i]);
			if (index >= 0) {
				this.rt.splice(index,1);
			}
			else i += 1
		} while((i < l) && (this.rt.length >= 0));
	}
}

Sentence.prototype.toString = function() {
	var o_str = this.lt + " :- ";
	if (this.rt) {
		o_str += this.rt.join(", ");
	}
	o_str += ".\n";
	return o_str;
};

// Function to split the current output string for processing.
var splitOutput = function (output_str) {
	if (typeof output_str == "string") {
		return output_str.trim()
		.split(new RegExp("[,.][ ]*"))
	}
}
// Start of the main code
var sentences = [];
var currentOutput = [];

process.stdin.setEncoding('utf8');

var sentence;
var lazy = require("lazy");

new lazy(process.stdin)
	.lines.forEach(function(line) {
		sentence = new Sentence(line);
		console.log(sentence.toString());
		sentences.push(sentence);
	});

process.stdin.on("end", function() {
	process.stdout.write("Sentences: " + sentences.length + "\n");
	var end = false;
	var innerEnd = false;
	var i = 0;
	var numSentences = sentences.length;

	do {
		end = true;
		i = 0;
		do {
			innerEnd = true;

			// begin debug log.
			console.log("we are at i = " + i + "\n");
			console.log("remaining sentences = " + numSentences + "\n");
			console.log("currrent sentence = " + sentences[i].toString());
			console.log("rtLength = " + sentences[i].rtLenght() + "\n");
			// end debug log.

			if (sentences[i].rtLenght() == 0) {
				currentOutput.push(sentences[i].lt);
				// begin debug log.
				console.log("added sentence: " + sentences[i].toString());
				console.log("current output: " + currentOutput.toString() + "\n");
				// end debug log.
				sentences.splice(i, 1);
				numSentences -= 1;
				if (sentences.length > 0) {
					end = false;
				} else break;
			} else {
				sentences[i].test(currentOutput);
				if (sentences[i].rtLenght() == 0) {
					currentOutput.push(sentences[i].lt);
					// begin debug log.
					console.log("added sentence: " + sentences[i].toString());
					console.log("current output: " + currentOutput.toString() + "\n");
					// end debug log.
					sentences.splice(i, 1);
					numSentences -= 1;
				   if (sentences.length > 0) {
						end = false;
					}
					else break;
				}
				else i += 1;
			}
		} while((numSentences > 0) && (i < numSentences));

	} while (!end);

//		for (i = 0; i < numSentences; i += 1){
//			// begin debug log.
//			console.log("we are at i = " + i + "\n");
//			console.log("remaining sentences = " + numSentences + "\n");
//			console.log("currrent sentence = " + sentences[i].toString());
//			console.log("rtLength = " + sentences[i].rtLenght() + "\n");
//			// end debug log.
//
//			if (sentences[i].rtLenght() == 0) {
//
//				currentOutput.push(sentences[i].lt);
//				// begin debug log.
//				console.log("added sentence: " + sentences[i].toString());
//				console.log("current output: " + currentOutput.toString() + "\n");
//				// end debug log.
//				sentences.splice(i, 1);
//				if (sentences.length > 0) {
//					end = false;
//					if (sentences[i]) {
//						i -= 1;
//						numSentences -= 1;
//					}
//					else break;
//				} else break;
//			} else {
//				sentences[i].test(currentOutput);
//				if (sentences[i].rtLenght() == 0) {
//					currentOutput.push(sentences[i].lt);
//					// begin debug log.
//					console.log("added sentence: " + sentences[i].toString());
//					console.log("current output: " + currentOutput.toString() + "\n");
//					// end debug log.
//					sentences.splice(i, 1);
//				   if (sentences.length > 0) {
//						end = false;
//						if (sentences[i]) {
//							i -= 1; // we already "virtually" increased i.
//							numSentences -= 1;
//						}
//						else break;
//					}
//					else break;
//				}
//			}
//		}
//	} while(! end && sentences.length > 0);
	process.stdout.write("Output: " + currentOutput + ".\n");
});
