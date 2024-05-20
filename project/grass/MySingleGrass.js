import { CGFobject, CGFshader, CGFappearance } from "../../lib/CGF.js";
import { Shaders } from "../utils/Shaders.js";
import { Textures } from "../utils/Textures.js";

/**
 * MySingleGrass
 */
export class MySingleGrass extends CGFobject {
    constructor (scene) {
        super(scene);
        this.shaders = new Shaders(this.scene);
        this.shader = this.shaders.getTexture("grass");

        this.textures = new Textures(this.scene);
        this.texture = this.textures.getTexture("grass");

        this.random = Math.random() * 1000;

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
        const layers = 30 + Math.floor(Math.random() * 10);
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
            this.vertices.push(xr - step, y + layers / 10 * step, 0);
            this.vertices.push(xl + step, y + layers / 10 * step, 0);

            this.indices.push(4 * i, 4 * i + 1, 4 * i + 2);
            this.indices.push(4 * i + 1, 4 * i + 2, 4 * i + 3);
            this.indices.push(4 * i + 1, 4 * i, 4 * i + 2);
            this.indices.push(4 * i + 2, 4 * i + 1, 4 * i + 3);

            this.normals.push(0, 0, 1);
            this.normals.push(0, 0, 1);
            this.normals.push(0, 0, 1);
            this.normals.push(0, 0, 1);

            this.texCoords.push(1, y / layers);
            this.texCoords.push(0, y / layers);
            this.texCoords.push(1, (y + layers / 10 * step) / layers);
            this.texCoords.push(0, (y + layers / 10 * step) / layers);

            y += layers / 10 * step;
            xl += step;
            xr -= step;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    update (t) {
        t += this.random;
        this.time = (t % 10001) / 10000;
        this.time *= Math.PI * 4;
        this.time -= Math.PI * 2;
    }

    display () {
        this.appearance.apply();
        this.shader.setUniformsValues({ uSampler2: 1, time: this.time });
        this.scene.pushMatrix();
        {
            this.scene.scale(0.25, 1, 0.25);
            this.scene.rotate(Math.PI / 2, 0, 1, 0);
            super.display();
        }
        this.scene.popMatrix();
    }
}
