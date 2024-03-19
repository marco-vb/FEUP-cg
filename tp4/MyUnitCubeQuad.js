import { CGFobject } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
  constructor(scene, top, bottom, front, back, left, right) {
    super(scene);
    this.initBuffers();
    this.top = top;
    this.bottom = bottom;
    this.front = front;
    this.back = back;
    this.left = left;
    this.right = right;
  }

  initBuffers() {
    this.quad = new MyQuad(this.scene);
  }

  display() {
    // Top
    this.scene.pushMatrix();
    this.scene.translate(0, 0.5, 0);
    this.scene.rotate((3 * Math.PI) / 2, 1, 0, 0);
    this.top.bind();
    this.scene.gl.texParameteri(
      this.scene.gl.TEXTURE_2D,
      this.scene.gl.TEXTURE_MAG_FILTER,
      this.scene.gl.NEAREST
    );
    this.quad.display();
    this.scene.popMatrix();

    // Front
    this.scene.pushMatrix();
    this.scene.translate(0.5, 0, 0);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.front.bind();
    this.scene.gl.texParameteri(
      this.scene.gl.TEXTURE_2D,
      this.scene.gl.TEXTURE_MAG_FILTER,
      this.scene.gl.NEAREST
    );
    this.quad.display();
    this.scene.popMatrix();

    // Right
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -0.5);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.right.bind();
    this.scene.gl.texParameteri(
      this.scene.gl.TEXTURE_2D,
      this.scene.gl.TEXTURE_MAG_FILTER,
      this.scene.gl.NEAREST
    );
    this.quad.display();
    this.scene.popMatrix();

    // Back
    this.scene.pushMatrix();
    this.scene.translate(-0.5, 0, 0);
    this.scene.rotate((3 * Math.PI) / 2, 0, 1, 0);
    this.back.bind();
    this.scene.gl.texParameteri(
      this.scene.gl.TEXTURE_2D,
      this.scene.gl.TEXTURE_MAG_FILTER,
      this.scene.gl.NEAREST
    );
    this.quad.display();
    this.scene.popMatrix();

    // Left
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.5);
    this.left.bind();
    this.scene.gl.texParameteri(
      this.scene.gl.TEXTURE_2D,
      this.scene.gl.TEXTURE_MAG_FILTER,
      this.scene.gl.NEAREST
    );
    this.quad.display();
    this.scene.popMatrix();

    // Bottom
    this.scene.pushMatrix();
    this.scene.translate(0, -0.5, 0);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.bottom.bind();
    this.scene.gl.texParameteri(
      this.scene.gl.TEXTURE_2D,
      this.scene.gl.TEXTURE_MAG_FILTER,
      this.scene.gl.NEAREST
    );
    this.quad.display();
    this.scene.popMatrix();
  }
}
