<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>vicri object viewer</title>
    <script src="three.js"></script>

    <script src="js/loaders/ColladaLoader.js"></script>
    <script src="js/Detector.js"></script>
    <script src="js/libs/stats.min.js"></script>
    <script src="js/controls/OrbitControls.js"></script>
    <style>
        body {
            background:#777;
            padding:0;
            margin:0;
            overflow:hidden;
        }

        #info {
            position: absolute;
            top: 0px;
            width: 100%;
            color: #ffffff;
            padding: 5px;
            font-family:Monospace;
            font-size:13px;
            text-align:center;
        }

        a {
            color: #ffffff;
        }
    </style>
</head>

<body>

    <div id="container"></div>
    <div id="info">
        Cet objet 3D a été créé par le groupe vicri
    </div>

    <script>

        
        if (!Detector.webgl) Detector.addGetWebGLMessage();
        
        var container, stats, clock;
        var camera, scene, renderer, object;
        
        init();
        animate();
        
        function init() {
            
            container = document.getElementById('container');
            
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
            camera.position.set(8, 10, 8);
            camera.lookAt(new THREE.Vector3(0, 3, 0));
            
            var controls = new THREE.OrbitControls( camera );
            
            scene = new THREE.Scene();

            clock = new THREE.Clock();

            // loading manager

            var loadingManager = new THREE.LoadingManager(function () {

                scene.add(object);

            });

            // collada

            var loader = new THREE.ColladaLoader(loadingManager);
            loader.load('<?= (isset($_GET["model"]) ? $_GET["model"] : "") ?>', function (collada) {

                object = collada.scene;

            });

            //

            var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
            scene.add(ambientLight);

            var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(1, 1, 0).normalize();
            scene.add(directionalLight);

            //

            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);

            //

            stats = new Stats();
            container.appendChild(stats.dom);

            //

            window.addEventListener('resize', onWindowResize, false);

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);

        }

        function animate() {

            requestAnimationFrame(animate);

            render();
            stats.update();

        }

        function render() {

            var delta = clock.getDelta();

            renderer.render(scene, camera);

        }

    </script>
</body>

</html>