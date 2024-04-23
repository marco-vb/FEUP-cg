import { CGFobject } from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyStem } from './MyStem.js';
import { MyReceptacle } from './MyReceptacle.js';
import { CGFtexture } from '../lib/CGF.js';
import { CGFappearance } from '../lib/CGF.js';

/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
    constructor(scene) {
        super(scene);
        this.stem_height = 3;
        this.receptacle_radius = 0.3;
        this.petals_number = 8;

        this.yellow = new CGFappearance(this.scene);
        this.yellow.setAmbient(0.75, 0.75, 0, 1.0);
        this.yellow.setDiffuse(0.75, 0.75, 0, 1.0);
        this.yellow.setSpecular(1.0, 1.0, 0, 1.0);
        this.yellow.setShininess(10.0);

        this.green = new CGFappearance(this.scene);
        this.green.setAmbient(0, 0.3, 0, 1.0);
        this.green.setDiffuse(0, 0.3, 0, 1.0);
        this.green.setSpecular(0, 1.0, 0, 1.0);
        this.green.setShininess(10.0);

        this.pink = new CGFappearance(this.scene);
        this.pink.setAmbient(1, .7, .7, 1.0);
        this.pink.setDiffuse(1, .7, .7, 1.0);
        this.pink.setSpecular(1, .71, .75, 1);
        this.pink.setShininess(10.0);

        this.stem = new MyStem(scene, this.stem_height);
        this.receptacle = new MyReceptacle(scene, this.receptacle_radius);
        this.petals = [];
        for (var i = 0; i < this.petals_number; i++) {
            this.petals.push(new MyPetal(scene));
        }
    }

    display() {
        this.scene.enableTextures(false);
        this.scene.pushMatrix();
        this.scene.translate(0, this.stem_height - this.receptacle_radius / 2, 0);
        this.yellow.apply();
        this.receptacle.display();
        this.scene.popMatrix();

        this.green.apply();
        this.stem.display();

        this.scene.pushMatrix();
        this.pink.apply();
        for (var i = 0; i < this.petals_number; i++) {
            this.scene.pushMatrix();
            this.scene.rotate(2 * i * Math.PI / this.petals_number, 0, 1, 0);
            this.scene.translate(0, 0, -1);
            this.scene.translate(0, this.stem_height, 0);
            this.petals[i].display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();

        this.scene.enableTextures(true);
    }
}
