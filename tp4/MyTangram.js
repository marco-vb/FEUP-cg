import { CGFobject, CGFappearance } from "../lib/CGF.js";
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

        this.tangramMaterial = new CGFappearance(scene);
        this.tangramMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.tangramMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setShininess(10.0);
        this.tangramMaterial.loadTexture('images/tangram.png');

        this.initBuffers();
    }

    initBuffers() {
        this.diamond = new MyDiamond(this.scene, [0.5, 0, 0.75, 0.25, 0.5, 0.5, 0.25, 0.25]);
        this.parallelogram = new MyParallelogram(this.scene, [0.25, 0.75, 0.5, 1, 1, 1, 0.75, 0.75]);
        this.triangle = new MyTriangle(this.scene, [0, 0.5, 0, 1, 0.25, 0.75]);
        this.triangleSmTop = new MyTriangleSmall(this.scene, [0.25, 0.75, 0.5, 0.5, 0.75, 0.75]);
        this.triangleSmBot = new MyTriangleSmall(this.scene, [0, 0, 0, 0.5, 0.25, 0.25]);
        this.triangleBigLft = new MyTriangleBig(this.scene, [0.5, 0.5, 1, 0, 1, 1]);
        this.triangleBigRgt = new MyTriangleBig(this.scene, [0.5, 0, 1, 0, 0.75, 0.25]);
    }

    display() {
        this.tangramMaterial.apply();

        var translate = [
            1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -2.5, 3.11,
            0.0, 1.0,
        ];

        this.scene.pushMatrix();
        this.scene.translate(1, 0, 0);
        {
            this.scene.pushMatrix();
            this.scene.multMatrix(translate);
            this.tangramMaterial.apply();
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
