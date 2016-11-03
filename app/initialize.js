var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);
var ResponsiveRenderer = require("tools/responsive_renderer.js");
var hide_stats = require("tools/hide_stats.js");
var stats = require('stats.js')();

// Importing Shaders, yay!
var skydome_vert = require("shaders/skydome_vert.glsl");
var skydome_frag = require("shaders/skydome_frag.glsl");

// DOM is Ready!
document.addEventListener('DOMContentLoaded', () => {

    // App vars
    var u_time = 0;
    var aspectRatio = window.innerWidth/window.innerHeight;

    // Scene setup
    var scene = new THREE.Scene();

    // Renderer setup
    var renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor("#333333");

    // Stats Setup
    stats.dom.setAttribute("id", "stats_helper");
    document.body.appendChild( stats.dom );
    hide_stats.setup();

    // Camera & Orbit
    var camera = new THREE.PerspectiveCamera(75,aspectRatio,0.1,10000);
    camera.position.y = 40;
    camera.position.z = 120;
    var controls = new OrbitControls(camera,renderer.domElement);

    // Responsive Renderer (Adjust the renderer if resize)
    var responsive_renderer = new ResponsiveRenderer(camera,renderer);

    // Grid Helper
    var helper = new THREE.GridHelper( 1000, 300,"#111111", "#111111" );
    helper.material.opacity = 0.2;
    helper.material.transparent = true;
    scene.add( helper );

    // ---------------------------------------------------------------------- //



    // Agregamos los uniforms
    var uniforms = {
        topColor: 	 { type: "c", value: new THREE.Color( "#999999" ) },
        bottomColor: { type: "c", value: new THREE.Color( "#333333" ) },
        offset:		 { type: "f", value: 200 },
        exponent:	 { type: "f", value: 0.9 }
    };
    // Creamos la geometría de la esfera
    var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );

    // Creamos el material llamando directamente al shader (antes era necesario pedirlo sincronicamente).
    var skyMat = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        vertexShader: skydome_vert,
        fragmentShader: skydome_frag,
        side: THREE.BackSide
    } );

    // Creamos el mesh
    var sky = new THREE.Mesh( skyGeo, skyMat );

    // Lo agregamos a la escena
    scene.add( sky );

    // Cube
    var geometry = new THREE.BoxGeometry(30,30,30);
    var material = new THREE.MeshNormalMaterial();
    var cube = new THREE.Mesh(geometry,material);
    scene.add(cube);

    var render = function () {
        stats.begin();
        requestAnimationFrame( render );

        cube.rotation.x += 0.02;
        cube.rotation.y += 0.02;

        renderer.render(scene, camera);

        stats.end();

    };

    render();

});