const fs = require('fs');
const path = require('path');

/**
 * Initializes the object.
 * @param {boolean} [capitalize=true] - If set to true, returns string in CamelCase.
 * @param {number} [wordCount=3] - The number of words to use in the URL.
 * @param {string} [seperator=''] - The word seperator.
 */
function readable(capitalize=true, wordCount=3, seperator='') {
  if (wordCount < 2) {
    throw new Error('Minimum value expected: 2');
  }
  else if (wordCount > 10) {
    throw new Error('Maximum value expected: 10');
  }

  this.capitalize = capitalize;
  this.wordCount = wordCount;
  this.seperator = seperator

  this.vowels = ['a', 'e', 'i', 'o', 'u'];
  this.adjectives = fs.readFileSync(path.join(__dirname, 'words', 'adjectives.txt')).toString().split(' ');
  this.nouns = fs.readFileSync(path.join(__dirname, 'words', 'nouns.txt')).toString().split(' ');
}

/**
 * Converts each word in list to title case.
 * @param {string[]} wordsList - The array of words to be capitalized.
 * @returns {string[]} - The array with each word capitalized.
 */
readable.prototype.convertToTitleCase = function (wordsList) {
  for (var i = 0; i < wordsList.length; i++) {
    wordsList[i] = wordsList[i].charAt(0).toUpperCase() + wordsList[i].slice(1).toLowerCase();
  }
  return wordsList;
}

/**
 * Generates the string.
 * @returns {string} - The randomly generated string.
 */
readable.prototype.generate = function () {
  wordsList = [];
  wordsList.push(this.adjectives[Math.floor(Math.random() * this.adjectives.length)]);
  wordsList.push(this.nouns[Math.floor(Math.random() * this.nouns.length)]);

  if (this.wordCount > 5){
    for (var i = 0; i < this.wordCount - 2; i++) {
      wordsList.unshift(this.adjectives[Math.floor(Math.random() * this.adjectives.length)]);
    }
  }
  else {
    if (this.wordCount > 2) {
      wordsList.unshift(this.adjectives[Math.floor(Math.random() * this.adjectives.length)]);
    }

    if (this.wordCount > 3) {
      var isVowel = false;
      var firstLetter = wordsList[0][0];
      for(var i = 0; i < 5; i++)
      {
        if (this.vowels[i] === firstLetter) {
          isVowel = true;
          break;
        }
      }
      if (isVowel) {
        wordsList.unshift('an');
      }
      else {
        wordsList.unshift(['a', 'the'][Math.floor(Math.random() * 2)]);
      }
    }

    if (this.wordCount > 4) {
      wordsList.splice(2, 0, 'and');
    }
  }

  if (this.capitalize) {
    wordsList = this.convertToTitleCase(wordsList);
  }
  return wordsList.join(this.seperator);
}

module.exports = readable;
