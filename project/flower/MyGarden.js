import { CGFobject } from '../../lib/CGF.js';
import { Colors } from '../utils/Colors.js';
import { MyFlower } from './MyFlower.js';

/**
 * MyGarden
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGarden extends CGFobject {
    constructor (scene, rows = 5, cols = 5, position = { x: 0, y: 0, z: 0 }) {
        super(scene);
        this.position = position;
        this.rows = rows;
        this.cols = cols;
        this.colors = new Colors(scene);

        this.garden = [];
        for (var i = 0; i < this.rows; i++) {
            this.garden.push([]);
            for (var j = 0; j < this.cols; j++) {
                this.garden[ i ].push(new MyFlower(scene));
            }
        }
    }

    display () {
        this.scene.pushMatrix();
        {
            this.scene.translate(this.position.x, this.position.y, this.position.z);
            for (var i = 0; i < this.rows; i++) {
                for (var j = 0; j < this.cols; j++) {
                    const x = 2 * i - this.rows + 1;
                    const y = 0;
                    const z = 2 * j - this.cols + 1;

                    const height = this.garden[ i ][ j ].height;
                    this.scene.pushMatrix();
                    this.scene.translate(x, y, z);
                    this.garden[ i ][ j ].display();
                    const pos = { x: this.position.x + x, y: this.position.y + y + height, z: this.position.z + z };
                    this.garden[ i ][ j ].position = pos;
                    this.scene.popMatrix();
                }
            }
        }
        this.scene.popMatrix();
    }
}
