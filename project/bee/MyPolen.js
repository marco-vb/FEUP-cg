import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MySphere } from '../shapes/MySphere.js';
import { Textures } from '../utils/Textures.js';

/**
 * MyPolen
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPolen extends CGFobject {
    constructor (scene) {
        super(scene);
        this.sphere = new MySphere(scene);

        const textures = new Textures(scene);
        this.texture = textures.getTexture("polen");

        this.appearance = new CGFappearance(scene);
        this.appearance.setAmbient(0.1, 0.1, 0.1, 1);
        this.appearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.appearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.appearance.setShininess(10.0);
        this.appearance.setTexture(this.texture);
    }

    display () {
        this.scene.pushMatrix();
        {
            this.scene.scale(0.25, 0.25, 0.25);
            this.scene.scale(1, 1.5, 1);
            this.appearance.apply();
            this.sphere.display();
        }
        this.scene.popMatrix();
    }
}
