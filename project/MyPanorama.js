import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MySphere } from './shapes/MySphere.js';

/**
 * MyPanorama
 * @constructor
 * @param texture - Texture for the panorama
 */
export class MyPanorama extends CGFobject {
    constructor(scene, texture, position = [0, 0, 0]) {
        super(scene);
        this.texture = texture;
        this.sphere = new MySphere(scene, true);
        this.position = position;
        this.initBuffers();
    }

    initBuffers() {
        // Initialize texture
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.setAmbient(1, 1, 1, 1);
    }

    update_position(position) {
        this.position = position;
    }

    display() {
        this.appearance.apply();
        this.scene.pushMatrix();
        this.scene.translate(...this.position);
        this.scene.scale(200, 200, 200);
        this.sphere.display();
        this.scene.popMatrix();
    }
}


