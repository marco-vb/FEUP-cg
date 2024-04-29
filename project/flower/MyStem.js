import { CGFobject } from '../../lib/CGF.js';
import { MyCilinder } from '../shapes/MyCilinder.js';
import { MyLeaf } from './MyLeaf.js';

/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param height - Height of the stem
 */
export class MyStem extends CGFobject {
    constructor(scene, cilinders = 1, radius = 0.1, leaves = true) {
        super(scene);
        this.cilinders = cilinders;
        this.cilinder_list = [];
        this.leaves = leaves;
        this.leaves_list = [];
        this.inclination = Math.random() * Math.PI / 16;
        for (var i = 0; i < cilinders; i++) {
            this.cilinder_list.push(new MyCilinder(scene, radius));
            if (leaves && i > 0) {
                this.leaves_list.push(new MyLeaf(scene, radius * 2));
            }
        }
    }

    display() {
        for (var i = 0; i < this.cilinders; i++) {
            this.scene.pushMatrix();
            {
                this.scene.translate(0, 0.5, 0);
                this.scene.translate(0, i, 0);

                if (i % 2) {
                    this.scene.rotate(-this.inclination, 0, 0, 1);
                } else {
                    this.scene.rotate(this.inclination, 0, 0, 1);
                }

                this.scene.translate(0, -0.5, 0);

                this.cilinder_list[i].display();

                if (this.leaves && i > 0) {
                    this.leaves_list[i - 1].display();
                }
            }
            this.scene.popMatrix();
        }
    }
}
