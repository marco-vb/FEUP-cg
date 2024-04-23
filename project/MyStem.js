import { CGFobject } from '../lib/CGF.js';
import { MyCilinder } from './MyCilinder.js';

/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param height - Height of the stem
 */
export class MyStem extends CGFobject {
    constructor(scene, cilinders = 1, radius = 0.1) {
        super(scene);
        this.cilinders = cilinders;
        this.cilinder_list = [];
        for (var i = 0; i < cilinders; i++) {
            this.cilinder_list.push(new MyCilinder(scene, radius));
        }
    }

    display() {
        for (var i = 0; i < this.cilinders; i++) {
            this.scene.pushMatrix();
            for (var j = 0; j < i; j++) {
                this.scene.translate(0, 1, 0);
            }
            this.cilinder_list[i].display();
            this.scene.popMatrix();
        }
    }
}
