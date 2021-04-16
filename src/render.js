import React, { Component } from "react";
import * as THREE from 'three';
import orbitControlInit from 'three-orbit-controls';

import getPlane from './plane/plane'
import initPlaneGUI from './plane/gui'

import getBox from './box/box';
import initBoxGUI from './box/gui';


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

        let Mesh = getPlane();

        scene.add(Mesh);

        initPlaneGUI(Mesh);

        renderer.setAnimationLoop( () => {

            renderer.render( scene, camera );

        } );

    }


    render () {
        return (<div/>)
    }
}

export default Render;
