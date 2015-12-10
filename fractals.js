
var Fractal = function() {
  var that = Object.create(LSystem.prototype);

	// Quadratic Koch Island
  that.koch = function() {
    var sys = LSystem('F+F+F+F', 90);
    sys.addRule('F', 'F+F-F-FF+F+F-F');
    var results = sys.drawSystem(2, 30, new THREE.Vector3( -200,-200,0 ), 0);
    return results;
  }

  // Sierpinski Triangle
  that.triangle = function() {
    var sys = LSystem('F', 60);
    sys.addRule('F', 'G-F-G');
    sys.addRule('G', 'F+G+F');
    var results = sys.drawSystem(6, 10, new THREE.Vector3( -300,-300,0 ), 0);
    return results;
  }

  // Hexagonal Gopser
  that.hex = function() {
    var sys = LSystem('F', 60);
    sys.addRule('F', 'F+f++f-F--FF-f+');
    sys.addRule('f', '-F+ff++f+F--F-f');
    var results = sys.drawSystem(4, 10, new THREE.Vector3( 0,-300,0 ), 10, 0);  
    return results;
  }

  // Dragon curve
  that.dragon = function() {
    var sys = LSystem('FX', 90);
    sys.addRule('X', 'X+YF+');
    sys.addRule('Y', '-FX-Y');
    var results = sys.drawSystem(10, 15, new THREE.Vector3(0,-250,0), 0);
    return results;
  }

  Object.freeze(that);
  return that;
}