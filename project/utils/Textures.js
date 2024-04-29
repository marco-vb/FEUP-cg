import { CGFtexture } from '../../lib/CGF.js';

// Singleton class to manage textures in order to not load the same texture more than once
export class Textures {
    constructor(scene) {
        if (Textures.instance) {
            return Textures.instance;
        }
        this.scene = scene;
        this.textures = {};
        Textures.instance = this;
    }

    getTexture(name) {
        if (!this.textures[name]) {
            const path = 'images/' + name + '.jpg';
            this.textures[name] = new CGFtexture(this.scene, path);
        }
        return this.textures[name];
    }
}

Textures.instance = null;