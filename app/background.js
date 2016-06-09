class Clock {
	constructor() {
		this.colorPos = 0;
		this.color = [0, 0, 0, 255];
	}

	changeColor() {
		const c = this.color[this.colorPos] + 10;
		if (c > 255) {
			this.colorPos++;
			if (this.colorPos > 3) {
				c = 0;
				this.colorPos = 0;
			}
		}

		this.color[this.colorPos] = c;
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
