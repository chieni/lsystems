
var Fractal = function() {
  var that = Object.create(LSystem.prototype);

	// Quadratic Koch Island
  that.koch = function(iterations) {
    var sys = LSystem('F+F+F+F', 90);
    sys.addRule('F', 'F+F-F-FF+F+F-F');
    var results = sys.drawSystem(iterations, 3, new THREE.Vector3( -200,-200,0 ), 0);
    return results;
  }

  // Sierpinski Triangle
  that.triangle = function(iterations) {
    var sys = LSystem('F', 60);
    sys.addRule('F', 'G-F-G');
    sys.addRule('G', 'F+G+F');
    var results = sys.drawSystem(iterations, 10, new THREE.Vector3( -300,-300,0 ), 0);
    return results;
  }

  // Hexagonal Gopser
  that.hex = function(iterations) {
    var sys = LSystem('F', 60);
    sys.addRule('F', 'F+f++f-F--FF-f+');
    sys.addRule('f', '-F+ff++f+F--F-f');
    var results = sys.drawSystem(iterations, 10, new THREE.Vector3( 0,-300,0 ), 10, 0);  
    return results;
  }

  // Dragon curve
  that.dragon = function(iterations) {
    var sys = LSystem('FX', 90);
    sys.addRule('X', 'X+YF+');
    sys.addRule('Y', '-FX-Y');
    var results = sys.drawSystem(iterations, 15, new THREE.Vector3(0,-250,0), 0);
    return results;
  }

  Object.freeze(that);
  return that;
}