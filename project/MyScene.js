import {
    CGFscene,
    CGFcamera,
    CGFaxis,
    CGFappearance,
    CGFshader,
    CGFtexture,
} from "../lib/CGF.js";
import { MyPlane } from "./shapes/MyPlane.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyGarden } from "./flower/MyGarden.js";
import { MyRockSet } from "./rocks/MyRockSet.js";
import { MyBee } from "./bee/MyBee.js";
import { MyGrass } from "./grass/MyGrass.js";
import { MyHive } from "./bee/MyHive.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
    constructor () {
        super();
    }

    init (application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        // Background
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.enableTextures(true);

        // Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new MyPlane(this, 30);
        // this.sphere = new MySphere(this);
        var position = this.camera.position.slice(0, 3);
        this.panorama = new MyPanorama(this, new CGFtexture(this, "images/panorama4.jpg"), position);

        const garden_position = { x: 5, y: -20, z: 20 };
        this.garden = new MyGarden(this, 5, 5, garden_position);

        const rocks_position = { x: -10, y: -20, z: -10 };
        this.rock_set = new MyRockSet(this, rocks_position);

        const hive_position = { x: -10, y: -14, z: -10 };
        this.hive = new MyHive(this, hive_position);

        const grass_position = { x: 0, y: -20, z: 0 };
        this.grass = new MyGrass(this, grass_position);
        this.bee = new MyBee(this, 0, 0, 0);

        this.bee.hive_position = hive_position;
        this.bee.hive_position.y += 5;

        // Objects connected to MyInterface
        this.displayAxis = false;
        this.displayGarden = true;
        this.displayRockSet = true;
        this.displayBee = true;
        this.displayGrass = true;
        this.scaleFactor = 1;
        this.speedFactor = 1;
        this.beeView = false;

        // Objects connected to MyInterface
        this.displayAxis = true;
        this.scaleFactor = 1;

        this.texture = new CGFtexture(this, "images/earth.jpg");
        this.appearance = new CGFappearance(this);
        this.appearance.setTextureWrap("REPEAT", "REPEAT");
        this.appearance.setTexture(this.texture);
        this.appearance.setAmbient(1, 1, 1, 1);
        this.appearance.setDiffuse(1, 1, 1, 1);
        this.appearance.setSpecular(1, 1, 1, 1);

        this.setUpdatePeriod(100);
    }

    initLights () {
        this.lights[ 0 ].setPosition(15, 0, 5, 1);
        this.lights[ 0 ].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[ 0 ].enable();
        this.lights[ 0 ].update();
    }

    initCameras () {
        this.camera = new CGFcamera(
            1.0,
            0.1,
            1000,
            vec3.fromValues(50, 10, 15),
            vec3.fromValues(0, 0, 0)
        );
    }

    setDefaultAppearance () {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    display () {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        if (this.displayAxis) this.axis.display();

        this.pushMatrix();
        {
            this.appearance.apply();
            this.translate(0, -20, 0);
            this.scale(200, 200, 200);
            this.rotate(-Math.PI / 2.0, 1, 0, 0);
            this.plane.display();
        }
        this.popMatrix();

        if (this.displayGarden) this.garden.display();
        if (this.displayRockSet) this.rock_set.display();
        if (this.displayBee) this.bee.display();
        if (this.displayGrass) this.grass.display();
        this.hive.display();

        var position = this.camera.position.slice(0, 3);
        this.panorama.update_position(position);
        this.panorama.display();
    }

    update (t) {
        let next_flower = this.bee.flower;
        if (!this.bee.hasPollen) {
            for (const flower of this.garden.garden.flat()) {
                if (flower.pollen) {
                    next_flower = flower;
                    break;
                }
            }
        }
        if (this.beeView) {
            this.camera.setPosition(vec3.fromValues(this.bee.x, this.bee.y + 10, this.bee.z - 10));
            this.camera.setTarget(vec3.fromValues(this.bee.x, this.bee.y, this.bee.z));
        }
        else {
            this.camera.setPosition(vec3.fromValues(50, 10, 15));
            this.camera.setTarget(vec3.fromValues(0, 0, 0));
        }
        this.bee.update(t, this.scaleFactor, this.speedFactor, next_flower);
        this.grass.update(t);
    }
}
