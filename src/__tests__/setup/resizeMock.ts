export function mockRAF() {
  let callbacks: FrameRequestCallback[] = [];

  window.requestAnimationFrame = (cb: FrameRequestCallback) => {
    callbacks.push(cb);
    return 1; // fake ID
  };

  return {
    flush() {
      callbacks.forEach((cb) => cb(16));
      callbacks = [];
    },
  };
}
