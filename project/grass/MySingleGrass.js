import { CGFobject, CGFshader, CGFappearance } from "../../lib/CGF.js";
import { Colors } from "../utils/Colors.js";
import { Textures } from "../utils/Textures.js";

/**
 * MySingleGrass
 */
export class MySingleGrass extends CGFobject {
    constructor (scene) {
        super(scene);
        this.shader = new CGFshader(this.scene.gl, "shaders/grass.vert", "shaders/grass.frag");
        this.textures = new Textures(this.scene);
        this.texture = this.textures.getTexture("grass");
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.texture);
        this.appearance.setAmbient(0.0, 0.0, 0.0, 1);
        this.appearance.setDiffuse(0.0, 0.0, 0.0, 1);
        this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.appearance.setShininess(10.0);
        this.appearance.setTextureWrap("REPEAT", "REPEAT");
        this.initBuffers();
    }

    initBuffers () {
        const layers = 30;
        let step = 1 / layers,
            xl = -1,
            xr = 1,
            y = 0;

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (let i = 0; i < layers; i++) {
            this.vertices.push(xr, y, 0);
            this.vertices.push(xl, y, 0);
            this.vertices.push(xr - step, y + 3 * step, 0);
            this.vertices.push(xl + step, y + 3 * step, 0);

            this.indices.push(4 * i, 4 * i + 1, 4 * i + 2);
            this.indices.push(4 * i + 1, 4 * i + 2, 4 * i + 3);
            this.indices.push(4 * i + 1, 4 * i, 4 * i + 2);
            this.indices.push(4 * i + 2, 4 * i + 1, 4 * i + 3);

            this.normals.push(0, 0, 1);
            this.normals.push(0, 0, 1);
            this.normals.push(0, 0, 1);
            this.normals.push(0, 0, 1);

            this.texCoords.push(0, 0);
            this.texCoords.push(0, 1);
            this.texCoords.push(1, 0);
            this.texCoords.push(1, 1);

            y += 3 * step;
            xl += step;
            xr -= step;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    update (t) {
        this.time = (t % 1001) / 1000;
        this.time *= Math.PI * 2;
    }

    display () {
        this.appearance.apply();
        this.scene.setActiveShader(this.shader);
        this.shader.setUniformsValues({ uSampler2: 1, time: this.time });
        super.display();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
