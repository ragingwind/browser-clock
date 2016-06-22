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
