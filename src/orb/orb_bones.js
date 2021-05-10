import {Bone} from 'three/src/objects/Bone.js';

export default ( sizing ) => {

    const bones = [];
    let rootBone = new Bone();

    bones.push(rootBone);

    // this sets rootBone to bottom y coordinate of Object3D
    rootBone.position.y = -sizing.halfHeight;

    let prevBone = rootBone;

    for (let i = 0; i < sizing.segmentCount; i++) {

        const bone = new Bone();
        bone.position.y = sizing.segmentHeight;
        bones.push(bone);

        prevBone.add(bone);
        prevBone = bone;
    }

    return bones;
}