import Clock from './clock.js';

if (!window.clock) {
	window.clock = new Clock();
	window.clock.start();
}
