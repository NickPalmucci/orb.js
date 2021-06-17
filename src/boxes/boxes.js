import getBoxMesh from './box'
import { Group } from 'three/src/objects/Group'
import { setColorByScalar } from '../planes/utils'

const getBoxRow = (widthVec, heightVec, colorVec) => {
    const boxRow = new Group()

    for (let i = 0; i < heightVec.length -1; i++) {
        const boxMesh = getBoxMesh(widthVec[i], heightVec[i], widthVec[i], {color: colorVec[i]})

        boxMesh.position.set(i*16, 0, 0)

        boxRow.add(boxMesh)
    }

    return boxRow
}

export const getBoxes = (boxRows) => {
    const boxes = new Group()

    for (let i = 0; i < boxRows.length -1; i++) {
        let row = boxRows[i]
        row.position.set(0, i*16, 0)

        boxes.add(row)
    }

    return boxes
}

export const getBoxesWithTestData = (data) => {
    const boxRows = []
   
    data.forEach((dataRow)=>{
        let widthVec = []
        let heightVec = []

        widthVec = (dataRow.map((obj)=>{return obj.scalarArea})) 
        heightVec = (dataRow.map((obj)=>{return obj.scalarHeight}))

        setColorByScalar(dataRow, "scalarHeight")
        let colorVec = (dataRow.map((obj)=>{return obj.color}))

       const row = getBoxRow(widthVec, heightVec, colorVec)
       
       boxRows.push(row)
    })

    return getBoxes(boxRows)
}