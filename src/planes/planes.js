import { Group } from 'three/src/objects/Group';
import getPlane from '../plane/plane';

// import initPlaneGUI from '../plane/gui'

export default function getPlanes (row) {
    const planes = new Group()

    for (let i = 0; i <= row.length - 1; i++) {
        const plane = getPlane({scalarHeight: row[i]})

        // hardcoded width set in plane.js
        plane.position.set(i*2, 0, 0)

        planes.add(plane)
    }

    return planes
}