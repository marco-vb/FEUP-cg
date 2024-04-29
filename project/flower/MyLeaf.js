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
    constructor(scene, stem_radius = 0.2) {
        super(scene);

        this.stem_radius = 2 * stem_radius;
        this.random = Math.random() * Math.PI * 2;

        // this ring is to make sure the various cylinders of the stem don't appear disconnected
        this.ring = new MyCilinder(scene);
        this.cilinder = new MyCilinder(scene, 0.05);
        this.up = new MyTriangle(scene);
        this.down = new MyTriangle(scene);
    }

    display() {
        this.scene.pushMatrix();
        {
            this.scene.scale(this.stem_radius, 0.1, this.stem_radius);
            this.scene.translate(0, -0.5, 0);
            this.ring.display();
        }
        this.scene.popMatrix();

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
