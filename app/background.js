var clock = {
	RED:0,
	GREEN:1,
	BLUE:2,
	COLOR:0,
	color: [0, 0, 0, 255],
	changeColor: function() {
		clock.color[clock.COLOR] += 10;
		if (clock.color[clock.COLOR] > 255)
			clock.color[clock.COLOR] = 0;
	},
	draw: function() {
		chrome.browserAction.setBadgeBackgroundColor({color:clock.color});
		var now = new Date();
		var timeString = now.getHours() + ":" + now.getMinutes();
		chrome.browserAction.setBadgeText({text:timeString});

		if (now.getHours() > 12)
			chrome.browserAction.setIcon({path:"pm.png"});
		else
			chrome.browserAction.setIcon({path:"am.png"});
		clock.changeColor();
	},
	tick: function() {
		clock.draw();
		clock.start();
	},
	start: function() {
		console.log("start clock");
		window.setTimeout(clock.tick, 200);
	}
};

clock.start();

chrome.browserAction.onClicked.addListener(function(tab) {
	if (clock.COLOR < clock.BLUE)
		clock.COLOR++;
	else
		clock.COLOR = clock.RED;
});
