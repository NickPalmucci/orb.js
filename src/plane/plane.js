import { PlaneBufferGeometry } from 'three/src/geometries/PlaneBufferGeometry.js';
import { MeshStandardMaterial } from 'three/src/materials/MeshStandardMaterial.js';
import { Mesh } from 'three/src/objects/Mesh.js';

import { setMorph } from './morph'


const getPlaneConfig = (options) => {
    const config = {
        width: options.width || 2,
        height: options.height || 2,
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

    const material = new MeshStandardMaterial( {
        color: 0x2194ce,
        emissive: 0x2194ce,
        flatShading: false,
        wireframe: true,
        morphTargets: true
    } );

    const mesh = new Mesh(geometry, material);

    // set morph to max for scalarHeight representation
    // animate this at some point 
    mesh.morphTargetInfluences[ 0 ] = 1;

    return mesh
};