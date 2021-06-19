import { GUI } from 'dat.gui';
import { setMorphWithValue } from './morph'

export default function initGui (mesh)  {

    const params = {
        Increase: 0,
    };
    const gui = new GUI();
    const folder = gui.addFolder( 'Morph Targets' );

    folder.add( params, 'Increase', 0, 1 ).step( 0.01 ).onChange( ( value ) => {

        if (mesh !== undefined) {

            mesh.morphTargetInfluences[ 0 ] = value;

        }

    } );

    folder.open();

}