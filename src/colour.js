// Base class for Colour
export default class Colour {
  constructor() {
    this.color = [0, 0, 0, 255];
  }

  change() {
    return this.color;
  }
}

// HueCycleColour pattern drawer
export class HueCycleColour extends Colour {
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

// (function (global, factory) {
// 	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
// 	typeof define === 'function' && define.amd ? define(['exports'], factory) :
// 	(factory((global || {})));
// }(this, function (exports) { 'use strict';
//   exports.Colour = Colour;
// }));
