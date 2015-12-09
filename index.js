      if ( ! Detector.webgl ) Detector.addGetWebGLMessage();


      var windowHalfX = window.innerWidth / 2,
      windowHalfY = window.innerHeight / 2,

      camera, scene, renderer, material, controls;

      init();
      animate();

      function init() {

        var i, container;

        container = document.createElement( 'div' );
        document.body.appendChild( container );

        camera = new THREE.PerspectiveCamera( 33, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 700;

        scene = new THREE.Scene();

        renderer = new THREE.CanvasRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );

        controls = new THREE.TrackballControls( camera, container );

        controls.rotateSpeed = 5.0;
        controls.zoomSpeed = 5;
        controls.panSpeed = 2;

        controls.noZoom = false;
        controls.noPan = false;

        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;


        // Fractals
        var geometry3 = new THREE.Geometry();


        // Quadratic Koch Island
        // var sys = LSystem('F+F+F+F', 90);
        // sys.addRule('F', 'F+F-F-FF+F+F-F');
        // var results = sys.drawSystem(2, 30, new THREE.Vector3( -200,-200,0 ), 0);


        // Sierpinski Triangle
        // var sys = LSystem('F', 60);
        // sys.addRule('F', 'G-F-G');
        // sys.addRule('G', 'F+G+F');
        // var results = sys.drawSystem(6, 10, new THREE.Vector3( -300,-300,0 ), 0);

        // Hexagonal Gopser
        // var sys = LSystem('F', 60);
        // sys.addRule('F', 'F+f++f-F--FF-f+');
        // sys.addRule('f', '-F+ff++f+F--F-f');
        // var results = sys.drawSystem(4, 10, new THREE.Vector3( 0,-300,0 ), 10, 0);

        // Dragon curve
        // var sys = LSystem('FX', 90);
        // sys.addRule('X', 'X+YF+');
        // sys.addRule('Y', '-FX-Y');
        // var results = sys.drawSystem(10, 15, new THREE.Vector3(0,-250,0), 0);

        // 3D Hilbert curve
        // var sys = LSystem('A', 90);
        // sys.addRule('A','B-F+CFC+F-D&F^D-F+&&CFC+F+B//' );
        // sys.addRule('B','A&F^CFB^F^D^^-F-D^|F^B|FC^F^A//');
        // sys.addRule('C','|D^|F^B-F+C^F^A&&FA&F^C+F+B^F^D//');
        // sys.addRule('D','|CFB-F+B|FA&F^A&&FB-F+B|FC//');
        // var results = sys.drawSystem(3, 50, new THREE.Vector3( 0,100,0 ), 0);


        // Plants


        // Tree1 
        // var sys = LSystem('F', 25.7);
        // sys.addRule('F', 'F[+F]F[-F]F');
        // var results = sys.drawSystem(5, 3, new THREE.Vector3( 0,-400,0 ), 90);
        

        // Tree2
        var sys = LSystem('F', 20);
        sys.addRule('F', 'F[+F]F[-F][F]');
        var results = sys.drawSystem(5, 5, new THREE.Vector3( 0,-200,0 ), 90);

        // Tree3
        // var sys = LSystem('F', 22.5);
        // sys.addRule('F', 'FF-[-F+F+F]+[+F-F-F]');
        // var results = sys.drawSystem(4, 13, new THREE.Vector3( 0,-400,0 ), 90);

        // Tree4
        // var sys = LSystem('X', 20);
        // sys.addRule('X', 'F[+X]F[-X]+X');
        // sys.addRule('F', 'FF');
        // var results = sys.drawSystem(7, 3, new THREE.Vector3( 0,-400,0 ), 90);

        // Tree5
        // var sys = LSystem('X', 25.7);
        // sys.addRule('X', 'F[+X][-X]FX');
        // sys.addRule('F', 'FF');
        // var results = sys.drawSystem(7, 3, new THREE.Vector3( 0,-400,0 ), 90);

        // Tree6
        // var sys = LSystem('X', 22.5);
        // sys.addRule('X', 'F-[[X]+X]+F[+FX]-X');
        // sys.addRule('F', 'FF');
        // var results = sys.drawSystem(5, 7, new THREE.Vector3( 0,-300,0 ), 90);

        // 3D Tree

        // var sys = LSystem('A', 22.5);
        // sys.addRule('A', '[&FLA]/////[&FLA]///////[&FLA]');
        // sys.addRule('F', 'S/////F');
        // sys.addRule('S', 'FL');
        // sys.addRule('L', '[^^-f+f+f-|-f+f+f]');
        // var results = sys.drawSystem(5, 20, new THREE.Vector3( 0,-100,0 ), 0);

        // var sys = LSystem('A', 90);
        // var points = sys.hilbert3D( new THREE.Vector3( 0,0,0 ), 200.0, 0, 0, 1, 2, 3, 4, 5, 6, 7 );

        //

        //colors3[ i ].setHSL( i / points.length, 1.0, 0.5 );

        // geometry3.colors = results[1];
        // geometry3.vertices = results[0];
        
        // material = new THREE.LineBasicMaterial( { color: 0xffffff, opacity: 1, linewidth: 1, vertexColors: THREE.VertexColors } );

        // var line, p, scale = 0.3, d = 225;

        // line = new THREE.Line(geometry3, material );
        // line.scale.x = line.scale.y = line.scale.z =  scale*1.5;
        // line.position.x = 0;
        // line.position.y = 0;
        // line.position.z = 0;
        // scene.add( line );


        for (var i = 0; i<results[2].length; i++) {
            scene.add(results[2][i]);
        }
        // for (var i=0; i<results[0].length-1; i++) {
        //     var start = results[0][i];
        //     var end = results[0][i+1];

        //     var distance = start.distanceTo(end);
        //     var angle = start.angleTo(end);

        //     var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        //     var cylinder = new THREE.CylinderGeometry(5,5,distance);
        //     cylinder.applyMatrix(new THREE.Matrix4().makeRotationZ(angle));

        //     var mesh = new THREE.Mesh(cylinder,material);
        //     mesh.position.copy(start);
        //     scene.add(mesh);
        // }


        // for (var i = 0; i<results[0].length-1; i++) {
        //     var vstart = results[0][i];
        //     var vend = results[0][i+1];

        //     var HALF_PI = +Math.PI * .5;
        //     var distance = vstart.distanceTo(vend);
        //     var position  = vend.clone().addVectors(vend, vstart).divideScalar(2);

        //     var material = new THREE.MeshLambertMaterial({color:0xffffff});
        //     var cylinder = new THREE.CylinderGeometry(4,1,distance,10,10,false);

        //     var orientation = new THREE.Matrix4();//a new orientation matrix to offset pivot
        //     var offsetRotation = new THREE.Matrix4();//a matrix to fix pivot rotation
        //     var offsetPosition = new THREE.Matrix4();//a matrix to fix pivot position
        //     orientation.lookAt(vstart,vend,new THREE.Vector3(0,1,0));//look at destination
        //     offsetRotation.makeRotationX(HALF_PI);//rotate 90 degs on X
            
        //     orientation.multiplyMatrices(orientation, offsetRotation);//combine orientation with rotation transformations
        //     cylinder.applyMatrix(orientation)

        //     var mesh = new THREE.Mesh(cylinder,material);
        //     mesh.position=position;
        //     scene.add(mesh);
        // }

        //

        window.addEventListener( 'resize', onWindowResize, false );

      }

      function onWindowResize() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );
        controls.handleResize();

      }

      function animate() {

        requestAnimationFrame( animate );
        controls.update();
        renderer.render(scene, camera );
      }
