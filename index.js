if ( ! Detector.webgl ) Detector.addGetWebGLMessage();


var windowHalfX = window.innerWidth / 2,
windowHalfY = window.innerHeight / 2,

camera, scene, renderer, material, controls;

init();
animate();

function init() {

    var i, container;

    container = document.createElement( 'div' );
    container.className = 'bg';
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 33, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 700;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0xe5f9ff );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    container.appendChild( renderer.domElement );

    // Lights
    var ambientLight = new THREE.AmbientLight( 0x000000 );
    scene.add( ambientLight );

    var lights = [];
    lights[0] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[1] = new THREE.PointLight( 0xffffff, 1, 0 );

    lights[0].position.set( 0, 200, 0 );
    lights[1].position.set( 100, 200, 100 );

    lights[0].castShadow = true;
    lights[1].castShadow = true;

    scene.add( lights[0] );
    scene.add( lights[1] );

    controls = new THREE.OrbitControls( camera, renderer.domElement );
 //   controls.enableRotate = false;
    controls.target.set( 0, 2, 0 );
    controls.update();


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
    // var sys = LSystem('F', 20);
    // sys.addRule('F', 'F[+F]F[-F][F]');
    // var results = sys.drawSystem(5, 15, new THREE.Vector3( 0,-400,0 ), 90);

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


    // Cylindrical Plants

    // Tree1 
    // var sys = LSystem('F', 25.7);
    // sys.addRule('F', 'F[+F]F[-F]F');
    // var shapes = sys.drawSystemCylinder(4, 5, new THREE.Vector3( 0,-200,0 ), 90, 1.0, 1.8);


    // // Tree2
    // var sys = LSystem('F', 20);
    // sys.addRule('F', 'F[+F]F[-F][F]');
    // var shapes = sys.drawSystemCylinder(5, 10, new THREE.Vector3( 0,-400,0 ), 90, 1.5, 1.8);

    // Tree3
    // var sys = LSystem('F', 22.5);
    // sys.addRule('F', 'FF-[-F+F+F]+[+F-F-F]');
    // var shapes = sys.drawSystemCylinder(4, 8, new THREE.Vector3( 0,-200,0 ), 90, 1.5, 1.8);

    // Tree4
    // var sys = LSystem('X', 20);
    // sys.addRule('X', 'F[+X]F[-X]+X');
    // sys.addRule('F', 'FF');
    // var shapes = sys.drawSystemCylinder(7, 1.5, new THREE.Vector3( 0,-200,0 ), 90, 1.5, 1.8);

    // Tree5
    // var sys = LSystem('X', 25.7);
    // sys.addRule('X', 'F[+X][-X]FX');
    // sys.addRule('F', 'FF');
    // var shapes = sys.drawSystemCylinder(7, 1.5, new THREE.Vector3( 0,-200,0 ), 90, 1.5, 1.8);

    // Tree6
    // var sys = LSystem('X', 22.5);
    // sys.addRule('X', 'F-[[X]+X]+F[+FX]-X');
    // sys.addRule('F', 'FF');
    // var shapes = sys.drawSystemCylinder(6, 2.5, new THREE.Vector3( 0,-200,0 ), 90, 5, 2);

    // Stochastic Tree Line
    // var sys = LSystem('F', 22.5);
    // sys.addRule('F', ['F[+F]F[-F]F', 'F[+F]F', 'F[-F]F']);
    // var results = sys.drawSystem(6,10, new THREE.Vector3( 0,-400,0 ), 90, true);

    // Stochastic Tree Cylinder
    var sys = LSystem('F', 22.5);
    sys.addRule('F', ['F[+F]F[-F]F', 'F[+F]F', 'F[-F]F']);
    var shapes = sys.drawSystemCylinder(6,2.5, new THREE.Vector3( 0,-200,0 ), 90,1.5, 1.4, true);
    //

    var sys2 = LSystem('F', 22.5);
    sys2.addRule('F', ['F[+F]F[-F]F', 'F[+F]F', 'F[-F]F']);
    var shapes2 = sys2.drawSystemCylinder(6,2.5, new THREE.Vector3( -100,-200, -100 ), 90,1.5, 1.4, true);


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


    for (var i = 0; i<shapes.length; i++) {
        scene.add(shapes[i]);
    }

    for (var i =0; i<shapes2.length; i++) {
        scene.add(shapes2[i]);
    }

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
