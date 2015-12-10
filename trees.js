var Tree = function() {
  var that = Object.create(LSystem.prototype);


  that.tree1 = function(threed) {
    // Tree1 
    
    var sys = LSystem('F', 25.7);
    sys.addRule('F', 'F[+F]F[-F]F');

    if (!threed){
        var results = sys.drawSystem(5, 3, new THREE.Vector3( 0,-400,0 ), 90);  
    } else {
        var results = sys.drawSystemCylinder(4, 5, new THREE.Vector3( 0,-200,0 ), 90, 1.0, 1.8, true);
    }
    return results;
  }


  that.tree2 = function(threed) {
    // Tree2
    
    var sys = LSystem('F', 20);
    sys.addRule('F', 'F[+F]F[-F][F]');

    if (!threed){
        var results = sys.drawSystem(5, 15, new THREE.Vector3( 0,-400,0 ), 90);
    } else {
        var results = sys.drawSystemCylinder(5, 10, new THREE.Vector3( 0,-400,0 ), 90, 1.5, 1.8, true);

    }
    return results;
  }

  that.tree3 = function(threed) {
    // Tree3
    
    var sys = LSystem('F', 22.5);
    sys.addRule('F', 'FF-[-F+F+F]+[+F-F-F]');

    if (!threed){
        var results = sys.drawSystem(4, 13, new THREE.Vector3( 0,-400,0 ), 90);
    } else {
        var results = sys.drawSystemCylinder(5, 10, new THREE.Vector3( 0,-400,0 ), 90, 1.5, 1.8, true);

    }
    return results;
  }

  that.tree4 = function(threed) {
    // Tree4
    var sys = LSystem('X', 20);
    
    sys.addRule('X', 'F[+X]F[-X]+X');
    sys.addRule('F', 'FF');

    if (!threed){
        var results = sys.drawSystem(7, 3, new THREE.Vector3( 0,-400,0 ), 90);
    } else {
        var results = sys.drawSystemCylinder(5, 10, new THREE.Vector3( 0,-400,0 ), 90, 1.5, 1.8, true);

    }
    return results;
  }

  that.tree5 = function(threed) {
    // Tree5
    var sys = LSystem('X', 25.7);
    
    sys.addRule('X', 'F[+X][-X]FX');
    sys.addRule('F', 'FF');

    if (!threed){
        var results = sys.drawSystem(7, 3, new THREE.Vector3( 0,-400,0 ), 90);
    } else {
        var results = sys.drawSystemCylinder(7, 1.5, new THREE.Vector3( 0,-200,0 ), 90, 1.5, 1.8, true);
    }
    return results;
  }

  that.tree6 = function(threed) {
    // Tree6
    var sys = LSystem('X', 22.5);
    
    sys.addRule('X', 'F-[[X]+X]+F[+FX]-X');
    sys.addRule('F', 'FF');

    if (!threed){
        var results = sys.drawSystem(5, 7, new THREE.Vector3( 0,-300,0 ), 90);
    } else {
        var results = sys.drawSystemCylinder(6, 2.5, new THREE.Vector3( 0,-200,0 ), 90, 5, 2, true);
    }
    return results;
  }

    // Stochastic Tree Line
  that.stree = function(threed) {
    var sys = LSystem('F', 22.5);
    sys.addRule('F', ['F[+F]F[-F]F', 'F[+F]F', 'F[-F]F']);

    if (!threed){
        var results = sys.drawSystem(6,10, new THREE.Vector3( 0,-400,0 ), 90, true);
    } else {
        var results = sys.drawSystemCylinder(6,2.5, new THREE.Vector3( 0,-200,0 ), 90,1.5, 1.4, true);
    }
    return results;
  }

  that.stree2 = function() {
    var sys = LSystem('F', 22.5);
    sys.addRule('F', ['F[+F][-F]F', 'F[-F]F', 'F[+F]F']);
    var results = sys.drawSystemCylinder(7,3, new THREE.Vector3( 0,-150,0 ), 90,1.5, 1.4, true);
    return results; 
  }
    
  that.bush = function() {
    var sys = LSystem('FB', 10);
    sys.addRule('B', ['[+FB][-FB]', '[++FB][--FB]', '[+++FB][---FB]']);
    var results = sys.drawSystemCylinder(10,10, new THREE.Vector3( 0,-150,0 ), 90,3, 1.15, true);
    return results;
  }

  Object.freeze(that);
  return that;
}