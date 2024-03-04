import { CGFobject } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
  constructor(scene) {
    super(scene);
    this.initBuffers();
  }

  initBuffers() {
    this.diamond = new MyDiamond(this.scene);
    this.parallelogram = new MyParallelogram(this.scene);
    this.triangle = new MyTriangle(this.scene);
    this.triangleSmTop = new MyTriangleSmall(this.scene);
    this.triangleSmBot = new MyTriangleSmall(this.scene);
    this.triangleBigLft = new MyTriangleBig(this.scene);
    this.triangleBigRgt = new MyTriangleBig(this.scene);
  }

  display() {
    var translate = [
      1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -2.5, 3.11,
      0.0, 1.0,
    ];

    this.scene.pushMatrix();
    this.scene.translate(1, 0, 0);
    {
      this.scene.pushMatrix();
      this.scene.multMatrix(translate);
      this.diamond.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(0, 2.85, 0);
      this.scene.rotate(Math.PI, 0, 0, 1);
      this.triangleSmTop.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(-Math.SQRT2, 2, 0);
      this.scene.rotate(-Math.PI / 32, 0, 0, 1);
      {
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2), -2, 0);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.triangleBigLft.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2), -4, 0);
        this.scene.scale(1, -1, 1);
        this.scene.rotate(-Math.PI / 4, 0, 0, 1);
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2, -4 + Math.sqrt(2), 0);
        this.triangleBigRgt.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(4 + 1 / 3, -4 + Math.sqrt(2), 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.triangleSmBot.display();
        this.scene.popMatrix();
      }
      this.scene.popMatrix();
    }
    this.scene.popMatrix();
  }
}
