import { CGFobject } from '../../lib/CGF.js';
import { MyTriangle } from '../shapes/MyTriangle.js';

/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPetal extends CGFobject {
    constructor(scene, angle = -Math.PI / 3) {
        super(scene);
        this.down = new MyTriangle(scene);
        this.up = new MyTriangle(scene);
        this.angle = angle;
        this.initBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.rotate(-Math.PI / 3, 1, 0, 0);
        {
            this.scene.pushMatrix();
            this.scene.rotate(Math.PI, 1, 0, 0);
            this.down.display();
            this.scene.popMatrix();
            this.scene.pushMatrix();
            this.scene.rotate(this.angle, 1, 0, 0);
            this.up.display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }
}
