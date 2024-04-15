import { CGFobject } from '../lib/CGF.js';

/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MySphere extends CGFobject {
    constructor(scene, inverted = false, slices = 20, stacks = 20) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.inverted = inverted;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        // Sphere using spherical coordinates
        // Implementation based on OpenGL Sphere example
        var phi = 0, theta = 0;
        var phiInc = Math.PI / this.stacks, thetaInc = (2 * Math.PI) / this.slices;

        var s = 0, t = 0;
        var sInc = 1 / this.slices, tInc = 1 / this.stacks;

        for (var i = 0; i <= this.stacks; i++, phi += phiInc, t += tInc, s = 0, theta = 0) {
            for (var j = 0; j <= this.slices; j++, theta += thetaInc, s += sInc) {
                var x = Math.cos(theta) * Math.sin(phi);
                var y = Math.cos(phi);
                var z = Math.sin(theta) * Math.sin(phi);
                this.vertices.push(x, y, z);

                if (this.inverted) x = -x, y = -y, z = -z;

                this.normals.push(x, y, z);
                this.texCoords.push(1 - s, t);
            }
        }

        for (var i = 0; i < this.stacks; i++) {
            for (var j = 0; j < this.slices; j++) {
                if (this.inverted) {
                    this.indices.push(i * (this.slices + 1) + j, (i + 1) * (this.slices + 1) + j, i * (this.slices + 1) + j + 1);
                    this.indices.push(i * (this.slices + 1) + j + 1, (i + 1) * (this.slices + 1) + j, (i + 1) * (this.slices + 1) + j + 1);
                } else {
                    this.indices.push(i * (this.slices + 1) + j, i * (this.slices + 1) + j + 1, (i + 1) * (this.slices + 1) + j);
                    this.indices.push(i * (this.slices + 1) + j + 1, (i + 1) * (this.slices + 1) + j + 1, (i + 1) * (this.slices + 1) + j);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        super.display();
    }
}


