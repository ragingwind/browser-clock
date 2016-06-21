class Clock {
	constructor() {
    this.frequency = 3;
		this.colorPos = 0;
		this.color = [0, 0, 0, 255];
	}

  changeColor() {
    this.color[0] = Math.floor(Math.sin(this.frequency * this.colorPos * 0) * 127 + 128);
    this.color[2] = Math.floor(Math.sin(this.frequency * this.colorPos * 4) * 127 + 128);
    this.color[1] = Math.floor(Math.sin(this.frequency * this.colorPos * 2) * 127 + 128);
    this.colorPos++;

    if (this.colorPos >= 32) {
      this.colorPos = 0;
    }
  }

	draw() {
		const now = new Date();
		const timeString = now.getHours() + ":" + now.getMinutes();

		chrome.browserAction.setBadgeBackgroundColor({
			color:this.color
		});

		chrome.browserAction.setBadgeText({
			text:timeString
		});

		chrome.browserAction.setIcon({
			path:`images/${now.getHours() > 12 ? 'pm' : 'am'}.png`
		});

		this.changeColor();
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
