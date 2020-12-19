import React, { Component } from "react";
import * as THREE from 'three';

function one() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 500 / 400, 0.1, 1000);
    const geometry = new THREE.SphereGeometry(3, 30, 30, 0, Math.PI * 2, 0, Math.PI * 2);
    const material = new THREE.MeshNormalMaterial({flatShading: true});
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    return [scene, camera, cube]
}

function two() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(500, 400);

    return renderer
}

class App extends Component  {

    componentDidMount() {
        const renderer = two();
        document.body.appendChild(renderer.domElement);

        let [scene, camera, cube] = one();

        camera.position.z = 10;


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
