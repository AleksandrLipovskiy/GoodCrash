'use strict';

import { locale } from '../gettext/locale';
import * as animate from '../services/animate';

export class Preloader {
  constructor(app) {
    this.app = app;
    this.ctx = this.app.DOM.preloaderCtx;
    this.gettext = locale[this.app.lang]["preloader"];
    this.timeForChar = 30;
  }

  run() {
    const viewPreloadScenes = async () => {
      await this.loadingSuccessScene();
      await animate.pauseBetween();
      await this.glitchScreen();
      await animate.pauseBetween();
      await this.loadingCrashIcon();
      await animate.pauseBetween();
      await this.loadingGoodCrashIcon();
      await animate.pauseBetween();
      await animate.pauseBetween();
    }

    viewPreloadScenes().then(() => {
      this.hide();
      this.app.sayHello();
    }).catch((err) => { console.log(err.message) });
  }

  loadingSuccessScene() {
    return new Promise((resolve, reject) => {
      const print = async () => {
        await animate.printText(this.ctx, this.gettext["success preload"], this.timeForChar);
      }

      print().then(() => {
        resolve();
      }).catch((err) => { console.log(err) });
    });
  }

  glitchScreen() {
    return new Promise((resolve, reject) => {
      this.ctx.innerHTML = '';
      this.app.DOM.body.classList.add('glitch');
      this.ctx.dataset.text += this.gettext["error preload"]["0"];

      const print = async () => {
        await animate.printText(this.ctx, this.gettext["error preload"], this.timeForChar);
      }

      print().then(() => {
        resolve();
      }).catch((err) => { console.log(err) });
    });
  }

  loadingCrashIcon() {
    return new Promise((resolve, reject) => {
      this.app.DOM.body.classList.add('crash');
      this.ctx.dataset.text = '';
      this.ctx.dataset.text += this.gettext["crash preload"]["0"];

      const drawCrashIcon = async () => {
        await animate.deleteText(this.ctx, this.gettext["error preload"], this.timeForChar);
        await animate.printText(this.ctx, this.gettext["crash preload"], this.timeForChar);
      }

      drawCrashIcon().then(() => {
        resolve();
      }).catch((err) => { console.log(err) });
    });
  }

  loadingGoodCrashIcon() {
    return new Promise((resolve, reject) => {
      const addClass = () => {
        this.app.DOM.body.classList.add('good-crash');
        this.ctx.dataset.text = '';
        this.ctx.dataset.text += this.gettext["goodcrash preload"]["0"];
      }

      const drawGoodCrashIcon = async () => {
        await animate.deleteText(this.ctx, this.gettext["crash preload"], this.timeForChar);
        await addClass();
        await animate.printText(this.ctx, this.gettext["goodcrash preload"], this.timeForChar);
      }

      drawGoodCrashIcon().then(() => {
        resolve();
      }).catch((err) => { console.log(err) });
    });
  }

  hide() {
    this.app.DOM.body.removeChild(this.app.DOM.preloader);
    this.app.DOM.body.classList = '';
  }
}
