const config = {
	FLUIDSYNTH_HOST: '127.0.0.1',
	FLUIDSYNTH_PORT: 9800,
	FLUIDSYNTH_TIMEOUT: 1500
}

const AudioPlayer = require('sox-play');

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port=new SerialPort('/dev/serial0', {
	baudRate:9600
});
port.on('error', err=>{
	console.error(err);
});
const parser = port.pipe(new Readline({
	delimiter: '\r\n'
}))

const NetcatClient = require('netcat/client');
let nc = new NetcatClient();

var notes=[0], oldNotes=[0];
var midi=[
	'0 66', '0 67'
];
var notesPlaying={};
function playNote(note) {
	if (notesPlaying[note]) {
		notesPlaying[note].stopHard();
	}
	notesPlaying[note]=new AudioPlayer({
		file:'mp3/'+note+'.mp3'
	});
	notesPlaying[note].play();
	notesPlaying[note].on('stop', ()=>{
		delete notesPlaying[note];
	});
}
nc
	.addr(config.FLUIDSYNTH_HOST)
	.port(config.FLUIDSYNTH_PORT)
	.wait(99999999)
	.retry(1000)
	.connect()
	.on('data', console.log)
	.on('close', e=>{
		console.log('nc client closed ', e);
	})
	.on('waitTimeout', e=>{
		console.log('nc client timed out ', e);
	})
	.on('connect', e=>{
		console.log('nc client connected ', e);
	})
	.on('error', e=>{
		console.log('nc client error ', e);
	});
function playNotes() {
//	console.log(notes);
	for (var i=0;i<8;++i) {
		if (Math.pow(2, i)&notes[0] && !(Math.pow(2, i)&oldNotes[0])) {
			if (!midi[i]) {
					continue;
			}
			console.log('noteon '+midi[i]+' 100');
			var cmd='noteoff '+midi[i]+'\nnoteon '+midi[i]+' 100\n';
			nc
				.send(cmd, e=>console.log);
		}
	;
	}
	notes.forEach((v, k)=>{
		oldNotes[k]=v;
		notes[k]=0;
	});
}
parser.on('data', d=>{
	if (/^notes/.test(d)) {
		var n=d.replace(/[^0-9]/g, '')
		var n=parseInt(n);
		notes[0]=notes[0]|n;
	}
});
setInterval(playNotes, 100);
