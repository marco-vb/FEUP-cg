import { CGFobject } from '../lib/CGF.js';

/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of sides
 * @param stacks - Number of stacks
 */
export class MyCilinder extends CGFobject {
    constructor(scene, radius = 0.25, slices = 20, stacks = 20) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var theta = 0;
        var thetaInc = (2 * Math.PI) / this.slices;

        var s = 0;

        for (var i = 0; i <= this.slices; i++, theta += thetaInc, s += 1 / this.slices) {
            var x = this.radius * Math.cos(theta);
            var z = this.radius * Math.sin(theta);

            this.vertices.push(x, 0, z);
            this.vertices.push(x, 1, z);

            this.normals.push(x, 0, z);
            this.normals.push(x, 0, z);

            this.texCoords.push(s, 1);
            this.texCoords.push(s, 0);
        }

        for (var i = 0; i < this.slices; i++) {
            this.indices.push(2 * i, 2 * i + 1, 2 * i + 2);
            this.indices.push(2 * i + 2, 2 * i + 1, 2 * i + 3);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
