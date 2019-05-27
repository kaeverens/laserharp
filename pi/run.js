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

var notes=[0], oldNotes=[0];
var noteFiles=[
	'c4', 'c+4'
]
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
function playNotes() {
	console.log(notes);
	for (var i=0;i<8;++i) {
		if (Math.pow(2, i)&notes[0] && !(Math.pow(2, i)&oldNotes[0])) {
			console.log('playing note', i);
			playNote(noteFiles[i]);
		}
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
