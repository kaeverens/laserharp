# laserharp
a harp made with lasers

Install Raspbian Lite on an SD card and boot up a Raspberry Pi with it. Use raspi-config to setup your network, then run the following to set up the needed packages:

```
sudo apt update
sudo apt install xserver-xorg lxde vim chromium-browser nodejs npm arduino sox libsox-fmt-mp3 git libgtk2.0-dev cmake cmake-curses-gui build-essential libasound2-dev fluid-soundfont-gm
sudo npm install -g npm
sudo usermod -a -G audio pi
sudo echo "@audio rtprio 80" > /etc/security/limits.d/audio.conf
sudo echo "@audio memlock unlimited" >> /etc/security/limits.d/audio.conf
git clone git://git.code.sf.net/p/fluidsynth/code-git
cd code-git/fluidsynth && mkdir build && cd build && cmake .. && sudo make install
```

Go into raspi-config again, into the `boot` menu, and set up the pi to boot into Desktop mode, then restart.

Open a terminal and run the following to get the code for the project:

```
git clone https://github.com/kaeverens/laserharp.git
cd laserharp/pi/
npm install serialport sox-play netcat
```

Finally, if you want the script to run at boot, edit `/etc/rc.local` and add the following *before* the `exit 0` line:

```
cd /home/pi/laserharp && sh ./start.sh &
```
