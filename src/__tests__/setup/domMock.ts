// Mocks offsetWidth for container and each grid element

Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
  configurable: true,
  get() {
    // default simulated container width
    if (this.classList.contains("rcrg-container")) return 1000;
    return 250; // each grid 250px initially
  },
});
