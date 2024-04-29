import { CGFobject } from '../../lib/CGF.js';
import { MyCilinder } from '../shapes/MyCilinder.js';
import { MyTriangle } from '../shapes/MyTriangle.js';

/**
 * MyLeaf
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of sides
 * @param stacks - Number of stacks
 */
export class MyLeaf extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cilinder = new MyCilinder(scene, 0.05);
        this.up = new MyTriangle(scene);
        this.down = new MyTriangle(scene);
        this.random = Math.random() * Math.PI * 2;
    }

    display() {
        this.scene.pushMatrix();
        {
            this.scene.rotate(this.random, 0, 1, 0);
            this.scene.rotate(this.random, 0, 0, 1);

            this.scene.pushMatrix();
            {
                this.scene.rotate(Math.PI / 2, 1, 0, 0);
                this.scene.scale(0.5, 0.5, 0.5);
                this.cilinder.display();
            }
            this.scene.popMatrix();

            this.scene.pushMatrix();
            {
                this.scene.rotate(Math.PI / 2, 0, 0, 1);
                this.scene.translate(0, 0, 0.5);
                this.scene.scale(0.25, 0.1, 0.25);
                this.up.display();
            }
            this.scene.popMatrix();

            this.scene.pushMatrix();
            {
                this.scene.rotate(3 * Math.PI / 2, 0, 0, 1);
                this.scene.translate(0, 0, 0.5);
                this.scene.scale(0.25, 0.1, 0.25);
                this.down.display();

            }
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }
}
