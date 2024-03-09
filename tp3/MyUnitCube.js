import { CGFobject } from '../lib/CGF.js';

/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            -0.5, -0.5, -0.5,	// 0
            0.5, -0.5, -0.5,	// 1
            -0.5, 0.5, -0.5,	// 2
            0.5, 0.5, -0.5,	    // 3
            -0.5, -0.5, 0.5,	// 4
            0.5, -0.5, 0.5,	    // 5
            -0.5, 0.5, 0.5,	    // 6
            0.5, 0.5, 0.5,	    // 7
            -0.5, -0.5, -0.5,	// 0
            0.5, -0.5, -0.5,	// 1
            -0.5, 0.5, -0.5,	// 2
            0.5, 0.5, -0.5,	    // 3
            -0.5, -0.5, 0.5,	// 4
            0.5, -0.5, 0.5,	    // 5
            -0.5, 0.5, 0.5,	    // 6
            0.5, 0.5, 0.5,	    // 7
            -0.5, -0.5, -0.5,	// 0
            0.5, -0.5, -0.5,	// 1
            -0.5, 0.5, -0.5,	// 2
            0.5, 0.5, -0.5,	    // 3
            -0.5, -0.5, 0.5,	// 4
            0.5, -0.5, 0.5,	    // 5
            -0.5, 0.5, 0.5,	    // 6
            0.5, 0.5, 0.5	    // 7
        ];

        // Counter-clockwise reference of vertices
        this.indices = [
            0, 2, 1,
            1, 2, 3,
            2, 6, 3,
            3, 6, 7,
            1, 3, 5,
            3, 7, 5,
            4, 5, 6,
            5, 7, 6,
            0, 4, 2,
            2, 4, 6,
            0, 1, 4,
            1, 5, 4
        ];

        // The defined indices (and corresponding vertices)
        // will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.normals = [
            0, 0, -1,	// 0
            0, 0, -1,	// 1
            0, 0, -1,	// 2
            0, 0, -1,	// 3
            0, 0, 1,	// 4
            0, 0, 1,	// 5
            0, 0, 1,	// 6
            0, 0, 1,	// 7
            -1, 0, 0,	// 8
            1, 0, 0,	// 9
            -1, 0, 0,	// 10
            1, 0, 0,	// 11
            -1, 0, 0,	// 12
            1, 0, 0,	// 13
            -1, 0, 0,	// 14
            1, 0, 0,	// 15
            0, -1, 0,	// 16
            0, -1, 0,	// 17
            0, 1, 0,	// 18
            0, 1, 0,	// 19
            0, -1, 0,	// 20
            0, -1, 0,	// 21
            0, 1, 0,	// 22
            0, 1, 0	    // 23
        ];

        this.initGLBuffers();
    }
}
