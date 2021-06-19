import { Float32BufferAttribute } from 'three/src/core/BufferAttribute';


export const setMorph = (geometry, options) => {

  const position = geometry.attributes.position;

  let newPositionArray = Array.from(position.array);

  // hardcoded vertex based on 2 heightSegments and 2 widthSegments
  newPositionArray[14] = options.scalarHeight;

  const newPositions = new Float32BufferAttribute(newPositionArray, 3);

  geometry.morphAttributes.position = [];
  geometry.morphAttributes.position[0] = newPositions;
};
