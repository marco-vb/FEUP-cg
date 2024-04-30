import { CGFappearance } from "../../lib/CGF.js";

class Colors {
    constructor(scene) {
        this.scene = scene;

        this.colors = ["yellow", "green", "pink", "dark_green", "gray"];

        this.yellow = new CGFappearance(scene);
        this.yellow.setAmbient(1, 1, 0, 1);
        this.yellow.setDiffuse(1, 1, 0, 1);
        this.yellow.setSpecular(1, 1, 0, 1);
        this.yellow.setShininess(10.0);

        this.green = new CGFappearance(scene);
        this.green.setAmbient(0, 1, 0, 1);
        this.green.setDiffuse(0, 1, 0, 1);
        this.green.setSpecular(0, 1, 0, 1);
        this.green.setShininess(10.0);

        this.pink = new CGFappearance(scene);
        this.pink.setAmbient(1, 0.5, 0.5, 1);
        this.pink.setDiffuse(1, 0.5, 0.5, 1);
        this.pink.setSpecular(1, 0.5, 0.5, 1);
        this.pink.setShininess(10.0);

        this.dark_green = new CGFappearance(scene);
        this.dark_green.setAmbient(0, 0.5, 0, 1);
        this.dark_green.setDiffuse(0, 0.5, 0, 1);
        this.dark_green.setSpecular(0, 0.5, 0, 1);
        this.dark_green.setShininess(10.0);

        this.gray = new CGFappearance(scene);
        this.gray.setAmbient(0.5, 0.5, 0.5, 1);
        this.gray.setDiffuse(0.5, 0.5, 0.5, 1);
        this.gray.setSpecular(0.5, 0.5, 0.5, 1);
        this.gray.setShininess(10.0);

        this.black = new CGFappearance(scene);
        this.black.setAmbient(0, 0, 0, 1);
        this.black.setDiffuse(0, 0, 0, 1);
        this.black.setSpecular(0, 0, 0, 1);
        this.black.setShininess(10.0);

        this.dark_brown = new CGFappearance(scene);
        this.dark_brown.setAmbient(0.1, 0.05, 0, 1);
        this.dark_brown.setDiffuse(0.1, 0.05, 0, 1);
        this.dark_brown.setSpecular(0.1, 0.05, 0, 1);
        this.dark_brown.setShininess(10.0);
    }

    apply_yellow() {
        this.yellow.apply();
    }

    apply_green() {
        this.green.apply();
    }

    apply_pink() {
        this.pink.apply();
    }

    apply_dark_green() {
        this.dark_green.apply();
    }

    apply_gray() {
        this.gray.apply();
    }

    apply_black() {
        this.black.apply();
    }

    apply_dark_brown() {
        this.dark_brown.apply();
    }

    apply_random() {
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.apply(color);
    }

    random_color() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    apply(color) {
        switch (color) {
            case "yellow":
                this.apply_yellow();
                break;
            case "green":
                this.apply_green();
                break;
            case "pink":
                this.apply_pink();
                break;
            case "dark_green":
                this.apply_dark_green();
                break;
            case "gray":
                this.apply_gray();
                break;
            case "black":
                this.apply_black();
                break;
            case "dark_brown":
                this.apply_dark_brown();
                break;
            default:
                break;
        }
    }
}

export { Colors };