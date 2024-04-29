import { CGFobject } from "../../lib/CGF.js";

import { MySphere } from "./shapes/MySphere.js";

/**
 * MyBee
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBee extends CGFobject {
  constructor(scene) {
    super(scene);

    this.head = new MySphere(scene);
    this.eyes = [];
    for (var i = 0; i < 2; i++) {
      this.eyes.push(new MySphere(scene));
    }
    this.antennas = [];
    for (var i = 0; i < 2; i++) {
      this.antennas.push(new MySphere(scene));
    }
    this.torax = new MySphere(scene);
    this.wings = [];
    for (var i = 0; i < 4; i++) {
      this.wings.push(new MySphere(scene));
    }
    this.abdomen = new MySphere(scene);
    this.stinger = new MySphere(scene);
  }

  display() {
    this.scene.enableTextures(false);

    // Head
    this.scene.pushMatrix();
    {
      this.scene.translate(0, 4.25, 0);
      this.scene.scale(1, 0.85, 1);
      this.head.display();
    }
    this.scene.popMatrix();

    // Eyes
    this.scene.pushMatrix();
    {
      this.scene.translate(0, 5, 0.5);
      this.scene.rotate(Math.PI / 6, 1, 0, 0);
      this.scene.scale(0.65, 0.25, 0.5);
      this.eyes[0].display();
    }
    this.scene.popMatrix();

    this.scene.pushMatrix();
    {
      this.scene.translate(0, 5, -0.5);
      this.scene.rotate(-Math.PI / 6, 1, 0, 0);
      this.scene.scale(0.65, 0.25, 0.5);
      this.eyes[1].display();
    }
    this.scene.popMatrix();

    // Antennas
    this.scene.pushMatrix();
    {
      this.scene.translate(1, 4.75, 0.5);
      this.scene.rotate(-Math.PI / 2, 0, 0, 1);
      this.scene.rotate(Math.PI / 4, 1, 0, 0);
      this.scene.scale(0.05, 1.25, 0.05);
      this.antennas[0].display();
    }
    this.scene.popMatrix();

    this.scene.pushMatrix();
    {
      this.scene.translate(1, 4.75, -0.5);
      this.scene.rotate(-Math.PI / 2, 0, 0, 1);
      this.scene.rotate(-Math.PI / 4, 1, 0, 0);
      this.scene.scale(0.05, 1.25, 0.05);
      this.antennas[1].display();
    }
    this.scene.popMatrix();

    // Torax
    this.scene.pushMatrix();
    {
      this.scene.translate(0, 2.5, 0);
      this.scene.scale(1, 1, 1);
      this.torax.display();
    }
    this.scene.popMatrix();

    // Top left wing
    this.scene.pushMatrix();
    {
      this.scene.translate(1.5, 2.5, 2);
      this.scene.rotate(Math.PI / 6, 0, 1, 0);
      this.scene.rotate(Math.PI / 16, 1, 0, 0);
      this.scene.scale(0.1, 1, 2);

      this.wings[0].display();
    }
    this.scene.popMatrix();

    // Top right wing
    this.scene.pushMatrix();
    {
      this.scene.translate(1.5, 2.5, -2);
      this.scene.rotate(-Math.PI / 6, 0, 1, 0);
      this.scene.rotate(-Math.PI / 16, 1, 0, 0);
      this.scene.scale(0.1, 1, 2);

      this.wings[1].display();
    }
    this.scene.popMatrix();

    // Bottom left wing
    this.scene.pushMatrix();
    {
      this.scene.translate(1.25, 1.25, 1.75);
      this.scene.rotate(Math.PI / 6, 0, 1, 0);
      this.scene.rotate(Math.PI / 6, 1, 0, 0);
      this.scene.scale(0.05, 0.5, 1.5);
      this.wings[2].display();
    }
    this.scene.popMatrix();

    // Bottom right wing
    this.scene.pushMatrix();
    {
      this.scene.translate(1.25, 1.25, -1.75);
      this.scene.rotate(-Math.PI / 6, 0, 1, 0);
      this.scene.rotate(-Math.PI / 6, 1, 0, 0);
      this.scene.scale(0.05, 0.5, 1.5);
      this.wings[3].display();
    }
    this.scene.popMatrix();

    // Abdomen
    this.scene.pushMatrix();
    {
      this.scene.translate(0, 0, 0);
      this.scene.scale(1.25, 2, 1.25);
      this.abdomen.display();
    }
    this.scene.popMatrix();

    // Stinger
    this.scene.pushMatrix();
    {
      this.scene.translate(0, -2, 0);
      this.scene.scale(0.15, 0.75, 0.15);
      this.stinger.display();
    }
    this.scene.popMatrix();

    this.scene.enableTextures(true);
  }
}
