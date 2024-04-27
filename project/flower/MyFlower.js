import { CGFobject } from '../../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyStem } from './MyStem.js';
import { MyReceptacle } from './MyReceptacle.js';
import { CGFtexture } from '../../lib/CGF.js';
import { CGFappearance } from '../../lib/CGF.js';
import { Colors } from '../utils/Colors.js';

// flower default parameters
const default_params = {
    radius: 1,
    stem_height: 2,
    stem_radius: 1 / 12,
    stem_color: "green",
    petals: 6,
    petal_color: "pink",
    petal_angle: -Math.PI / 4,
    receptacle_radius: 1 / 5,
    receptacle_color: "yellow",
    leaf_color: "dark_green"
};

/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
    constructor(scene, params = default_params) {
        super(scene);

        this.radius = params.radius;
        this.receptacle_radius = params.receptacle_radius;
        this.stem_height = params.stem_height + Math.floor(4 * Math.random());
        this.stem_radius = params.stem_radius;
        this.stem_color = params.stem_color;
        this.petals_number = params.petals + Math.floor(4 * Math.random());
        this.petal_color = params.petal_color;
        this.petal_angle = params.petal_angle + (0.5 - Math.random()) / 2;
        this.receptacle_color = params.receptacle_color;

        this.colors = new Colors(scene);
        this.stem = new MyStem(scene, this.stem_height, this.stem_radius);
        this.receptacle = new MyReceptacle(scene, this.receptacle_radius);

        this.petals = [];
        for (var i = 0; i < this.petals_number; i++) {
            this.petals.push(new MyPetal(scene, this.petal_angle));
        }
    }

    display() {
        this.scene.enableTextures(false);
        this.scene.pushMatrix();
        {
            this.scene.translate(0, this.stem_height - this.receptacle_radius / 2, 0);
            this.colors.apply(this.receptacle_color);
            this.receptacle.display();
        }
        this.scene.popMatrix();

        this.colors.apply(this.stem_color);
        this.stem.display();

        this.scene.pushMatrix();
        {
            this.colors.apply(this.petal_color);
            for (var i = 0; i < this.petals_number; i++) {
                this.scene.pushMatrix();
                {
                    this.scene.rotate(2 * i * Math.PI / this.petals_number, 0, 1, 0);
                    this.scene.translate(0, this.stem_height + this.radius / 3, 0);
                    this.scene.scale(this.radius, this.radius, this.radius);
                    this.scene.translate(0, 0, -1);
                    this.petals[i].display();
                }
                this.scene.popMatrix();
            }
        }
        this.scene.popMatrix();

        this.scene.enableTextures(true);
    }
}
