import { PlaneBufferGeometry } from 'three/src/geometries/PlaneBufferGeometry.js';
import { MeshStandardMaterial } from 'three/src/materials/MeshStandardMaterial.js';
import { Mesh } from 'three/src/objects/Mesh.js';

import { setMorph } from './morph'


const getPlaneConfig = () => {
    const config = {
        width: 8,
        height: 8,
        widthSegments: 2,
        heightSegments: 2,
    };

    return config
};

export default () => {

    const config = getPlaneConfig();

    const geometry = new PlaneBufferGeometry(
        config.width,
        config.height,
        config.widthSegments,
        config.heightSegments
    );

    setMorph(geometry, config);

    const material = new MeshStandardMaterial( {
        color: 0x2194ce,
        emissive: 0x2194ce,
        flatShading: true,
        wireframe: true,
        morphTargets: true
    } );

    const mesh = new Mesh(geometry, material);

    return mesh
};