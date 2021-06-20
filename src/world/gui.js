import { GUI } from 'dat.gui'
import { LightColorGUIHelper } from './light'


export const setWorldGUI = (light) => {
    const gui = new GUI()
    const folder = gui.addFolder("Light")
    
    folder.addColor(new LightColorGUIHelper(light, 'color'), 'value').name('color');
    folder.add(light, 'intensity', 0, 2, 0.01);
    folder.add(light.target.position, 'x', -100, 100);
    folder.add(light.target.position, 'z', -100, 100);
    folder.add(light.target.position, 'y', -100, 100);
}