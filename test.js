var sentence_str = " A :- B, C.\n";
var output_str = "A, B, C.";

var sentence_str = sentence_str.trim();

var lt = sentence_str[0];

var rt = sentence_str.slice(sentence_str.indexOf(':') + 2, sentence_str.indexOf('.')).trim();
console.log("rt: " + rt + "\n");

var rt_arr = rt.split(new RegExp(",[ ]*"));
console.log("rt_arr: " + rt_arr + "\n");

for (var i = 0; i < rt_arr.length; i += 1) {
	console.log("pos " + i + ": '" + rt_arr[i] + "'\n");
}

console.log("lt = " + lt + "\n" + "rt = " + rt);

var splitOutput = function (output_str) {
	if (typeof output_str == "string") {
		return output_str.trim()
		.split(new RegExp("[,.][ ]*"))
	}
}

console.log("Split Output: " + splitOutput(output_str));

/* <var>:- [<sec_var>].*/
/* <sec_var> = <var>[, <sec_var>] */
function Sentence (sentence_str) {
	if (typeof sentence_str == "string") {
		sentence_str = sentence_str.trim();
		this.lt = sentence_str[0];
		var rt_aux = sentence_str.slice(sentence_str.indexOf(':') + 2, sentence_str.indexOf('.'));
		if (rt_aux.length) {
			this.rt = rt_aux.trim()
			.split(new RegExp(",[ ]*"));
		}
	}
}

Sentence.prototype.doEvaluate = function() {
    if (!this.rt) {
        return true;
    }
    return undefined;
};

Sentence.prototype.toString = function() {
	return this.lt + " :- " + (this.rt && this.rt.join(", ") || "") + ".";
};

Sentence.prototype.updateMatrix = function (matrix) {

	if (this.rt) {
		matrix[this.lt] = {};

		for (var i = 0; i < this.rt.length; i += 1) {
			matrix[this.lt][this.rt[i]] = true;
		};
	}
	else {
		matrix[this.lt] = true;
	}
};

var sentence = new Sentence(sentence_str);

console.log();
console.log("sencence: " + sentence.toString() + ", evaluetes to " + sentence.doEvaluate());

if (undefined) {
	console.log("undefined evaluate to true.");
} else {
	console.log("undefined evaluate to false.")
}

var matrix = {};
sentence.updateMatrix(matrix);
console.log(matrix);
