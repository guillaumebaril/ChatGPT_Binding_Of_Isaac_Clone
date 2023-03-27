let lastTime = 0;
let frameCounter = 0;
let fps = 0;

export function updateFPSCounter(time) {
  frameCounter++;
  const elapsedTime = time - lastTime;

  if (elapsedTime >= 1000) {
    fps = frameCounter;
    frameCounter = 0;
    lastTime = time;
  }

  return fps;
}
