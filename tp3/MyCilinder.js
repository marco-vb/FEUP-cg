import { CGFobject } from '../lib/CGF.js';

/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of sides
 * @param stacks - Number of stacks
 */
export class MyCilinder extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
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
                this.normals.push(x, y, 0);

                cur_angle += ang;
            }

            if (st == 0 || st == this.stacks - 1) {
                for (var i = 0; i < this.slices; i += 2) {
                    for (var j = i + 1; j < this.slices; j++) {
                        this.indices.push(
                            i + st * this.slices,
                            j % this.slices + st * this.slices,
                            (j + 1) % this.slices + st * this.slices
                        );
                        this.indices.push(
                            i + 1 + st * this.slices,
                            (j + 1) % this.slices + 1 + st * this.slices,
                            j % this.slices + 1 + st * this.slices
                        );
                    }
                }
            }

            // sides
            if (st > 0) {
                for (var i = 0; i < this.slices; i++) {
                    this.indices.push(
                        i + st * this.slices,
                        i + (st - 1) * this.slices,
                        (i + 1) % this.slices + (st - 1) * this.slices
                    );
                    this.indices.push(
                        (i + 1) % this.slices + st * this.slices,
                        i + st * this.slices,
                        (i + 1) % this.slices + (st - 1) * this.slices
                    );
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
