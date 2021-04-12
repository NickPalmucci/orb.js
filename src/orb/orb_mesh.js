import {CylinderBufferGeometry} from 'three/src/geometries/CylinderBufferGeometry.js';
import {Vector3} from 'three/src/math/Vector3';
import {Uint16BufferAttribute, Float32BufferAttribute} from 'three/src/core/BufferAttribute';
import {SkeletonHelper} from 'three/src/helpers/SkeletonHelper.js';
import {SkinnedMesh} from 'three/src/objects/SkinnedMesh.js';
import {MeshStandardMaterial} from 'three/src/materials/MeshStandardMaterial.js';
import getOrbSkeletonAndBones from './orb_skeleton';

export default (sizing) => {
    const geometry = createGeometry(sizing);

    const [skeleton, bonesArray] = getOrbSkeletonAndBones(sizing);

    const material = new MeshStandardMaterial( {
        skinning: true,
        color: 0x2194ce,
        emissive: 0x2194ce,
        flatShading: true,
        wireframe: true
    } );

    const mesh = new SkinnedMesh(geometry, material);

    mesh.add(bonesArray[0]);
    mesh.bind(skeleton);

    const helper = new SkeletonHelper(mesh);
    helper.material.linewidth = 16;

    return [mesh, helper]
}

function createGeometry( sizing ) {

    const geometry = new CylinderBufferGeometry(
        1, // radiusTop
        1, // radiusBottom
        sizing.height, // height
        10, // radiusSegments
        sizing.segmentCount, // heightSegments
        true // openEnded
    );

    const position = geometry.attributes.position;

    const skinIndices = [];
    const skinWeights = [];
    const vertex = new Vector3();

    for (let i = 0; i < position.count; i++) {

        // position starts from the top of object
        // y coordinate drops by amount of segHeight after (radiusSegment + 1) iterations
        // there are (radiusSegment + 1) * (segmentCount + 1) iterations

        vertex.fromBufferAttribute(position, i);

        const y = ( vertex.y + sizing.halfHeight );

        const skinIndex = Math.floor(y / sizing.segmentHeight);
        const skinWeight = 1;

        // console.log(`iteration: ${i}
        // vertex y: ${vertex.y} x: ${vertex.x} z: ${vertex.z}
        // halfHeight ${sizing.halfHeight}
        // segHeight ${sizing.segmentHeight}
        // y: ${y}
        // skinIndex: ${skinIndex} skinWeight: ${skinWeight}`);

        skinIndices.push(skinIndex, 0, 0, 0);
        skinWeights.push(1, 0, 0, 0);

    }

    geometry.setAttribute('skinIndex', new Uint16BufferAttribute(skinIndices, 4));
    geometry.setAttribute('skinWeight', new Float32BufferAttribute(skinWeights, 4));

    return geometry;
}