# ffprobe-mini
[![License](https://img.shields.io/github/license/Rafostar/ffprobe-mini.svg)](https://github.com/Rafostar/ffprobe-mini/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/ffprobe-mini.svg)](https://www.npmjs.com/package/ffprobe-mini)
[![Downloads](https://img.shields.io/npm/dt/ffprobe-mini.svg)](https://www.npmjs.com/package/ffprobe-mini)

Simple implementation of FFprobe file analize

### Usage Example
```javascript
const ffprobe = require('ffprobe-mini');

var opts = {
	ffprobePath: '/path/to/ffprobe', // Optional (uses bin in $PATH by default)
	filePath: '/path/to/video.mkv',  // Path to media file (required)
	promise: false                   // Optional (data in callback by default)
}

ffprobe(opts, (err, data) =>
{
	if(err) return console.error(err);

	console.log(data);
});
```
