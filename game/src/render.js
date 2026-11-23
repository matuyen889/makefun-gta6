// Caleta del Sol 3D — Fallback 2D Canvas Renderer
export class Canvas2DRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  render(world) {
    const ctx = this.ctx;
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
