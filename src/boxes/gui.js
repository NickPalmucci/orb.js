import { GUI } from 'dat.gui'
import { updateBoxes, BoxesGUIHelper } from './boxes'

export const setBoxesGUI = (boxes) => {
    const gui = new GUI()
    const folder = gui.addFolder("Boxes")

    const handleRowSpace = (param) => {
        updateBoxes(boxes, "rowSpace", param)
    }

    const handleUnitSpace = (param) => {
        updateBoxes(boxes, "unitSpace", param)
    }

    const rowObject = new BoxesGUIHelper(boxes, "rowSpace")
    const rowCont = folder.add(rowObject, "rowSpace", 32, 64)
    const unitCont = folder.add(new BoxesGUIHelper(boxes, "unitSpace"), "unitSpace", 16, 32) 

    rowCont.onChange(handleRowSpace)
    unitCont.onChange(handleUnitSpace)
}

