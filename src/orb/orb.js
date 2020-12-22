import React, { Component } from "react";
import * as THREE from 'three';

function getGeometry() {
    const geometry = new THREE.SphereGeometry(3, 30, 30, 0, Math.PI * 2, 0, Math.PI * 2);
    const material = new THREE.MeshNormalMaterial({flatShading: true});

    return new THREE.Mesh(geometry, material);
}

function getSceneAndCamera() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 500 / 400, 0.1, 1000);

    return [scene, camera]
}


function getRenderer() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(500, 400);

    return renderer
}

class App extends Component  {

    componentDidMount() {
        const renderer = getRenderer();
        document.body.appendChild(renderer.domElement);

        let [scene, camera] = getSceneAndCamera();
        camera.position.z = 10;

        let cube = getGeometry();
        scene.add(cube);


        const main = () => {
            requestAnimationFrame(main);
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);
        };


        main();
    }


    render () {
        return (<div/>)
    }
}

export default App;
