import React, { Component } from "react";
import * as THREE from 'three';
import getOrbMesh from './orb_mesh';

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

function getSizing() {
    const segmentHeight = 6;
    const segmentCount = 4;
    const height = segmentHeight * segmentCount;
    const halfHeight = height * 0.5;

    const sizing = {
        segmentHeight: segmentHeight,
        segmentCount: segmentCount,
        height: height,
        halfHeight: halfHeight

    };

    return sizing
}

function getConfig () {
    const bones = 5;
    const segmentHeight = 10;
    const segmentCount = 5;

}

function setTriangleFrame(orbMesh, counter) {
    const degree = 0.017;

    console.log("CALLED", orbMesh.skeleton.bones[1].rotation.z, orbMesh.skeleton.bones[2].rotation.z, orbMesh.skeleton.bones[3].rotation.z);

    let left = orbMesh.skeleton.bones[3].rotation.z;


    if (counter == 120) {
        counter  = 0;
        return counter
    }

    if (counter < 60) {
        orbMesh.skeleton.bones[1].rotation.z += degree;
        orbMesh.skeleton.bones[3].rotation.z += degree;

        // center
        orbMesh.skeleton.bones[2].rotation.z -= degree * 2;

        counter ++
    }

    else if (counter >= 60 && counter < 120) {
        orbMesh.skeleton.bones[1].rotation.z -= degree;
        orbMesh.skeleton.bones[3].rotation.z -= degree;

        // center
        orbMesh.skeleton.bones[2].rotation.z += degree * 2;

        counter ++
    }


    return counter
}


class App extends Component  {

    componentDidMount() {
        const renderer = getRenderer();
        document.body.appendChild(renderer.domElement);

        let [scene, camera] = getSceneAndCamera();
        camera.position.z = 20;

        let sizing = getSizing();

        let [orbMesh, helper] = getOrbMesh(sizing);

        // orbMesh.skeleton.bones[1].rotation.z = 3.1415 * 2 / 6;
        // orbMesh.skeleton.bones[2].rotation.z = - 3.1415 * 4 / 6;
        // orbMesh.skeleton.bones[3].rotation.z =  3.1415 * 2 / 6;

        // orbMesh.rotation.z = Math.PI / 2;

        let counter = 0;


        scene.add(orbMesh);
        scene.add(helper);


        renderer.render(scene, camera);

        const main = () => {
            requestAnimationFrame(main);
            
            let newCounter = setTriangleFrame(orbMesh, counter);
            counter = newCounter;

            renderer.render(scene, camera);
        };

        main();

    }


    render () {
        return (<div/>)
    }
}

export default App;
