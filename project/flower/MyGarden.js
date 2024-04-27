import { CGFobject } from '../../lib/CGF.js';
import { Colors } from '../utils/Colors.js';
import { MyFlower } from './MyFlower.js';

/**
 * MyGarden
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGarden extends CGFobject {
    constructor(scene, rows = 5, cols = 5) {
        super(scene);
        this.rows = rows;
        this.cols = cols;
        this.colors = new Colors(scene);

        this.garden = [];
        for (var i = 0; i < this.rows; i++) {
            this.garden.push([]);
            for (var j = 0; j < this.cols; j++) {
                this.garden[i].push(new MyFlower(scene));
            }
        }
    }

    display() {
        this.scene.enableTextures(false);
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                this.scene.pushMatrix();
                this.scene.translate(2 * i - this.rows + 1, 0, 2 * j - this.cols + 1);
                this.garden[i][j].display();
                this.scene.popMatrix();
            }
        }
        this.scene.enableTextures(true);
    }
}
