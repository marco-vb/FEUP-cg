import { CGFobject } from '../lib/CGF.js';

/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of sides
 * @param stacks - Number of stacks
 */
export class MyPrism extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    mult_matrix_vector(m, v) {
        var result = [];
        for (var i = 0; i < m.length; i++) {
            var sum = 0.0;
            for (var j = 0; j < m[i].length; j++) {
                sum += m[i][j] * v[j];
            }
            result.push(sum);
        }
        return result;
    }

    mult_matrix(a, b) {
        var result = [];
        for (var i = 0; i < a.length; i++) {
            result.push(this.mult_matrix_vector(b, a[i]));
        }
        return result;
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        for (let st = 0; st < this.stacks; st++) {
            let ang = 2 * Math.PI / this.slices;
            let cur_angle = 0;
            let z = st / this.stacks;

            for (var i = 0; i < this.slices; i++) {
                let x = Math.cos(cur_angle);
                let y = Math.sin(cur_angle);
                this.vertices.push(x, y, z);
                this.vertices.push(x, y, z);

                let nx = Math.cos(cur_angle + ang / 2);
                let ny = Math.sin(cur_angle + ang / 2);
                this.normals.push(nx, ny, 0);

                nx = Math.cos(cur_angle - ang / 2);
                ny = Math.sin(cur_angle - ang / 2);
                this.normals.push(nx, ny, 0);

                cur_angle += ang;
            }

            if (st == 0 || st == this.stacks - 1) {
                for (var i = 0; i < this.slices; i += 2) {
                    for (var j = i + 1; j < this.slices; j++) {
                        this.indices.push(
                            2 * i + st * this.slices * 2,
                            2 * j % (2 * this.slices) + st * this.slices * 2,
                            2 * (j + 1) % (2 * this.slices) + st * this.slices * 2
                        );
                        this.indices.push(
                            2 * i + 1 + st * this.slices * 2,
                            2 * (j + 1) % (2 * this.slices) + 1 + st * this.slices * 2,
                            2 * j % (2 * this.slices) + 1 + st * this.slices * 2
                        );
                    }
                }
            }

            // sides
            if (st > 0) {
                for (var i = 0; i < this.slices; i++) {
                    this.indices.push(
                        2 * i + st * this.slices * 2,
                        2 * i + (st - 1) * this.slices * 2,
                        2 * (i + 1) % (2 * this.slices) + (st - 1) * this.slices * 2
                    );
                    this.indices.push(
                        2 * (i + 1) % (2 * this.slices) + st * this.slices * 2,
                        2 * i + st * this.slices * 2,
                        2 * (i + 1) % (2 * this.slices) + (st - 1) * this.slices * 2
                    );
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
