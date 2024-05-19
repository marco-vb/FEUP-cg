import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MySphere } from '../shapes/MySphere.js';
import { Textures } from '../utils/Textures.js';
import { MyPolen } from './MyPolen.js';

/**
 * MyHive
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyHive extends CGFobject {
    constructor (scene, position) {
        super(scene);

        this.position = position;

        const { x, y, z } = position;

        this.x = x;
        this.y = y;
        this.z = z;

        this.base = new MySphere(scene);
        this.layers = [];
        for (var i = 0; i < 4; i++) {
            this.layers.push(new MySphere(scene));
        }

        this.pollens = [];

        const textures = new Textures(scene);
        this.texture = textures.getTexture("hive");

        this.appearance = new CGFappearance(scene);
        this.appearance.setAmbient(0.1, 0.1, 0.1, 1);
        this.appearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.appearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.appearance.setShininess(10.0);
        this.appearance.setTexture(this.texture);
    }

    display () {
        this.appearance.apply();
        this.scene.pushMatrix();
        {
            this.scene.translate(this.x, this.y, this.z);

            this.scene.pushMatrix();
            {
                this.scene.scale(2, 0.75, 2);
                this.base.display();
            }
            this.scene.popMatrix();

            for (var i = 0; i < 4; i++) {
                this.scene.pushMatrix();
                {
                    this.scene.scale(2.5 - i * 0.5, 0.75, 2.5 - i * 0.5);
                    this.scene.translate(0, 1 + i, 0);
                    this.layers[ i ].display();
                }
                this.scene.popMatrix();
            }

            for (let i = 0; i < this.pollens.length; i++) {
                this.scene.pushMatrix();
                {
                    this.scene.rotate(i * 2 * Math.PI / this.pollens.length, 0, 1, 0);
                    this.scene.translate(0.5, 3.75, 0);
                    this.scene.scale(0.5, 0.5, 0.5);
                    this.pollens[ i ].display();
                }
                this.scene.popMatrix();
            }
        }
        this.scene.popMatrix();
    }
}
