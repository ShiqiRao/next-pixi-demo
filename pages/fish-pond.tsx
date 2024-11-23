"use client";
import { useCallback, useEffect, useRef } from "react";
import { Assets, Application, Container, Sprite } from "pixi.js";

function addBackground(app) {
  const background = Sprite.from("background");
  app.stage.addChild(background);
  background.anchor.set(0.5);
  if (app.screen.width > app.screen.height) {
    background.width = app.screen.width * 1.2;
    background.scale.y = background.scale.x;
  } else {
    background.height = app.screen.height * 1.2;
    background.scale.x = background.scale.y;
  }
  background.x = app.screen.width / 2;
  background.y = app.screen.height / 2;
}

function animateFishes(app, fishes) {

  const stagePadding = 100;
  const boundWidth = app.screen.width + stagePadding * 2;
  const boundHeight = app.screen.height + stagePadding * 2;
  fishes.forEach((fish) => {
    fish.direction += fish.turnSpeed * 0.01;
    fish.x += Math.sin(fish.direction) * fish.speed;
    fish.y += Math.cos(fish.direction) * fish.speed;
    fish.rotation = -fish.direction - Math.PI / 2;

    if (fish.x < -stagePadding) {
      fish.x += boundWidth;
    }
    if (fish.x > app.screen.width + stagePadding) {
      fish.x -= boundWidth;
    }
    if (fish.y < -stagePadding) {
      fish.y += boundHeight;
    }
    if (fish.y > app.screen.height + stagePadding) {
      fish.y -= boundHeight;
    }
  });
}

function addFishes(app, fishes) {
  const fishContainer = new Container();

  app.stage.addChild(fishContainer);
  const fishCount = 20;
  const fishAssets = ["fish1", "fish2", "fish3", "fish4", "fish5"];
  for (let i = 0; i < fishCount; i++) {
    const fishAsset = fishAssets[i % fishAssets.length];
    const fish = Sprite.from(fishAsset);

    fish.anchor.set(0.5);

    fish.direction = Math.random() * Math.PI * 2;
    fish.speed = 2 + Math.random() * 2;
    fish.turnSpeed = Math.random() - 0.8;

    fish.x = Math.random() * app.screen.width;
    fish.y = Math.random() * app.screen.height;
    fish.scale.set(0.5 + Math.random() * 0.2);

    fishContainer.addChild(fish);
    fishes.push(fish);
  }
}

export default function Demo2({}) {
  const canvasRef = useRef(null);
  const setup = useCallback(async (app, canvas) => {
    await app.init({ background: "#1099bb", canvas, width: 800, height: 600 });
  });

  const preload = useCallback(async () => {
    const assets = [
      {
        alias: "background",
        src: "https://pixijs.com/assets/tutorials/fish-pond/pond_background.jpg",
      },
      {
        alias: "fish1",
        src: "https://pixijs.com/assets/tutorials/fish-pond/fish1.png",
      },
      {
        alias: "fish2",
        src: "https://pixijs.com/assets/tutorials/fish-pond/fish2.png",
      },
      {
        alias: "fish3",
        src: "https://pixijs.com/assets/tutorials/fish-pond/fish3.png",
      },
      {
        alias: "fish4",
        src: "https://pixijs.com/assets/tutorials/fish-pond/fish4.png",
      },
      {
        alias: "fish5",
        src: "https://pixijs.com/assets/tutorials/fish-pond/fish5.png",
      },
      {
        alias: "overlay",
        src: "https://pixijs.com/assets/tutorials/fish-pond/wave_overlay.png",
      },
      {
        alias: "displacement",
        src: "https://pixijs.com/assets/tutorials/fish-pond/displacement_map.png",
      },
    ];
    await Assets.load(assets);
  });
  const init = useCallback(async () => {
    const canvas = canvasRef.current;
    const app = new Application();
    const fishes = [];
    await setup(app, canvas);
    await preload();

    addBackground(app);
    addFishes(app, fishes);
    app.ticker.add(() => animateFishes(app, fishes));
    return app;
  }, []);

  useEffect(() => {
    const app = init();
    return async () => (await app).stop();
  }, [init]);

  return <canvas ref={canvasRef} />;
}
