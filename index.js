if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var windowHalfX = window.innerWidth / 2,
windowHalfY = window.innerHeight / 2;

var fractal = Fractal();
var tree = Tree();

var camera, scene, renderer, material, controls;

init();
animate();

function init() {

    var i, container;
    var doc = document.getElementById('doc');
    container = document.createElement( 'div' );
    container.className = 'bg';
    doc.appendChild( container );

    camera = new THREE.PerspectiveCamera( 33, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 700;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0xe5f9ff );
    //renderer.setClearColor( 0xffffff );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth/1.4, window.innerHeight/1.4);

    container.appendChild( renderer.domElement );

    // Lights
    addLights();

    controls = new THREE.OrbitControls( camera, renderer.domElement );

    controls.target.set( 0, 2, 0 );
    controls.update();

    window.addEventListener( 'resize', onWindowResize, false );

}

function addLights() {
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

}

$('.selector').click(function(){
    var id = this.id;
    var i = $('#iterations').val();
    var selectedObj = scene.getObjectByName("current");
    var obj, j;
    for ( j= scene.children.length - 1; j >= 0 ; j -- ) {
        obj = scene.children[ j ];
        scene.remove(obj);
    }
    addLights();

    var selectedVal = "";
    var selected = $("input[type='radio'][name='dim']:checked");
    if (selected.length >0){
        selectedVal = selected.val();
    }

    switch(id) {
        case 'koch':
            if (i == 0) {
                alert('Please fill out the number of iterations.')
            }
            addLinesToScene(fractal.koch(i), true);
            break;
        case 'triangle':
            if (i == 0) {
                alert('Please fill out the number of iterations.')
            }
            addLinesToScene(fractal.triangle(i), true);
            break;
        case 'hex':
            if (i == 0) {
                alert('Please fill out the number of iterations.')
            }
            addLinesToScene(fractal.hex(i), true);
            break;
        case 'dragon':
            if (i == 0) {
                alert('Please fill out the number of iterations.')
            }
            addLinesToScene(fractal.dragon(i), true);
            break;
        case 'tree1':
            if (selectedVal === 'yes') {
                addShapesToScene(tree.tree1(true));
            } else {
                addLinesToScene(tree.tree1());
            }
                
            break;
        case 'tree2':
            if (selectedVal === 'yes') {
                addShapesToScene(tree.tree2(true));
            } else {
                addLinesToScene(tree.tree2());
            }
            break;
        case 'tree3':
            if (selectedVal === 'yes') {
                addShapesToScene(tree.tree3(true));
            } else {
                addLinesToScene(tree.tree3());
            }
            break;
        case 'tree4':
            if (selectedVal === 'yes') {
                addShapesToScene(tree.tree4(true));
            } else {
                addLinesToScene(tree.tree4());
            }
            break;
        case 'tree5':
            if (selectedVal === 'yes') {
                addShapesToScene(tree.tree5(true));
            } else {
                addLinesToScene(tree.tree5());
            }
            break;
        case 'tree6':
            if (selectedVal === 'yes') {
                addShapesToScene(tree.tree6(true));
            } else {
                addLinesToScene(tree.tree6());
            }
            break;
        case 'tree-rand':
            if (selectedVal === 'yes') {
                addShapesToScene(tree.stree(true));
            } else {
                addLinesToScene(tree.stree());
            }
            break;
        case 'bush':
            if (selectedVal === 'yes') {
                addShapesToScene(tree.bush(true));
            } else {
                alert('Bush can only be 3D');
            }
    }
    
})

function makeRainbow(colors3) {
    for (var i = 0; i<colors3.length; i++) {
        colors3[ i ].setHSL( i / colors3.length, 1.0, 0.5 );
    }
    return colors3;
}

function addLinesToScene(results, rainbow) {
    var geometry3 = new THREE.Geometry();
    geometry3.vertices = results[0];

    if (rainbow) {
        geometry3.colors = makeRainbow(results[1]);
    } else {
        geometry3.colors = results[1];
    }

    material = new THREE.LineBasicMaterial( { color: 0xffffff, opacity: 1, linewidth: 1, vertexColors: THREE.VertexColors } );

    var line, p, scale = 0.3, d = 225;

    line = new THREE.Line(geometry3, material );
    line.scale.x = line.scale.y = line.scale.z =  scale*1.5;
    line.position.x = 0;
    line.position.y = 0;
    line.position.z = 0;
    line.name = "current";
    scene.add( line );
}

function addShapesToScene(shapes) {
    for (var i = 0; i<shapes.length; i++) {
        scene.add(shapes[i]);
    }
}

function createForest() {
    for (var i = 0; i<4; i++) {
        var shapes = createStochasticTree(new THREE.Vector3( 100*i -100,-150, i*-10));
        for (var j = 0; j<shapes.length; j++) {
            scene.add(shapes[j]);
        }
    }
}

function createStochasticTree(start) {
    var sys = LSystem('F', 22.5);
    sys.addRule('F', ['F[+F][-F]F', 'F[-F]F', 'F[+F]F']);
    var shapes = sys.drawSystemCylinder(7,3, start , 90,1.5, 1.4, true);
    return shapes;
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
