import { CGFobject } from "../../lib/CGF.js";

class GrassLayer extends CGFobject {
  constructor(scene, y, xl, xr, step) {
    super(scene);
    this.y = y;
    this.xl = xl;
    this.xr = xr;
    this.step = step;
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [
      this.xr,
      this.y,
      0,
      this.xl,
      this.y,
      0,
      this.xr - this.step,
      this.y + 2 * this.step,
      0,
      this.xl + this.step,
      this.y + 2 * this.step,
      0,
    ];

    this.indices = [0, 1, 2, 1, 2, 3, 1, 0, 2, 2, 1, 3];

    this.normals = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1];

    // this.texCoords = [
    //     0, 0,
    //     0, 1,
    //     1, 0,
    //     1, 1
    // ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}

/**
 * MySingleGrass
 */
export class MySingleGrass extends CGFobject {
  constructor(scene) {
    super(scene);
    this.grassLayers = [];
    this.currentAngle = 0;
    this.minAngle = 0;
    this.maxAngle = 0.5;
    this.initBuffers();
  }

  initBuffers() {
    const layers = 10;
    let step = 0.1,
      xl = -1,
      xr = 1,
      y = 0;

    for (let i = 0; i < layers; i++) {
      this.grassLayers.push(new GrassLayer(this.scene, y, xl, xr, step));
      y += 2 * step;
      xl += step;
      xr -= step;
    }
  }

  animate() {}

  display() {
    this.animate();
    for (let grassLayer of this.grassLayers) {
      grassLayer.display();
    }
  }
}
