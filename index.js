const { spawn } = require('child_process');
const noop = () => {};

function ffprobe(opts, cb)
{
	cb = cb || noop;

	if(!opts.ffprobePath)
		return cb(new Error('No ffprobe path'));

	if(!opts.filePath)
		return cb(new Error('No file path specified'));

	var outData = "";

	var ffprobe = spawn(
		opts.ffprobePath,
		['-show_streams', '-show_format', '-print_format', 'json', opts.filePath],
		{ stdio: ['ignore', 'pipe', 'ignore'] }
	);

	const addData = function(data)
	{
		outData += data;
	}

	const onFFprobeExit = function(code)
	{
		ffprobe.removeListener('error', onFFprobeError);
		ffprobe.stdout.removeListener('data', addData);

		if(code) return cb(new Error(`FFprobe process error code: ${code}`));

		var parsedData = null;

		try { parsedData = JSON.parse(outData); }
		catch(err) {}

		if(parsedData)
			cb(null, parsedData);
		else
			cb(new Error('Could not parse ffprobe data'));
	}

	const onFFprobeError = function(err)
	{
		ffprobe.removeListener('exit', onFFprobeExit);
		ffprobe.stdout.removeListener('data', addData);

		cb(new Error(`FFprobe exec error: ${err.message}`));
	}

	ffprobe.once('exit', onFFprobeExit);
	ffprobe.once('error', onFFprobeError);
	ffprobe.stdout.on('data', addData);
}

function ffprobePromise(opts)
{
	return new Promise((resolve, reject) =>
	{
		ffprobe(opts, (err, data) =>
		{
			if(err) return reject(err);

			resolve(data);
		});
	});
}

module.exports = function(opts, cb)
{
	return (opts.promise) ? ffprobePromise(opts) : ffprobe(opts, cb);
}
