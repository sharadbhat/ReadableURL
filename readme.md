# Readable-url

An NPM package to generate readable random phrases to add to dynamically generated URLs.

[GitHub repository](https://github.com/sharadbhat/ReadableURL)

To generate readable URLs like Twitch's clips.

Example: https://clips.twitch.tv/WiseAcceptableSnoodPupper

### Get started
To install,
```sh
npm install readable-url
```

### Usage Instructions
To use the package, first require it.
```js
const readable = require("readable-url");
```

Then, we create an object.
```js
// Takes 2 parameters.
// 1. A boolean value - If true, returns string in CamelCase, else lowercase.
// 2. An integer value - The number of words to be generated in the string. (Between 2 and 10).

var generator = new readable(); // true and 3 are default values.

// var generator = new readable
```

To generate a random phrase,
```js
var url = generator.generate();

console.log(url); // Prints out 'ForgetfulHarshEgg'
```

For best results, use an integer value of 3, 4, or 5.
