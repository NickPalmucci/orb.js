import getBoxMesh from './box'
import { Group } from 'three/src/objects/Group'
import { Vector3 } from 'three/src/math/Vector3';
import { setColorByScalar } from '../graph/planes/utils'
import { setBoxesGUI } from './gui'


const getBoxRow = (widthVec, heightVec, colorVec) => {
    const boxRow = new Group()

    for (let i = 0; i < heightVec.length -1; i++) {
        // right now hieght is on z axis from persepctive of the stage 
        const boxMesh = getBoxMesh(widthVec[i], widthVec[i], heightVec[i], {color: colorVec[i]})

        boxMesh.position.set(i * 16, 0, 0)

        boxRow.add(boxMesh)
    }

    return boxRow
}

export const getBoxes = (boxRows) => {
    const boxes = new Group()

    for (let i = 0; i < boxRows.length -1; i++) {
        let row = boxRows[i]
        row.position.set(0, i * 32, 0)

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

    const boxes = getBoxes(boxRows)
    setBoxesGUI(boxes)

    return boxes
}

export const updateBoxes = (boxes, propName, propValue) => {
    // boxes is a three layer scene graph with box meshes 
    // in row Group objects and rows in one top level Group object

    const rows  = boxes.children

    if (propName === "rowSpace") {
        rows.forEach((row, i) => {
            console.log("ROW!", row.position.y)
            row.position.y = i * propValue;
        })
    }

    else if (propName === "unitSpace") {
        rows.forEach((row)=> {

            row.children.forEach((box, i) => {
                box.position.x = i * propValue
            })
        })
    }

    return boxes
}

const getBoxProp = (boxes, propName) => {

    const rows  = boxes.children

    if (propName === "rowSpace") {
        // should be the same for all so get the first value
        
        const firstRowMeshY = rows[0].position.y
        const secondRowMeshY = rows[1].position.y

        return secondRowMeshY - firstRowMeshY
    }

    else if (propName === "unitSpace") {
        const firstMeshX = rows[0].children[0].position.x
        const secondMeshX = rows[0].children[1].position.x

        return secondMeshX - firstMeshX
    }

    else {
        return null
    }
}

export class BoxesGUIHelper {
    constructor(boxes, propName) {
      this.boxes = boxes;
      this.propName = propName

      this[propName] = getBoxProp(this.boxes, this.propName)
    }
  
    get value() {
      return getBoxProp(this.boxes, this.propName)
    }
  
    set value(propValue) {
        console.log("IS THIS CALLED?")
      return updateBoxes(this.boxes, this.propName, propValue)
    }
  }

