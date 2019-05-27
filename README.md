# laserharp
a harp made with lasers

Install Raspbian Lite on an SD card and boot up a Raspberry Pi with it. Use raspi-config to setup your network, then run the following to set up the needed packages:

```
sudo apt update
sudo apt install xserver-xorg lxde vim chromium-browser nodejs npm arduino sox libsox-fmt-mp3
sudo npm install -g npm
```

Go into raspi-config again, into the `boot` menu, and set up the pi to boot into Desktop mode, then restart.

Open a terminal and run the following to get the code for the project:

```
git clone https://github.com/kaeverens/laserharp.git
cd laserharp/pi/
npm install serialport sox-play
```
