import { CGFobject } from '../../lib/CGF.js';
import { CGFtexture } from '../../lib/CGF.js';
import { CGFappearance } from '../../lib/CGF.js';
import { MySphere } from '../shapes/MySphere.js';
import { Colors } from '../utils/Colors.js';
import { Textures } from '../utils/Textures.js';

/**
 * MyRock
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRock extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, false, 20, 20, true);
        this.colors = new Colors(scene);
        this.textures = new Textures(scene);
        this.rock_texture = this.textures.getTexture("rock");
        this.rock_appereance = new CGFappearance(this.scene);
        this.rock_appereance.setTexture(this.rock_texture);
        this.rock_appereance.setTextureWrap('REPEAT', 'REPEAT');
        this.rock_appereance.setAmbient(0.7, 0.7, 0.7, 1);
        this.rock_appereance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.rock_appereance.setSpecular(0.3, 0.3, 0.3, 1);
        this.rock_appereance.setShininess(5.0);
    }

    display() {
        this.rock_appereance.apply();
        this.sphere.display();
    }
}
