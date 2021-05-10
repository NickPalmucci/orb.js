import React, { Component } from "react";
import * as THREE from 'three';
import orbitControlInit from 'three-orbit-controls';

import getGraph from './graph/graph';

// import getBox from './box/box';
// import initBoxGUI from './box/gui';


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

class Render extends Component  {

    componentDidMount() {
        const renderer = getRenderer();
        document.body.appendChild(renderer.domElement);

        let [scene, camera] = getSceneAndCamera();
        camera.position.z = 20;

        const OrbitControls = orbitControlInit(THREE);
        const controls =  new OrbitControls(camera, renderer.domElement);

        let graph = getGraph([[1,2,5,6], [2,2,4,6,8,4], [2,4,7,7]])

        scene.add(graph);

        renderer.setAnimationLoop( () => {

            renderer.render( scene, camera );

        } );

    }


    render () {
        return (<div/>)
    }
}

export default Render;
