"use client";
import { useCallback, useEffect, useRef } from "react";
import { Assets, Application } from "pixi.js";
import { SpineBoy } from "./SpineBoy";
import { Controller } from "./Controller";
import { Scene } from "./Scene";

export default function SpineBoyPage({ width = 800, height = 600 }) {
  const canvasRef = useRef(null);
  const init = useCallback(async () => {
    const canvas = canvasRef.current;
    const app = new Application();
    await app.init({ width, height, canvas, backgroundColor: "#021f4b" });
    await Assets.load([
      {
        alias: "spineSkeleton",
        src: "https://raw.githubusercontent.com/pixijs/spine-v8/main/examples/assets/spineboy-pro.skel",
      },
      {
        alias: "spineAtlas",
        src: "https://raw.githubusercontent.com/pixijs/spine-v8/main/examples/assets/spineboy-pma.atlas",
      },
      {
        alias: "sky",
        src: "https://pixijs.com/assets/tutorials/spineboy-adventure/sky.png",
      },
      {
        alias: "background",
        src: "https://pixijs.com/assets/tutorials/spineboy-adventure/background.png",
      },
      {
        alias: "midground",
        src: "https://pixijs.com/assets/tutorials/spineboy-adventure/midground.png",
      },
      {
        alias: "platform",
        src: "https://pixijs.com/assets/tutorials/spineboy-adventure/platform.png",
      },
    ]);

    // Create our character
    const spineBoy = new SpineBoy();
    const scene = new Scene(app.screen.width, app.screen.height);

    app.stage.addChild(scene.view, spineBoy.view);
    // Adjust character transformation.
    spineBoy.view.x = app.screen.width / 2;
    spineBoy.view.y = app.screen.height - 80;
    spineBoy.spine.scale.set(0.5);

    // Add character to the stage.
    app.stage.addChild(spineBoy.view);

    scene.view.y = app.screen.height;
    spineBoy.view.x = app.screen.width / 2;
    spineBoy.view.y = app.screen.height - scene.floorHeight;
    spineBoy.spine.scale.set(scene.scale * 0.32);

    const controller = new Controller();

    spineBoy.spawn();

    app.ticker.add(() => {
      if (spineBoy.isSpawning()) return;

      spineBoy.state.walk =
        controller.keys.left.pressed || controller.keys.right.pressed;
      if (spineBoy.state.run && spineBoy.state.walk) spineBoy.state.run = true;
      else
        spineBoy.state.run =
          controller.keys.left.doubleTap || controller.keys.right.doubleTap;
      spineBoy.state.hover = controller.keys.down.pressed;
      if (controller.keys.left.pressed) spineBoy.direction = -1;
      else if (controller.keys.right.pressed) spineBoy.direction = 1;
      spineBoy.state.jump = controller.keys.space.pressed;

      spineBoy.update();

      let speed = 1.25;

      if (spineBoy.state.hover) speed = 7.5;
      else if (spineBoy.state.run) speed = 3.75;

      if (spineBoy.state.walk) {
        scene.positionX -= speed * scene.scale * spineBoy.direction;
      }
    });
  }, []);

  useEffect(() => {
    const app = init();
    return async () => (await app).stop();
  }, [init]);

  return <canvas ref={canvasRef} />;
}
