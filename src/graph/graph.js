import { Group } from 'three/src/objects/Group';
import getPlanes from './planes/planes';

export default function getGraph(rows) {
    const normalizedInputArray = addSpacersAndNormailize(rows)
    
    let graph = new Group()

    for (let i=0; i < normalizedInputArray.length -1; i++) {
        const graphRow = getPlanes(normalizedInputArray[i])

        graphRow.position.set(0, i*16, 0)

        graph.add(graphRow)
    }

    return graph
}

const addSpacersAndNormailize = (rows) => {
    // get max array length
    // normalize 2D arrays to add 0 rows as spacers and 0 at end of arrays to make them all the same length

    let maxLength = 0

    rows.forEach((row) => {
        if (row.length >= maxLength) {
            maxLength = row.length
        }
    });

    const spacerRow = getZeroArray(maxLength)

    let normalizedGraph = []

    rows.forEach((row, i) => {
        const newRow = normalizeLength(row, maxLength)

        if (i === rows.length -1) {
            normalizedGraph.push(newRow)

        } else {
            normalizedGraph.push(newRow, spacerRow)
        }
    })

    return normalizedGraph
}

const normalizeLength = (row, maxLength) => {
    const diff = maxLength - row.length

    return row.concat(getZeroArray(diff))
}


const getZeroArray = (length) => {
    // https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n

    return Array.from({length: length}, (_, i) => { return {scalarHeight: 0, scalarArea: 0} } ); 
}
