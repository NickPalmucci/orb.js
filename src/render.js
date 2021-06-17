import React, { Component } from "react"
import * as THREE from 'three'
import orbitControlInit from 'three-orbit-controls'

import getGraph from './graph/graph'
import {getBoxesWithTestData} from './boxes/boxes'

import setStage from './world/stage'
import setLight from './world/light'


function getSceneAndCamera() {
    const scene = new THREE.Scene();

    const fov = 45;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(25, 0, 75);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);
    
    // const camera = new THREE.PerspectiveCamera(50, 500 / 400, 0.1, 1000);

    return [scene, camera]
}

function getRenderer() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 800);

    return renderer
}

function getRandomValue(maxValue) {
    return Math.ceil(Math.random() * maxValue)
}

function getTestData() {
    const data = []
    const numRows = getRandomValue(10)

    for (let i = 0; i < numRows-1; i++) {
        const row = []
        const rowLen = getRandomValue(10)

        for (let i = 0; i < rowLen - 1; i++) {
            const item = { scalarHeight: getRandomValue(20), scalarArea: getRandomValue(16) }
            row.push(item)
        }
        data.push(row)
    }
    return data
}

class Render extends Component  {

    componentDidMount() {
        const renderer = getRenderer();
        document.body.appendChild(renderer.domElement);

        let [scene, camera] = getSceneAndCamera();

        const OrbitControls = orbitControlInit(THREE);
        const controls = new OrbitControls(camera, renderer.domElement);

        const testData = getTestData();

        // let graph = getGraph(testData)
        // scene.add(graph);

        let boxes = getBoxesWithTestData(testData)
        
        setStage(scene, testData, boxes)
        setLight(scene)
        
        renderer.setAnimationLoop( () => {

            renderer.render( scene, camera );

        } );

    }


    render () {
        return (<div/>)
    }
}

export default Render;
