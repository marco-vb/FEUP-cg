import { CGFobject } from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';

/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPetal extends CGFobject {
    constructor(scene) {
        super(scene);
        this.down = new MyTriangle(scene);
        this.up = new MyTriangle(scene);
        this.initBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.down.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 3, 1, 0, 0);
        this.up.display();
        this.scene.popMatrix();
    }
}
