
var LSystem = function(axiom, theta) {
  var that = Object.create(LSystem.prototype);
  var rules = {};

  that.addRule = function(character, rule) {
    rules[character] = rule;
  }

  that.getCurrentSystem = function(iterations) {
    var current = axiom;
    for (var i=0; i < iterations; i++) {
      var temp = "";

      for (var j=0; j < current.length; j++) {
        var next = current.charAt(j);
        if (rules[next]) {
          temp += rules[next];
        } else {
          temp += next;
        }
      }
      current = String(temp);
    }
    return current;
  }

  that.drawSystem2D = function(iterations, length, start, angle) {
    var current = that.getCurrentSystem(iterations);
    console.log(current)
    var angle = angle*Math.PI / 180;
    var dtheta = theta*Math.PI / 180;
    var vertices = [];

    var vStack = [];
    var aStack = [];

    var original = new THREE.Vector3(length, 0, 0);

    var prev = new THREE.Vector3();
    var begin = new THREE.Vector3(start.x,start.y,start.z);
    var end = new THREE.Vector3();

    var zRotation = new THREE.Matrix4();

    for (var i = 0; i<current.length; i++) {
      var character = current.charAt(i);

      switch (character) {
        case 'F':
        case 'G':
        case 'f':
          // Rotate to theta, then go forward by 200
          zRotation.makeRotationZ(angle);
          var a = original.clone().transformDirection(zRotation).multiplyScalar(length);    

          end.addVectors(begin, a);  
         
          vertices.push(begin.clone());
          vertices.push(end.clone());

          prev.copy(begin);
          begin.copy(end);

          break;

        case '-':
          angle -= dtheta;
          break;

        case '+':
          angle += dtheta;
          break;

        case '[':
          vStack.push(new THREE.Vector3(begin.x, begin.y, begin.z));
          aStack.push(angle);
          break;

        case ']':
          var temp = vStack.pop();
          begin.copy(new THREE.Vector3(temp.x, temp.y, temp.z));
          angle = aStack.pop();
          break;

        default:
          break;
      }

    }
    return vertices;
  }

  that.drawSystem3D = function(iterations, length, start, z0) {
    var current = that.getCurrentSystem(iterations);
    var dtheta = theta*Math.PI / 180;
    
    var zangle = z0*Math.PI / 180;
    var yangle = 0;
    var xangle = 0;

    var vertices = [];
    var vStack = [];

    var dirStack = [];

    var directionVector = new THREE.Vector3(1,0,0);
    var initRotation = new THREE.Matrix4();
    initRotation.makeRotationZ(zangle);
    directionVector.transformDirection(initRotation);

    var original = new THREE.Vector3(length, 0, 0);

    var prev = new THREE.Vector3();
    var begin = new THREE.Vector3(start.x,start.y,start.z);
    var end = new THREE.Vector3();

    var zRotation = new THREE.Matrix4();
    var yRotation = new THREE.Matrix4();
    var xRotation = new THREE.Matrix4();

    for (var i = 0; i<current.length; i++) {
      var character = current.charAt(i);

      switch (character) {
        case 'F':
        case 'f':

          var a = directionVector.clone().multiplyScalar(length);
          end.addVectors(begin, a);  
         
          vertices.push(begin.clone());
          vertices.push(end.clone());

          prev.copy(begin);
          begin.copy(end);

          break;

        case '-':
          zRotation.makeRotationZ(-dtheta);
          directionVector = directionVector.clone().transformDirection(zRotation);
          break;

        case '+':
        console.log(zRotation)
          zRotation.makeRotationZ(dtheta);
          console.log(zRotation)
          directionVector = directionVector.clone().transformDirection(zRotation);
          break;

        case '\\':
          xRotation.makeRotationX(dtheta);
          directionVector = directionVector.clone().transformDirection(xRotation);

          break;

        case '/':
          xRotation.makeRotationX(-dtheta);
          directionVector = directionVector.clone().transformDirection(xRotation);
          break;

        case '^':
          yRotation.makeRotationY(-dtheta);
          directionVector = directionVector.clone().transformDirection(yRotation);
          break;

        case '&':
          yRotation.makeRotationY(dtheta);
          directionVector = directionVector.clone().transformDirection(yRotation);
          break;

        case '|':
          zRotation.makeRotationZ(Math.PI);
          directionVector = directionVector.clone().transformDirection(zRotation);
          break;

        case '[':
          vStack.push(new THREE.Vector3(begin.x, begin.y, begin.z));
          dirStack.push(new THREE.Vector3(directionVector.x, directionVector.y, directionVector.z));
          break;

        case ']':
          var temp = vStack.pop();
          begin.copy(new THREE.Vector3(temp.x, temp.y, temp.z));
          directionVector = dirStack.pop();

          break;

        default:
          break;
      }

    }
    return vertices;
  }
  that.hilbert = function(center, size, iterations, v0, v1, v2, v3 ){
    var half = size / 2;


    var vec_s = [
      new THREE.Vector3( center.x - half, center.y-half, center.z ),
      new THREE.Vector3( center.x - half, center.y+half, center.z ),
      new THREE.Vector3( center.x + half, center.y+half, center.z ),
      new THREE.Vector3( center.x + half, center.y-half, center.z  )
    ];

    var vec = [
      vec_s[ v0 ],
      vec_s[ v1 ],
      vec_s[ v2 ],
      vec_s[ v3 ]
    ];

    // Recurse iterations
    if ( 0 <= -- iterations ) {

      var tmp = [];

      Array.prototype.push.apply( tmp, that.hilbert ( vec[ 0 ], half, iterations, v0, v3, v2, v1 ) );
      Array.prototype.push.apply( tmp, that.hilbert( vec[ 1 ], half, iterations, v0, v1, v2, v3 ) );
      Array.prototype.push.apply( tmp, that.hilbert( vec[ 2 ], half, iterations, v0, v1, v2, v3 ) );
      Array.prototype.push.apply( tmp, that.hilbert( vec[ 3 ], half, iterations, v2, v1, v0, v3 ) );

      // Return recursive call
      return tmp;

    }

    // Return complete Hilbert Curve.
    return vec;
  }

  Object.freeze(that);
  return that;
}
