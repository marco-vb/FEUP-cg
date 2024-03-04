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
            0.5, 0.5, 0.5	    // 7
        ];

        // Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2,  // bottom
            1, 3, 2,
            4, 6, 5,  // top
            5, 6, 7,
            0, 2, 4,  // left
            4, 2, 6,
            1, 5, 3,  // right
            5, 7, 3,
            0, 4, 1,  // back
            4, 5, 1,
            2, 3, 6,  // front
            6, 3, 7
        ]; 

        // The defined indices (and corresponding vertices)
        // will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}
