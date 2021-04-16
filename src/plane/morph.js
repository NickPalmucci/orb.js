import { Float32BufferAttribute } from 'three/src/core/BufferAttribute';


export const setMorph = (geometry, config) => {

  const position = geometry.attributes.position;

  let newPositionArray = Array.from(position.array);
  newPositionArray[14] = 8;

  const newPositions = new Float32BufferAttribute(newPositionArray, 3);

  geometry.morphAttributes.position = [];
  geometry.morphAttributes.position[0] = newPositions;
};

// export const setMorphWithValue = (mesh, value) => {
//
//     const position = mesh.geometry.attributes.position;
//
//     let newPositionArray = position.array;
//     newPositionArray[14] = value;
//
//     const newPositions = new Float32BufferAttribute(newPositionArray, 3);
//
//     mesh.geometry.setAttribute('position', newPositions)
//
// };