class Colour {
  constructor() {
    this.color = [0, 0, 0, 255];
  }

  change() {
    return this.color;
  }
}

class HueCycleColour extends Colour {
  constructor() {
    super();

    this.frequency = 3;
    this.iterator = 0;
  }

  change() {
    this.color[0] = Math.floor(Math.sin(this.frequency * this.iterator * 0) * 127 + 128);
    this.color[2] = Math.floor(Math.sin(this.frequency * this.iterator * 4) * 127 + 128);
    this.color[1] = Math.floor(Math.sin(this.frequency * this.iterator * 2) * 127 + 128);
    this.iterator++;

    if (this.iterator >= 32) {
      this.iterator = 0;
    }

    return this.color;
  }
}

class Clock {
	constructor() {
		this.color = new HueCycleColour();
	}

	draw() {
		const now = new Date();
		const timeString = now.getHours() + ":" + now.getMinutes();

		chrome.browserAction.setBadgeBackgroundColor({
			color:this.color.change()
		});

		chrome.browserAction.setBadgeText({
			text:timeString
		});

		chrome.browserAction.setIcon({
			path:`images/${now.getHours() > 12 ? 'pm' : 'am'}.png`
		});
	}

	tick() {
		this.draw();
		this.start();
	}

	start() {
		window.setTimeout(() => {this.tick()}, 1000);
	}
}

if (!window.clock) {
	window.clock = new Clock();
	window.clock.start();
}
