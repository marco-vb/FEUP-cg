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
        this.leaves_list = [];
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
            for (var j = 0; j < i; j++) {
                this.scene.translate(0, 1, 0);
            }
            this.cilinder_list[i].display();
            if (this.leaves_list.length > 0 && i > 0) {
                // this.scene.translate(0, 1, 0);
                this.leaves_list[i - 1].display();
            }
            this.scene.popMatrix();
        }
    }
}
