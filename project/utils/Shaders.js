import { CGFshader } from '../../lib/CGF.js';

// Singleton class to manage shaders in order to not load the same shader more than once
export class Shaders {
    constructor (scene) {
        if (Shaders.instance) {
            return Shaders.instance;
        }
        this.scene = scene;
        this.shaders = {};
        Shaders.instance = this;
    }

    getTexture (name) {
        if (!this.shaders[ name ]) {
            const path_vert = 'shaders/' + name + '.vert';
            const path_frag = 'shaders/' + name + '.frag';
            this.shaders[ name ] = new CGFshader(this.scene.gl, path_vert, path_frag);
        }
        return this.shaders[ name ];
    }
}

Shaders.instance = null;