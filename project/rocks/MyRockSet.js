import { CGFobject } from '../../lib/CGF.js';
import { CGFtexture } from '../../lib/CGF.js';
import { CGFappearance } from '../../lib/CGF.js';
import { MySphere } from '../shapes/MySphere.js';
import { Colors } from '../utils/Colors.js';
import { Textures } from '../utils/Textures.js';
import { MyRock } from './MyRock.js';

/**
 * MyRockSet - a pyramid of rocks
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRockSet extends CGFobject {
    constructor(scene) {
        super(scene);
        this.height = 12;
        this.rock_number = 0;

        for (let i = this.height; i > 0; i--) {
            this.rock_number += 2 * i + Math.max(0, 2 * (i - 2));
        }

        this.rocks = [];
        this.deforms = [];
        for (let i = 0; i < this.rock_number; i++) {
            this.rocks.push(new MyRock(scene));
            let def = [];
            for (let j = 0; j < 3; j++) {
                def.push(Math.random() * 0.3 - 0.15);
            }
            this.deforms.push(def);
        }
    }

    display() {
        let curr = 0;
        for (let i = this.height; i > 0; i--) {
            this.scene.pushMatrix();
            {
                this.scene.translate(-i / 2, (this.height - i) / 2, -i / 2);
                for (let j = 0; j < i; j++) {
                    this.scene.pushMatrix();
                    {
                        this.scene.translate(j + 0.5, 0, 0.5);
                        const x = this.deforms[curr][0];
                        const y = this.deforms[curr][1];
                        const z = this.deforms[curr][2];
                        this.scene.scale(0.5 + x, 0.5 + y, 0.5 + z);
                        this.rocks[curr++].display();
                    }
                    this.scene.popMatrix();
                }
            }
            this.scene.popMatrix();

            this.scene.pushMatrix();
            {
                this.scene.translate(-i / 2, (this.height - i) / 2, 0);
                this.scene.rotate(Math.PI / 2, 0, 1, 0);
                this.scene.translate(-(i - 2) / 2, 0, 0);
                for (let j = 0; j < i - 2; j++) {
                    this.scene.pushMatrix();
                    {
                        this.scene.translate(j + 0.5, 0, 0.5);
                        const x = this.deforms[curr][0];
                        const y = this.deforms[curr][1];
                        const z = this.deforms[curr][2];
                        this.scene.scale(0.5 + x, 0.5 + y, 0.5 + z);
                        this.rocks[curr++].display();
                    }
                    this.scene.popMatrix();
                }
            }
            this.scene.popMatrix();

            this.scene.pushMatrix();
            {
                this.scene.translate(i / 2, (this.height - i) / 2, 0);
                this.scene.rotate(Math.PI / 2, 0, 1, 0);
                this.scene.translate(-(i - 2) / 2, 0, 0);
                for (let j = 0; j < i - 2; j++) {
                    this.scene.pushMatrix();
                    {
                        this.scene.translate(j + 0.5, 0, -0.5);
                        const x = this.deforms[curr][0];
                        const y = this.deforms[curr][1];
                        const z = this.deforms[curr][2];
                        this.scene.scale(0.5 + x, 0.5 + y, 0.5 + z);
                        this.rocks[curr++].display();
                    }
                    this.scene.popMatrix();
                }
            }
            this.scene.popMatrix();

            this.scene.pushMatrix();
            {
                this.scene.translate(-i / 2, (this.height - i) / 2, i / 2);
                for (let j = 0; j < i; j++) {
                    this.scene.pushMatrix();
                    {
                        this.scene.translate(j + 0.5, 0, -0.5);
                        const x = this.deforms[curr][0];
                        const y = this.deforms[curr][1];
                        const z = this.deforms[curr][2];
                        this.scene.scale(0.5 + x, 0.5 + y, 0.5 + z);
                        this.rocks[curr++].display();
                    }
                    this.scene.popMatrix();
                }
            }
            this.scene.popMatrix();
        }
    }
}