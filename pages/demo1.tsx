"use client";
import { useCallback, useEffect, useRef } from "react";
import { Assets, Application, Sprite } from "pixi.js";

export default function Demo1({ width = 800, height = 600 }) {
  const canvasRef = useRef(null);
  const init = useCallback(async () => {
    const canvas = canvasRef.current;
    const app = new Application();
    await app.init({ width, height, canvas, backgroundColor: 0x1099bb });
    const texture = await Assets.load("https://pixijs.com/assets/bunny.png");

    // Create a new Sprite from an image path.
    const bunny = new Sprite(texture);

    // Add to stage.
    app.stage.addChild(bunny);

    // Center the sprite's anchor point.
    bunny.anchor.set(0.5);

    // Move the sprite to the center of the screen.
    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;

    // Add an animation loop callback to the application's ticker.
    app.ticker.add((time) => {
      /**
       * Just for fun, let's rotate mr rabbit a little.
       * Time is a Ticker object which holds time related data.
       * Here we use deltaTime, which is the time elapsed between the frame callbacks
       * to create frame-independent transformation. Keeping the speed consistent.
       */
      bunny.rotation += 0.1 * time.deltaTime;
    });
    return app;
  }, []);

  useEffect(() => {
    const app = init();
    return async () => (await app).stop();
  }, [init]);

  return <canvas ref={canvasRef} />;
}
