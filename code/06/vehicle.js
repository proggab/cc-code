class Vehicle {
    constructor(x, y) {
        this.loc = createVector(x, y);
        this.acc = createVector();
        this.vel = createVector();
        this.friction= 0.995;
    }

    applyForce(force) {
        // f = ma
        this.acc.add(force);
    
    }


    update() {
        this.vel.add(this.acc);
        this.loc.add(this.vel);
        this.acc.mult(0);
        this.vel.mult(this.friction);

        if (this.loc.y > height) {
            this.loc.y = height;
            this.vel.y *= -1;
        }

    }
    update() {
        this.vel.add(this.acc);
        this.loc.add(this.vel);
        this.acc.mult(0);
        this.vel.mult(this.friction);

        if (this.loc.y > height) {
            this.loc.y = height;
            this.vel.y *= -1;
        }

        if (this.loc.x>width || this.loc.x<0){
            this.vel.x *= -1;
        }


    }

    display() {
        circle(this.loc.x, this.loc.y, 20);
    }

    
}
