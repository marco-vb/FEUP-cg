import { CGFobject, CGFshader, CGFappearance } from "../../lib/CGF.js";
import { MySingleGrass } from "./MySingleGrass.js";
import { Textures } from "../utils/Textures.js";
import { Shaders } from "../utils/Shaders.js";

/**
 * MyGrass
 */
export class MyGrass extends CGFobject {
    constructor (scene) {
        super(scene);
        const shaders = new Shaders(this.scene);
        this.shader = shaders.getTexture("grass");
        this.grass = [];
        this.n = 50;
        this.init();
    }

    init () {
        const n = this.n * this.n;
        for (let i = 0; i < n; i++) {
            this.grass.push(new MySingleGrass(this.scene));
        }

        this.randoms = [];
        for (let i = 0; i < n; i++) {
            this.randoms.push([ (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.1 ]);
        }
    }

    update (t) {
        for (let i = 0; i < this.grass.length; i++) {
            this.grass[ i ].update(t);
        }
    }

    display () {
        this.scene.setActiveShader(this.shader);
        this.scene.pushMatrix();
        {
            this.scene.translate(-25, 0, -25);
            const n = this.n;
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    const randi = this.randoms[ i * n + j ][ 0 ];
                    const randj = this.randoms[ i * n + j ][ 1 ];
                    this.scene.pushMatrix();
                    {
                        this.scene.translate(randi + 2 * i, 0, randj + j);
                        this.grass[ i * n + j ].display();
                    }
                    this.scene.popMatrix();
                }
            }
        }
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
