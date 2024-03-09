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
        this.initBuffers();

        this.red = new CGFappearance(this.scene);
        this.red.setAmbient(.2, 0, 0, 1.0);
        this.red.setDiffuse(.2, 0, 0, 1.0);
        this.red.setSpecular(1.0, 0, 0, 1.0);
        this.red.setShininess(10.0);

        this.green = new CGFappearance(this.scene);
        this.green.setAmbient(0, .2, 0, 1.0);
        this.green.setDiffuse(0, .2, 0, 1.0);
        this.green.setSpecular(0, 1.0, 0, 1.0);
        this.green.setShininess(10.0);

        this.blue = new CGFappearance(this.scene);
        this.blue.setAmbient(0, 0, .2, 1.0);
        this.blue.setDiffuse(0, 0, .2, 1.0);
        this.blue.setSpecular(0, 0, 1.0, 1.0);
        this.blue.setShininess(10.0);

        this.yellow = new CGFappearance(this.scene);
        this.yellow.setAmbient(.2, .2, 0, 1.0);
        this.yellow.setDiffuse(.2, .2, 0, 1.0);
        this.yellow.setSpecular(1.0, 1.0, 0, 1.0);
        this.yellow.setShininess(10.0);

        this.orange = new CGFappearance(this.scene);
        this.orange.setAmbient(.2, .1, 0, 1.0);
        this.orange.setDiffuse(.2, .1, 0, 1.0);
        this.orange.setSpecular(1.0, .5, 0, 1.0);
        this.orange.setShininess(10.0);

        this.pink = new CGFappearance(this.scene);
        this.pink.setAmbient(.5, .355, .375, 1.0);
        this.pink.setDiffuse(.5, .355, .375, 1.0);
        this.pink.setSpecular(1, .71, .75, 1);
        this.pink.setShininess(10.0);

        this.purple = new CGFappearance(this.scene);
        this.purple.setAmbient(.1, 0, .1, 1.0);
        this.purple.setDiffuse(.1, 0, .1, 1.0);
        this.purple.setSpecular(.5, 0, .5, 1.0);
        this.purple.setShininess(10.0);
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

        this.scene.customMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(1, 0, 0);
        {
            this.scene.pushMatrix();
            this.scene.multMatrix(translate);
            this.scene.customMaterial.apply();
            // this.green.apply();
            this.diamond.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0, 2.85, 0);
            this.scene.rotate(Math.PI, 0, 0, 1);
            this.red.apply();
            this.triangleSmTop.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(-Math.SQRT2, 2, 0);
            this.scene.rotate(-Math.PI / 32, 0, 0, 1);
            {
                this.scene.pushMatrix();
                this.scene.rotate(Math.PI / 4, 0, 0, 1);
                this.pink.apply();
                this.triangle.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.translate(-Math.sqrt(2), -2, 0);
                this.scene.rotate(-Math.PI / 2, 0, 0, 1);
                this.orange.apply();
                this.triangleBigLft.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.translate(-Math.sqrt(2), -4, 0);
                this.scene.scale(1, -1, 1);
                this.scene.rotate(-Math.PI / 4, 0, 0, 1);
                this.yellow.apply();
                this.parallelogram.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.translate(2, -4 + Math.sqrt(2), 0);
                this.blue.apply();
                this.triangleBigRgt.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.translate(4 + 1 / 3, -4 + Math.sqrt(2), 0);
                this.scene.rotate(Math.PI, 0, 0, 1);
                this.purple.apply();
                this.triangleSmBot.display();
                this.scene.popMatrix();
            }
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }
}
