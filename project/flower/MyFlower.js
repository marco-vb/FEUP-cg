import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyStem } from './MyStem.js';
import { MyReceptacle } from './MyReceptacle.js';
import { Colors } from '../utils/Colors.js';
import { Textures } from '../utils/Textures.js';
import { MyPolen } from '../bee/MyPolen.js';

// flower default parameters
const default_params = {
    radius: 1,
    stem_height: 2,
    stem_radius: 1 / 24,
    stem_color: "green",
    stem_inclination: Math.PI / 16,
    petals: 6,
    petal_color: "pink",
    petal_angle: -Math.PI / 4,
    receptacle_radius: 1 / 8,
    receptacle_color: "yellow",
    leaf_color: "dark_green"
};

/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
    constructor (scene, params = default_params) {
        super(scene);

        this.radius = params.radius;
        this.receptacle_radius = params.receptacle_radius;
        this.stem_height = params.stem_height + Math.floor(4 * Math.random());
        this.stem_radius = params.stem_radius;
        this.stem_color = params.stem_color;
        this.stem_inclination = params.stem_inclination * Math.random();
        this.petals_number = params.petals + Math.floor(4 * Math.random());
        this.petal_color = params.petal_color;
        this.petal_angle = params.petal_angle + (0.5 - Math.random()) / 2;
        this.receptacle_color = params.receptacle_color;
        this.polen_rotation = Math.random() * Math.PI / 6;

        this.colors = new Colors(scene);
        this.stem = new MyStem(scene, this.stem_height, this.stem_radius, this.stem_inclination);
        this.receptacle = new MyReceptacle(scene, this.receptacle_radius);
        this.pollen = new MyPolen(scene);

        this.height = this.stem_height + this.radius;

        this.petals = [];
        this.petal_color = this.colors.random_color();
        for (var i = 0; i < this.petals_number; i++) {
            this.petals.push(new MyPetal(scene, this.petal_angle));
        }

        this.load_textures();
    }

    load_textures () {
        const textures = new Textures(this.scene);
        this.petal_texture = textures.getTexture("petal");
        this.petal_appearance = new CGFappearance(this.scene);
        this.petal_appearance.setTexture(this.petal_texture);
        this.petal_appearance.setTextureWrap('REPEAT', 'REPEAT');
        let rx = Math.random(), ry = Math.random(), rz = Math.random();
        this.petal_appearance.setAmbient(rx, ry, rz, 1);
        this.petal_appearance.setDiffuse(rx, ry, rz, 1);
        this.petal_appearance.setSpecular(rx, ry, rz, 1);
        this.petal_appearance.setShininess(10.0);

        this.receptacle_texture = textures.getTexture("receptacle");
        this.receptacle_appearance = new CGFappearance(this.scene);
        this.receptacle_appearance.setTexture(this.receptacle_texture);
        this.receptacle_appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.receptacle_appearance.setAmbient(1, 1, 1, 1);
        this.receptacle_appearance.setDiffuse(1, 1, 1, 1);
        this.receptacle_appearance.setSpecular(1, 1, 1, 1);
        this.receptacle_appearance.setShininess(10.0);

        this.stem_texture = textures.getTexture("stem");
        this.stem_appearance = new CGFappearance(this.scene);
        this.stem_appearance.setTexture(this.stem_texture);
        this.stem_appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.stem_appearance.setAmbient(1, 1, 1, 1);
        this.stem_appearance.setDiffuse(1, 1, 1, 1);
        this.stem_appearance.setSpecular(1, 1, 1, 1);
        this.stem_appearance.setShininess(10.0);
    }

    display () {
        let tx = -Math.sin(this.stem_inclination) / 2;
        if (this.stem_height % 2 == 0) tx = -tx;

        this.scene.pushMatrix();
        {
            this.scene.translate(tx, this.stem_height, 0);
            // this.colors.apply(this.receptacle_color);
            this.receptacle_appearance.apply();
            this.receptacle.display();

            if (this.pollen) {
                this.scene.pushMatrix();
                {
                    this.scene.rotate(this.polen_rotation * 10, 0, 1, 0);
                    this.scene.rotate(this.polen_rotation, 1, 0, 1);
                    this.scene.translate(0, this.receptacle_radius * 1.05, 0);
                    this.scene.scale(0.1, 0.1, 0.1);
                    this.pollen.display();
                }
                this.scene.popMatrix();
            }
        }
        this.scene.popMatrix();

        // this.colors.apply(this.stem_color);
        this.stem_appearance.apply();
        this.stem.display();

        this.scene.pushMatrix();
        {
            this.scene.translate(tx, this.stem_height + this.radius / 6, 0);
            this.petal_appearance.apply();
            for (var i = 0; i < this.petals_number; i++) {
                this.scene.pushMatrix();
                {
                    this.scene.rotate(2 * i * Math.PI / this.petals_number, 0, 1, 0);
                    this.scene.scale(this.radius, this.radius, this.radius);
                    this.scene.translate(0, 0, -0.5);
                    this.petals[ i ].display();
                }
                this.scene.popMatrix();
            }
        }
        this.scene.popMatrix();
    }
}
