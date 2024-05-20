import { CGFobject, CGFshader, CGFappearance } from "../../lib/CGF.js";
import { MySingleGrass } from "./MySingleGrass.js";
import { Textures } from "../utils/Textures.js";
import { Shaders } from "../utils/Shaders.js";

/**
 * MyGrass
 */
export class MyGrass extends CGFobject {
    constructor (scene, position) {
        super(scene);
        this.position = position;
        const shaders = new Shaders(this.scene);
        this.shader = shaders.getTexture("grass");
        this.grass = [];
        this.n = 100;
        this.init();
    }

    init () {
        const n = this.n * this.n;
        for (let i = 0; i < n; i++) {
            this.grass.push(new MySingleGrass(this.scene));
        }

        this.randoms = [];
        for (let i = 0; i < n; i++) {
            const x = Math.random() * 200 - 100;
            const z = Math.random() * 200 - 100;
            this.randoms.push([ x, z ]);
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
            this.scene.translate(this.position.x, this.position.y, this.position.z);
            const n = this.n;
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    const x = this.randoms[ i * n + j ][ 0 ];
                    const z = this.randoms[ i * n + j ][ 1 ];
                    this.scene.pushMatrix();
                    {
                        this.scene.translate(x, 0, z);
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
