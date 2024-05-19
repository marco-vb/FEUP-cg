import {
    CGFscene,
    CGFcamera,
    CGFaxis,
    CGFappearance,
    CGFshader,
    CGFtexture,
} from "../lib/CGF.js";
import { MyPlane } from "./shapes/MyPlane.js";
import { MySphere } from "./shapes/MySphere.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyStem } from "./flower/MyStem.js";
import { MyCilinder } from "./shapes/MyCilinder.js";
import { MyReceptacle } from "./flower/MyReceptacle.js";
import { MyPetal } from "./flower/MyPetal.js";
import { MyFlower } from "./flower/MyFlower.js";
import { MyGarden } from "./flower/MyGarden.js";
import { MyRock } from "./rocks/MyRock.js";
import { MyRockSet } from "./rocks/MyRockSet.js";
import { MyBee } from "./MyBee.js";
import { MyGrass } from "./grass/MyGrass.js";

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
        this.panorama = new MyPanorama(
            this,
            new CGFtexture(this, "images/panorama4.jpg"),
            position
        );
        this.flower = new MyFlower(this);
        this.garden = new MyGarden(this, 5, 5);
        this.rock = new MyRock(this);
        this.rock_set = new MyRockSet(this);
        this.garden = new MyGarden(this, 5, 5);

        this.bee = new MyBee(this, 0, 0, 0);

        // Objects connected to MyInterface
        this.displayAxis = true;
        this.displayGarden = false;
        this.displayRockSet = false;
        this.displayBee = true;
        this.displayGrass = false;
        this.scaleFactor = 1;
        this.speedFactor = 1;

        this.grass = new MyGrass(this);

        // Objects connected to MyInterface
        this.displayAxis = true;
        this.scaleFactor = 1;

        // this.texture = new CGFtexture(this, "images/earth.jpg");
        this.appearance = new CGFappearance(this);
        // this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap("REPEAT", "REPEAT");
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
        this.appearance.apply();
        this.translate(0, -100, 0);
        this.scale(400, 400, 400);
        this.rotate(-Math.PI / 2.0, 1, 0, 0);
        // this.plane.display();
        this.popMatrix();

        if (this.displayGarden) this.garden.display();
        if (this.displayRockSet) this.rock_set.display();
        if (this.displayBee) this.bee.display();
        if (this.displayGrass) this.grass.display();

        var position = this.camera.position.slice(0, 3);
        this.panorama.update_position(position);
        this.panorama.display();
    }

    update (t) {
        this.bee.update(t, this.scaleFactor, this.speedFactor);
        this.grass.update(t);
    }
}
