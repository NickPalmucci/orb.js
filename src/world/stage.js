import { PlaneBufferGeometry } from 'three/src/geometries/PlaneBufferGeometry.js';
import { MeshPhongMaterial } from 'three/src/materials/MeshPhongMaterial';
import { Mesh } from 'three/src/objects/Mesh.js';
import { Vector3 } from 'three/src/math/Vector3';
import { Box3 } from 'three/src/math/Box3';


const getGroundDimensions = (dataArray) => {
   let baseHeight = dataArray.length // Y axis 
   let baseWidth = 0

   for (let i=0; i <= dataArray.length - 1; i++) {
       const rowLen = dataArray[i].length
       if (rowLen > baseWidth) {
           baseWidth = rowLen
       }
   }

   // one graph square is 16 unit per side
   // need to add squres for spacer rows


   let heightWithSpacers = (baseHeight * 16) + ( (baseHeight - 1) * 16 )
   let graphArea = ( (baseWidth * 16) * heightWithSpacers ) 
   let scaleFactor = Math.sqrt((graphArea * 1.5) / graphArea)  // scale ground to 1.5 size of graph area 

   let groundHeight = heightWithSpacers * scaleFactor
   let groundWith = (baseWidth * 16) * scaleFactor

   let larger = groundHeight >= groundWith ? groundHeight  : groundWith

   return [larger, larger]
}

// to build world we need three planes lined up as an open cube (stage)
// place graph in the center scaled to be within the stage and light as sun from a point in the sky

export default function getStage(scene, dataArray, graph) {

    let [groundHeight, groundWidth] = getGroundDimensions(dataArray)

    let coordiantes = [
        [groundHeight, groundWidth],
        [groundHeight, groundWidth/2 ],
        [groundHeight/2, groundWidth]
    ]

    const planes = coordiantes.map((tuple) => { return getStagePlane(tuple[0], tuple[1]) })

    planes.forEach((plane)=>{scene.add(plane)})

    planes[1].position.set(-groundWidth/2, 0, groundWidth/4)
    planes[1].rotation.y = Math.PI * 0.5;

    planes[2].position.set(0, groundHeight/2, groundHeight/4);
    planes[2].rotation.x = Math.PI * 0.5;

    planes[0].add(graph)

    const graphCenter = getCenterVec(graph)
    const stageCenter = getCenterVec(planes[0])
    const centerDiff = getCenterDistances(stageCenter, graphCenter)

    graph.position.set(centerDiff.x, centerDiff.y, 10)
  
    return planes
}

const getCenterVec = (object) => {
    const boundingBox = new Box3().setFromObject(object)
    const center = boundingBox.getCenter(new Vector3())

    return center
}

const getCenterDistances = (stageCenter, graphCenter) => {
    const x = stageCenter.x - graphCenter.x
    const y = stageCenter.y - graphCenter.y
    const distanceVec = new Vector3(x, y, 0)

    return distanceVec
}

const getStagePlane = (height, width) => {
    const planeGeo = new PlaneBufferGeometry(width, height, 2, 2);
    const planeMat = new MeshPhongMaterial({
        color: '#b1b1b1',
        emissive: '#b1b1b1',
        side: 2 // DoubleSide
    });

    const mesh = new Mesh(planeGeo, planeMat);

    return mesh
}
