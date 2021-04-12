import {Skeleton} from 'three/src/objects/Skeleton.js';
import getBonesArray from './orb_bones';

export default (sizing) => {
    const bones = getBonesArray(sizing);
    const orbSkeleton  = new Skeleton(bones);

    return [orbSkeleton, bones]
}
