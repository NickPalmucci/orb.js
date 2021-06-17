import { BoxBufferGeometry } from 'three/src/geometries/BoxBufferGeometry'
import { MeshPhongMaterial } from 'three/src/materials/MeshPhongMaterial.js'
import { Mesh } from 'three/src/objects/Mesh.js'

export default function getBoxMesh(width, height, depth, options) {

    const geometry = new BoxBufferGeometry(
        width,
        height,
        depth,
        2,
        2
    );

    const material = new MeshPhongMaterial( {
        color: options.color || 0x2194ce,
    } );

    const mesh = new Mesh(geometry, material);

    return mesh
}
