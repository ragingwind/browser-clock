class Clock {
	constructor() {
		this.color = new HueCycleColour();
    this.hour24 = false;

    chrome.browserAction.onClicked.addListener(() => {
      this.hour24 ^= true;
    });
	}

	draw() {
		const now = new Date();
    let hour = now.getHours();

    hour = this.hour24 ? (hour > 12 ? hour - 12 : hour) : hour;

		chrome.browserAction.setBadgeBackgroundColor({
			color:this.color.change()
		});

		chrome.browserAction.setBadgeText({
			text:`${hour}:${now.getMinutes()}`
		});

		chrome.browserAction.setIcon({
			path:`images/${this.hour24 ? hour > 12 ? 'pm' : 'am' : 'icon-16'}.png`
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
