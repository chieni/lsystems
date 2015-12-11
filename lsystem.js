
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
          if (typeof rules[next] == 'object') {
            var r = Math.floor(Math.random() * rules[next].length);
            temp += rules[next][r];
          } else {
            temp += rules[next];
          }
          
        } else {
          temp += next;
        }
      }
      current = String(temp);
    }
    return current;
  }

  that.getDepth = function(system) {
   var current_max = 0; // current count
    var max = 0;    // overall maximum count
 
    // Traverse the input string
    for (var i = 0; i< system.length; i++)
    {
        if (system.charAt(i) === '[') {
            current_max+=1;
 
            // update max if required
            if (current_max> max){

                max = Number(current_max);

              }
        }
        else if (system.charAt(i) === ']'){
            if (current_max>0) {
                current_max-=1;
            }
        }
    }
 
    return max;
  }

  that.drawSystem = function(iterations, length, start, angle) {
    var current = that.getCurrentSystem(iterations);

    var completeDepth = that.getDepth(current);

    var depth = 0;
    var results = [];
    var leafColors = [0x009900, 0x00b300, 0x008000 ];
    var colors = [];

    var angle = angle*Math.PI / 180;
    var dtheta = theta*Math.PI / 180;
    var vertices = [];


    var vStack = [];
    var dirStack = [];

    var original = new THREE.Vector3(length, 0, 0);
    var directionVector = new THREE.Vector3(1,0,0);
    var initRotation = new THREE.Matrix4();
    initRotation.makeRotationZ(angle);
    directionVector.transformDirection(initRotation);

    var begin = new THREE.Vector3(start.x,start.y,start.z);
    var end = new THREE.Vector3();

    var color = 0x291400;


    for (var i = 0; i<current.length; i++) {
      var character = current.charAt(i);
      var yRotation = new THREE.Matrix4();
      var xRotation = new THREE.Matrix4();
      var zRotation = new THREE.Matrix4();

      switch (character) {
        case 'F':
        case 'G':
        case 'f':

          var a = directionVector.clone().setLength(length);
          end.addVectors(begin, a);  
         
          vertices.push(begin.clone());
          vertices.push(end.clone());

          colors.push(new THREE.Color(color));
          colors.push(new THREE.Color(color));

          begin.copy(end);


          break;

        case '-':
          zRotation.makeRotationZ(-dtheta);
          directionVector = directionVector.clone().transformDirection(zRotation);
          break;

        case '+':
          zRotation.makeRotationZ(dtheta);
          directionVector = directionVector.clone().transformDirection(zRotation);
          break;

        case '[':
          depth += 1;
          if (depth > completeDepth/4) {
            var r = Math.floor(Math.random()*leafColors.length)
            color = Number(leafColors[r]);
          }
          vStack.push(new THREE.Vector3(begin.x, begin.y, begin.z));
          dirStack.push(new THREE.Vector3(directionVector.x, directionVector.y, directionVector.z));
          break;

        case ']':
          depth -= 1;
          if (depth < completeDepth/4) {
            color = 0x291400;
          }

          var temp = vStack.pop();
          begin.copy(new THREE.Vector3(temp.x, temp.y, temp.z));
          directionVector = dirStack.pop();
          break;

        default:
          break;
      }

    }
    results.push(vertices);
    results.push(colors);
    return results;
  }


  that.drawSystemCylinder = function(iterations, length, start, angle, radius, shrinkFactor, random) {
    var current = that.getCurrentSystem(iterations);
  
    var completeDepth = that.getDepth(current);

    var depth = 0;

    var angle = angle*Math.PI / 180;
    var dtheta = theta*Math.PI / 180;

    var shapes = [];

    var colors = [0x006600, 0x004d00, 0x003300 ];
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

    var cylRadius = Number(radius);

    var color = 0x291400;

    for (var i = 0; i<current.length; i++) {
      var character = current.charAt(i);
      var yRotation = new THREE.Matrix4();
      var xRotation = new THREE.Matrix4();
      var zRotation = new THREE.Matrix4();

      switch (character) {
        case 'F':
        case 'G':
        case 'f':
        case 'B':

          var a = directionVector.clone().setLength(length);
          end.addVectors(begin, a);  

          // Cylinder construction
          var material = new THREE.MeshLambertMaterial( {color: color, emissive: color} );
          material.wireframeLinewidth = 5;
          var cylinder = new THREE.CylinderGeometry(cylRadius/5,cylRadius,length + 3*cylRadius);
          cylinder.name = 'current';
          cylinder.colors.push(color);

          cylinder.applyMatrix(new THREE.Matrix4().makeTranslation(0, length/2 + 2*cylRadius, 0));
          cylinder.applyMatrix(new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(90)));

          var mesh = new THREE.Mesh(cylinder,material);
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.position.copy(begin);
          mesh.lookAt(end);
          shapes.push(mesh);

          begin.copy(end);

          break;

        case '-':
          angle -= dtheta;
          zRotation.makeRotationZ(-dtheta);
          if (random) {
            var xRand = Math.random()*dtheta;
            xRand *= Math.floor(Math.random()*2) == 1 ? 1 : -1;

            var yRand = Math.random()*Math.PI/2;
            yRand *= Math.floor(Math.random()*2) == 1 ? 1 : -1;

            xRotation.makeRotationX(xRand);
            yRotation.makeRotationY(yRand);
            directionVector = directionVector.clone().transformDirection(zRotation).transformDirection(yRotation).transformDirection(xRotation);
          } else {
            directionVector = directionVector.clone().transformDirection(zRotation);
          }
          break;

        case '+':
          angle += dtheta;
          zRotation.makeRotationZ(dtheta);
          if (random) {
            var xRand = Math.random()*dtheta;
            xRand *= Math.floor(Math.random()*2) == 1 ? 1 : -1;

            var yRand = Math.random()*Math.PI/2;
            yRand *= Math.floor(Math.random()*2) == 1 ? 1 : -1;

            xRotation.makeRotationX(xRand);
            yRotation.makeRotationY(yRand);
            directionVector = directionVector.clone().transformDirection(zRotation).transformDirection(yRotation).transformDirection(xRotation);
          } else {
            directionVector = directionVector.clone().transformDirection(zRotation)
          }
          break;

        case '[':
          depth += 1;
    
          if (depth > completeDepth/4) {
            var r = Math.floor(Math.random()*colors.length)
            color = Number(colors[r]);
          }

          cylRadius /= shrinkFactor;
          aStack.push(angle);
          vStack.push(new THREE.Vector3(begin.x, begin.y, begin.z));
          dirStack.push(new THREE.Vector3(directionVector.x, directionVector.y, directionVector.z));
          break;

        case ']':
          depth -= 1;

          if (depth < completeDepth/4) {
            color = 0x291400;
          }

          cylRadius *= shrinkFactor;
          angle = aStack.pop();
          var temp = vStack.pop();
          begin.copy(new THREE.Vector3(temp.x, temp.y, temp.z));
          directionVector = dirStack.pop();
          break;

        default:
          break;
      }

    }
    
    return shapes;
  }

  Object.freeze(that);
  return that;
}
