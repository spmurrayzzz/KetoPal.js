# Keto Pal - Macronutrient Tracker

This is a completely offline mobile web application that I built as a way to
assist myself and my nutrition clients in tracking macronutrient intake on a
day-to-day basis. The context for usage is intended for a ketogenic dietary 
protocol, which often requires tedious management of macronutrient composition.

Think of the app as a scratch pad; its ephemeral in nature as it only tracks
the current day.

[Check out the demo](http://spmurrayzzz.com/dropbox/ketopal/)

![KetoPal](https://s3.amazonaws.com/spmurraydata/images/ketopal.png)

## Dependencies

- Grunt
- Bower

## Installation

- Dependencies first
```bash
sudo npm install -g grunt-cli bower
```

- Application modules next
```bash
npm install
```

- To build the JavaScript source
```bash
grunt
```

- Or to build as you hack
```bash
grunt watch
```

## Usage

- Open `index.html` in any modern web browser to start tracking macros

You can upload this to your own web host and use it like you would any other
static web site. The data persistence model is non-distributed, presently using
`localStorage` as the primary data store. So whatever device you use, you should
stick with as your tracking device of choice.
