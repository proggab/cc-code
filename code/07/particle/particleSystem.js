class ParticleSystem{
    constructor() {
        this.particles = [];
    }

    addParticles(num, loc) {
        let size = 10;
        for (let i=0; i<num; i++) {
            let p = new RigidBody(loc.x, loc.y, size);
            let rf = p5.Vector.random2D().mult(random(2));
            p.applyForce(rf);
            this.particles.push(p);
        }
    }

    update() {
        for (let i=0; i<this.particles.length; i++){
            let p = this.particle[i];

for (let j=i+1; j<this.particles.length; j++){
    let otherP=this.particles[j];
    let distance = p.loc.dist(otherP.loc);
    if(distance>0 && distance < (p.size+ otherP.size)/2) {
    let push = p5.Vector.sub(p.loc, otherP.loc);
push.normalize();
push.div(distance*2);
push.limit(0.05);
p.applyForce(push);
otherP.applyForce(push.multi(-1));
    }

}
            p.update();
            p.bounce();
        
        
            
        }
    }


display() {
    this.particles.forEach( p => {
        p.display();
        
    })
}

}