import { CGFobject, CGFappearance } from "../../lib/CGF.js";
import { MySphere } from "../shapes/MySphere.js";
import { Textures } from "../utils/Textures.js";
import { Colors } from "../utils/Colors.js";
import { MyPolen } from "./MyPolen.js";

/**
 * MyBee
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBee extends CGFobject {
    constructor (scene, x, y, z) {
        super(scene);

        // Scale
        this.scale = 0.5;

        // Position
        this.position = { x: x, y: y, z: z };
        this.x = x;
        this.y = y;
        this.z = z;

        // Movement
        this.speed = 0;
        this.orientation = 0; // y-axis rotation

        // Bee components
        this.head = new MySphere(scene);
        this.eye = new MySphere(scene);
        this.antenna = new MySphere(scene);
        this.torax = new MySphere(scene);
        this.wing = new MySphere(scene);
        this.abdomen = new MySphere(scene);
        this.stinger = new MySphere(scene);
        this.leg = new MySphere(scene);

        // Materials
        this.initMaterials();

        // Animation
        this.lastUpdate = 0;

        // Wing animation
        this.wingAngle = 0;

        // Pollen
        this.hasPollen = false;
        this.pickingUpPollen = false;
        this.resumingAfterPollen = false;
    }

    // Initialize materials
    initMaterials () {
        this.textures = new Textures(this.scene);
        this.colors = new Colors(this.scene);

        this.body_texture = this.textures.getTexture("bee_body");
        this.body_appearance = new CGFappearance(this.scene);
        this.body_appearance.setTexture(this.body_texture);
        this.body_appearance.setAmbient(0.2, 0.2, 0.2, 1);
        this.body_appearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.body_appearance.setSpecular(0.2, 0.2, 0.2, 1);
        this.body_appearance.setShininess(10.0);
        this.body_appearance.setTextureWrap("REPEAT", "REPEAT");

        this.torax_texture = this.textures.getTexture("bee_torax");
        this.torax_appearance = new CGFappearance(this.scene);
        this.torax_appearance.setTexture(this.torax_texture);
        this.torax_appearance.setAmbient(0.2, 0.2, 0.2, 1);
        this.torax_appearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.torax_appearance.setSpecular(0.2, 0.2, 0.2, 1);
        this.torax_appearance.setShininess(10.0);
        this.torax_appearance.setTextureWrap("REPEAT", "REPEAT");

        this.wing_texture = this.textures.getTexture("bee_wings");
        this.wing_appearance = new CGFappearance(this.scene);
        this.wing_appearance.setTexture(this.wing_texture);
        this.wing_appearance.setAmbient(0.2, 0.2, 0.2, 0.2);
        this.wing_appearance.setDiffuse(0.9, 0.9, 0.9, 0.2);
        this.wing_appearance.setSpecular(0.2, 0.2, 0.2, 0.2);
        this.wing_appearance.setEmission(0.2, 0.2, 0.2, 0.05);
        this.wing_appearance.setShininess(10.0);
        this.wing_appearance.setTextureWrap("REPEAT", "REPEAT");

        this.eye_texture = this.textures.getTexture("bee_eye");
        this.eye_appearance = new CGFappearance(this.scene);
        this.eye_appearance.setTexture(this.eye_texture);
        this.eye_appearance.setAmbient(0.2, 0.2, 0.2, 1);
        this.eye_appearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.eye_appearance.setSpecular(0.2, 0.2, 0.2, 1);
        this.eye_appearance.setShininess(10.0);
        this.eye_appearance.setTextureWrap("REPEAT", "REPEAT");
    }

    // Display bee, applying the required transformations to position, scale and orientation
    display () {
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.scale(this.scale * 0.5, this.scale * 0.5, this.scale * 0.5);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.displayBee();
        this.scene.popMatrix();
    }

    // Arrange and display bee components
    displayBee () {
        this.scene.pushMatrix();

        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);

        this.scene.translate(0, -2.5, 0);

        // Head
        this.colors.apply("dark_brown");
        this.scene.pushMatrix();
        {
            this.scene.translate(0, 4.25, 0);
            this.scene.scale(1, 0.85, 1);
            this.head.display();
        }
        this.scene.popMatrix();

        // Antennas
        this.scene.pushMatrix();
        {
            this.scene.translate(1, 4.75, 0.5);
            this.scene.rotate(-Math.PI / 2, 0, 0, 1);
            this.scene.rotate(Math.PI / 4, 1, 0, 0);
            this.scene.scale(0.05, 1.25, 0.05);
            this.antenna.display();
        }
        this.scene.popMatrix();

        this.scene.pushMatrix();
        {
            this.scene.translate(1, 4.75, -0.5);
            this.scene.rotate(-Math.PI / 2, 0, 0, 1);
            this.scene.rotate(-Math.PI / 4, 1, 0, 0);
            this.scene.scale(0.05, 1.25, 0.05);
            this.antenna.display();
        }
        this.scene.popMatrix();

        // Eyes
        this.eye_appearance.apply();
        this.scene.pushMatrix();
        {
            this.scene.translate(0, 5, 0.5);
            this.scene.rotate(Math.PI / 6, 1, 0, 0);
            this.scene.scale(0.65, 0.25, 0.5);
            this.eye.display();
        }
        this.scene.popMatrix();

        this.scene.pushMatrix();
        {
            this.scene.translate(0, 5, -0.5);
            this.scene.rotate(-Math.PI / 6, 1, 0, 0);
            this.scene.scale(0.65, 0.25, 0.5);
            this.eye.display();
        }
        this.scene.popMatrix();

        // Torax
        this.torax_appearance.apply();
        this.scene.pushMatrix();
        {
            this.scene.translate(0, 2.5, 0);
            this.scene.scale(1, 1, 1);
            this.torax.display();
        }
        this.scene.popMatrix();

        // Abdomen
        this.body_appearance.apply();
        this.scene.pushMatrix();
        {
            this.scene.translate(0, 0, 0);
            this.scene.scale(1.25, 2, 1.25);
            this.abdomen.display();
        }
        this.scene.popMatrix();

        // Stinger
        this.colors.apply("dark_brown");
        this.scene.pushMatrix();
        {
            this.scene.translate(0, -2, 0);
            this.scene.scale(0.15, 0.75, 0.15);
            this.stinger.display();
        }
        this.scene.popMatrix();

        // Legs
        this.scene.pushMatrix();
        {
            this.scene.translate(-1, 3, 0.8);
            this.scene.rotate(-Math.PI / 12, 0, 0, 1);
            this.scene.rotate(Math.PI / 8, 0, 1, 0);
            this.scene.scale(0.5, 0.1, 0.1);
            this.leg.display();
        }
        this.scene.popMatrix();

        this.scene.pushMatrix();
        {
            this.scene.translate(-1, 3, -0.8);
            this.scene.rotate(-Math.PI / 12, 0, 0, 1);
            this.scene.rotate(-Math.PI / 8, 0, 1, 0);
            this.scene.scale(0.5, 0.1, 0.1);
            this.leg.display();
        }
        this.scene.popMatrix();

        this.scene.pushMatrix();
        {
            this.scene.translate(-1, 2.5, 0.8);
            this.scene.rotate(Math.PI / 6, 0, 1, 0);
            this.scene.scale(0.75, 0.1, 0.1);
            this.leg.display();
        }
        this.scene.popMatrix();

        this.scene.pushMatrix();
        {
            this.scene.translate(-1, 2.5, -0.8);
            this.scene.rotate(-Math.PI / 6, 0, 1, 0);
            this.scene.scale(0.75, 0.1, 0.1);
            this.leg.display();
        }
        this.scene.popMatrix();

        this.scene.pushMatrix();
        {
            this.scene.translate(-1, 2, 0.8);
            this.scene.rotate(Math.PI / 12, 0, 0, 1);
            this.scene.rotate(Math.PI / 4, 0, 1, 0);
            this.scene.scale(0.9, 0.1, 0.1);
            this.leg.display();
        }
        this.scene.popMatrix();

        this.scene.pushMatrix();
        {
            this.scene.translate(-1, 2, -0.8);
            this.scene.rotate(Math.PI / 12, 0, 0, 1);
            this.scene.rotate(-Math.PI / 4, 0, 1, 0);
            this.scene.scale(0.9, 0.1, 0.1);
            this.leg.display();
        }
        this.scene.popMatrix();

        if (this.carry_pollen) {
            this.scene.pushMatrix();
            {
                this.scene.translate(-1.5, 3, 1);
                this.carry_pollen.display();
            }
            this.scene.popMatrix();
        }

        this.scene.gl.blendFunc(
            this.scene.gl.SRC_ALPHA,
            this.scene.gl.ONE_MINUS_SRC_ALPHA
        );
        this.scene.gl.enable(this.scene.gl.BLEND);

        // Top left wing
        this.wing_appearance.apply();
        this.scene.pushMatrix();
        {
            this.scene.rotate(this.wingAngle / 6, 0, 1, 0);
            this.scene.rotate(Math.PI / 16, 1, 0, 0);
            this.scene.translate(0.5, 2.5, 2);
            this.scene.scale(0.1, 1, 2.5);

            this.wing.display();
        }
        this.scene.popMatrix();

        // Top right wing
        this.scene.pushMatrix();
        {
            this.scene.rotate(-this.wingAngle / 6, 0, 1, 0);
            this.scene.rotate(-Math.PI / 16, 1, 0, 0);
            this.scene.translate(0.5, 2.5, -2);
            this.scene.scale(0.1, 1, 2.5);

            this.wing.display();
        }
        this.scene.popMatrix();

        // Bottom left wing
        this.scene.pushMatrix();
        {
            this.scene.rotate(this.wingAngle / 6, 0, 1, 0);
            this.scene.rotate(Math.PI / 6, 1, 0, 0);
            this.scene.translate(0.25, 2, 1);
            this.scene.scale(0.05, 0.5, 1.5);

            this.wing.display();
        }
        this.scene.popMatrix();

        // Bottom right wing
        this.scene.pushMatrix();
        {
            this.scene.rotate(-this.wingAngle / 6, 0, 1, 0);
            this.scene.rotate(-Math.PI / 6, 1, 0, 0);
            this.scene.translate(0.25, 2, -1);
            this.scene.scale(0.05, 0.5, 1.5);

            this.wing.display();
        }
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    // Update bee
    // Need to animate wings as well
    update (t, scaleFactor, speedFactor, flower = null) {
        this.flower = flower;

        // Animate wings
        this.wingAngle = (Math.sin((t / 1000) * 10) * Math.PI) / 2;

        if (this.lastUpdate == 0) {
            this.lastUpdate = t;
            return;
        }

        this.scale = scaleFactor;

        this.handleKeyDown(speedFactor);

        let delta = (t - this.lastUpdate) / 1000;
        this.lastUpdate = t;

        let dx = this.speed * Math.sin(this.orientation) * delta;
        let dz = this.speed * Math.cos(this.orientation) * delta;

        if (this.droppingPollen || this.inHive) {
            this.returnToHive(t);
            return;
        }

        if (this.resumingAfterPollen) {
            this.continueMovement();
            return;
        }

        if (this.pickingUpPollen) {
            this.pickUpPollen(t);
            return;
        } else {
            this.x += dx;
            this.z += dz;
        }

        // Animate bee up and down
        this.y = Math.sin((t / 1000) * 2);
    }

    // Adjust orientation
    turn (val) {
        this.orientation += val * 0.25;
    }

    // Accelerate movement
    accelerate (val) {
        this.speed += val;
    }

    // Reset bee position and movement
    reset () {
        this.speed = 0;
        this.orientation = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }

    // Handle key presses to control bee movement
    handleKeyDown (speedFactor) {
        if (this.scene.gui.isKeyPressed("KeyW")) {
            this.accelerate(speedFactor);
            this.resumingAfterPollen = false;
        }
        if (this.scene.gui.isKeyPressed("KeyS")) {
            this.accelerate(-speedFactor);
            this.resumingAfterPollen = false;
        }
        if (this.scene.gui.isKeyPressed("KeyA")) {
            this.turn(speedFactor);
            this.resumingAfterPollen = false;
        }
        if (this.scene.gui.isKeyPressed("KeyD")) {
            this.turn(-speedFactor);
            this.resumingAfterPollen = false;
        }
        if (this.scene.gui.isKeyPressed("KeyR")) {
            this.reset();
            this.resumingAfterPollen = false;
            this.inHive = false;
        }
        if (this.scene.gui.isKeyPressed("KeyF") && !this.hasPollen) {
            console.log(this.flower);
            this.pickingUpPollen = true;
            this.previousY = this.y;
            this.resumingAfterPollen = false;
        }
        if (this.scene.gui.isKeyPressed("KeyO") && this.hasPollen) {
            this.droppingPollen = true;
            this.resumingAfterPollen = false;
            this.hasPollen = false;
            this.pickingUpPollen = false;
        }
        if (this.scene.gui.isKeyPressed("KeyP") && this.hasPollen) {
            this.resumingAfterPollen = true;
            this.pickingUpPollen = false;
        }
    }

    // Pick up pollen
    pickUpPollen (t) {
        let pollenPosition = this.flower.position;

        if (this.flower == null || this.flower.pollen == null) {
            if (Math.abs(this.y) > 0.3) {
                this.y -= this.y * 0.2;
            } else {
                this.y = 0;
                this.pickingUpPollen = false;
            }
            return;
        }


        if (this.hasPollen) {
            this.carry_pollen = new MyPolen(this.scene);
            this.flower.pollen = null;
            this.y = Math.sin((t / 1000) * 2) + pollenPosition.y + 0.5;
            return;
        }

        let dx = pollenPosition.x - this.x;
        let dy = pollenPosition.y - this.y;
        let dz = pollenPosition.z - this.z;

        let distance = Math.hypot(dx, dy, dz);
        let xz_distance = Math.hypot(dx, dz);

        if (distance < 0.3) {
            this.hasPollen = true;
            return;
        }

        let orientation = Math.atan2(dx, dz);
        this.orientation = orientation;


        /**
         * Note: This makes a parabola because dy will be increasingly smaller
         * which means that if we always update y as a linear function of  dy
         * the rate at which the bee goes down will be slower and slower
         * making it look like a parabola.
        */

        this.x += (dx / distance) * 0.5;
        // if (xz_distance < 12) this.y += dy * 0.2;    // only starts going down when close to the flower
        this.y += Math.sign(dy) * Math.max(Math.abs(dy * 0.1), 0.01); // guarantee it always reaches needed height
        this.z += (dz / distance) * 0.5;

        this.previousDx = dx;
        this.previousDz = dz;
        this.previousSpeed = this.speed;
    }

    continueMovement () {
        let deltaY = this.previousY - this.y;

        if (Math.abs(deltaY) > 0.2) {
            this.y += deltaY * 0.2;
            return;
        }

        this.speed = Math.max(this.previousSpeed, 2);
        this.speed = Math.min(this.speed, 4);

        this.normal = Math.hypot(this.previousDx, this.previousDz);
        this.x += (this.previousDx / this.normal) * this.speed * 0.5;
        this.z += (this.previousDz / this.normal) * this.speed * 0.5;

        this.y = this.previousY;
    }

    returnToHive (t) {
        let hivePosition = this.hive_position;

        if (this.inHive) {
            this.y = Math.sin((t / 1000) * 2) + hivePosition.y + 0.5;
            return;
        }

        let dx = hivePosition.x - this.x;
        let dy = hivePosition.y - this.y;
        let dz = hivePosition.z - this.z;

        let distance = Math.hypot(dx, dy, dz);
        let xz_distance = Math.hypot(dx, dz);

        if (distance < 0.5) {
            this.scene.hive.pollens.push(this.flower.pollen);
            this.inHive = true;
            this.droppingPollen = false;
            this.carry_pollen = null;
            return;
        }

        let orientation = Math.atan2(dx, dz);
        this.orientation = orientation;

        /**
         * Note: This makes a parabola because dy will be increasingly smaller
         * which means that if we always update y as a linear function of dy
         * the rate at which the bee goes up will be slower and slower
         * making it look like a parabola.
        */
        this.x += (dx / distance) * 0.5;
        this.y += Math.sign(dy) * Math.max(Math.abs(dy * 0.1), 0.01); // guarantee it always reaches needed height
        this.z += (dz / distance) * 0.5;
    }
}
