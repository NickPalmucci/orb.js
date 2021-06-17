import { PlaneBufferGeometry } from 'three/src/geometries/PlaneBufferGeometry.js';
import { MeshPhongMaterial } from 'three/src/materials/MeshPhongMaterial.js';
import { Mesh } from 'three/src/objects/Mesh.js';
import * as THREE from 'three';

import { setMorph } from './morph'

const getPlaneConfig = (options) => {
    const config = {
        width: options.scalarArea || 16,
        height: options.scalarArea || 16,
        widthSegments: 2,
        heightSegments: 2,
    };

    return config
};

export default function getPlane (options) {

    const config = getPlaneConfig(options);

    const geometry = new PlaneBufferGeometry(
        config.width,
        config.height,
        config.widthSegments,
        config.heightSegments
    );

    setMorph(geometry, options);

    const isVisible = true

    const material = new MeshPhongMaterial( {
        color: options.color || 0x2194ce,
        side: 2, // DoubleSide
        // emissive: options.color || 0x2194ce,
        wireframe: options.wireframe || false,
        morphTargets: true,
        transparent: true,
        opacity: 1,
        visible: isVisible,
        polygonOffset: true,
        polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1
    } );

    const mesh = new Mesh(geometry, material);

    const geo = new PlaneBufferGeometry(
        config.width,
        config.height,
        config.widthSegments,
        config.heightSegments
    );

    setMorph(geo, options);

    const mat = new THREE.LineBasicMaterial( { color: '#cdc9c9', morphTargets: true } );
    const wireframe = new THREE.LineSegments( geo, mat );
    mesh.add( wireframe );

    // set morph to max for scalarHeight representation
    // animate this at some point 
    mesh.morphTargetInfluences[ 0 ] = 1;
    wireframe.morphTargetInfluences[ 0 ] = 1;

    return mesh
};