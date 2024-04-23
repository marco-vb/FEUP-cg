import { CGFobject } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

/**
 * MyReceptacle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Radius of the Receptacle
 */
export class MyReceptacle extends CGFobject {
    constructor(scene, radius = 0.25) {
        super(scene);
        this.radius = radius;
        this.sphere = new MySphere(scene);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(this.radius, this.radius, this.radius);
        this.sphere.display();
        this.scene.popMatrix();
    }
}
