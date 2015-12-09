
var LSystem = function(axiom, theta) {
  var that = Object.create(LSystem.prototype);
  var rules = {};
  var shrinkFactor = 1.8;

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

  that.drawSystem = function(iterations, length, start, angle) {
    var current = that.getCurrentSystem(iterations);
    var results = [];
    var colors = [];

    var angle = angle*Math.PI / 180;
    var dtheta = theta*Math.PI / 180;
    var vertices = [];
    var shapes = [];


    var vStack = [];
    var dirStack = [];
    var aStack = [];

    var original = new THREE.Vector3(length, 0, 0);
    var directionVector = new THREE.Vector3(1,0,0);
    var initRotation = new THREE.Matrix4();
    initRotation.makeRotationZ(angle);
    directionVector.transformDirection(initRotation);

    var begin = new THREE.Vector3(start.x,start.y,start.z);
    var end = new THREE.Vector3();

    var cylRadius = 1.5;

    for (var i = 0; i<current.length; i++) {
      var character = current.charAt(i);
      var yRotation = new THREE.Matrix4();
      var xRotation = new THREE.Matrix4();
      var zRotation = new THREE.Matrix4();

      switch (character) {
        case 'F':
        case 'G':
        case 'f':
          
          zRotation.makeRotationZ(angle);

          var a = directionVector.clone().setLength(length);
          end.addVectors(begin, a);  
         
          vertices.push(begin.clone());
          vertices.push(end.clone());

          colors.push(new THREE.Color(0xffffff));
          colors.push(new THREE.Color(0xffffff));


          // Cylinder construction
          var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
          var cylinder = new THREE.CylinderGeometry(cylRadius,cylRadius,length);

          cylinder.applyMatrix(new THREE.Matrix4().makeTranslation(0, length/2, 0));
          cylinder.applyMatrix(new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(90)));

          var mesh = new THREE.Mesh(cylinder,material);
          mesh.position.copy(begin);
          mesh.lookAt(end);
          shapes.push(mesh);




          begin.copy(end);


          break;

        case '-':
          angle -= dtheta;
          zRotation.makeRotationZ(-dtheta);
          directionVector = directionVector.clone().transformDirection(zRotation);
          break;

        case '+':
          angle += dtheta;
          zRotation.makeRotationZ(dtheta);
          directionVector = directionVector.clone().transformDirection(zRotation);
          break;

        case '[':
          cylRadius /= shrinkFactor;
          aStack.push(angle);
          vStack.push(new THREE.Vector3(begin.x, begin.y, begin.z));
          dirStack.push(new THREE.Vector3(directionVector.x, directionVector.y, directionVector.z));
          break;

        case ']':
          cylRadius *= shrinkFactor;
          angle = aStack.pop();
          var temp = vStack.pop();
          begin.copy(new THREE.Vector3(temp.x, temp.y, temp.z));
          directionVector = dirStack.pop();
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
        default:
          break;
      }

    }
    results.push(vertices);
    results.push(colors);
    results.push(shapes);
    return results;
  }

  that.hilbert3D = function( center, size, iterations, v0, v1, v2, v3, v4, v5, v6, v7 ) {

    // Default Vars
    var center     = undefined !== center ? center : new THREE.Vector3( 0, 0, 0 ),
      size       = undefined !== size ? size : 10,
      half       = size / 2,
      iterations = undefined !== iterations ? iterations : 1,
      v0 = undefined !== v0 ? v0 : 0,
      v1 = undefined !== v1 ? v1 : 1,
      v2 = undefined !== v2 ? v2 : 2,
      v3 = undefined !== v3 ? v3 : 3,
      v4 = undefined !== v4 ? v4 : 4,
      v5 = undefined !== v5 ? v5 : 5,
      v6 = undefined !== v6 ? v6 : 6,
      v7 = undefined !== v7 ? v7 : 7
    ;

    var vec_s = [
      new THREE.Vector3( center.x - half, center.y + half, center.z - half ),
      new THREE.Vector3( center.x - half, center.y + half, center.z + half ),
      new THREE.Vector3( center.x - half, center.y - half, center.z + half ),
      new THREE.Vector3( center.x - half, center.y - half, center.z - half ),
      new THREE.Vector3( center.x + half, center.y - half, center.z - half ),
      new THREE.Vector3( center.x + half, center.y - half, center.z + half ),
      new THREE.Vector3( center.x + half, center.y + half, center.z + half ),
      new THREE.Vector3( center.x + half, center.y + half, center.z - half )
    ];

    var vec = [
      vec_s[ v0 ],
      vec_s[ v1 ],
      vec_s[ v2 ],
      vec_s[ v3 ],
      vec_s[ v4 ],
      vec_s[ v5 ],
      vec_s[ v6 ],
      vec_s[ v7 ]
    ];

    // Recurse iterations
    if ( -- iterations >= 0 ) {

      var tmp = [];

      Array.prototype.push.apply( tmp, that.hilbert3D ( vec[ 0 ], half, iterations, v0, v3, v4, v7, v6, v5, v2, v1 ) );
      Array.prototype.push.apply( tmp, that.hilbert3D ( vec[ 1 ], half, iterations, v0, v7, v6, v1, v2, v5, v4, v3 ) );
      Array.prototype.push.apply( tmp, that.hilbert3D ( vec[ 2 ], half, iterations, v0, v7, v6, v1, v2, v5, v4, v3 ) );
      Array.prototype.push.apply( tmp, that.hilbert3D ( vec[ 3 ], half, iterations, v2, v3, v0, v1, v6, v7, v4, v5 ) );
      Array.prototype.push.apply( tmp, that.hilbert3D ( vec[ 4 ], half, iterations, v2, v3, v0, v1, v6, v7, v4, v5 ) );
      Array.prototype.push.apply( tmp, that.hilbert3D ( vec[ 5 ], half, iterations, v4, v3, v2, v5, v6, v1, v0, v7 ) );
      Array.prototype.push.apply( tmp, that.hilbert3D ( vec[ 6 ], half, iterations, v4, v3, v2, v5, v6, v1, v0, v7 ) );
      Array.prototype.push.apply( tmp, that.hilbert3D ( vec[ 7 ], half, iterations, v6, v5, v2, v1, v0, v3, v4, v7 ) );

      // Return recursive call
      return tmp;

    }

    // Return complete Hilbert Curve.
    return vec;

  }
  Object.freeze(that);
  return that;
}
