#!/bin/bash

if pgrep -x "fluidsynth" > /dev/null
then
	echo fluidsynth already flowing
else
	sudo fluidsynth -si -p "fluid" -C0 -R0 -r48000 -d -f ./fluidsynth.conf -a alsa -m alsa_seq &
fi

sleep 3

cd pi
node run.js &

