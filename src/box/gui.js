import { GUI } from 'dat.gui';

export default (mesh) => {

    // Set up dat.GUI to control targets
    const params = {
        Spherify: 0,
        Twist: 0,
    };
    const gui = new GUI();
    const folder = gui.addFolder( 'Morph Targets' );

    folder.add( params, 'Spherify', 0, 1 ).step( 0.01 ).onChange( function ( value ) {

        console.log("BOX MESH", mesh)

        mesh.morphTargetInfluences[ 0 ] = value;

    } );
    folder.add( params, 'Twist', 0, 1 ).step( 0.01 ).onChange( function ( value ) {

        console.log("BOX MESH", mesh)

        mesh.morphTargetInfluences[ 1 ] = value;

    } );

    folder.open();

}
