import { Group } from 'three/src/objects/Group';
import getPlane from '../plane/plane';
import { setColorByScalar } from './utils'

// import initPlaneGUI from '../plane/gui'

export default function getPlanes (row) {
    const planes = new Group()

    // the mutabiility of row here is shady
    setColorByScalar(row, "scalarHeight")

    for (let i = 0; i <= row.length - 1; i++) {
        const plane = getPlane(row[i])

        // hardcoded width set in plane.js
        plane.position.set(i*16, 0, 0)

        planes.add(plane)
    }

    return planes
}