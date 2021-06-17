import { DirectionalLight } from 'three/src/lights/DirectionalLight'
import { GUI } from 'dat.gui'


export default function setLight (scene) {
    const color = 0xFFFFFF;
    const intense = 1;
    const light = new DirectionalLight(color, intense);
    light.position.set(25, 10, 50);
    light.target.position.set(10, 10, 0);
    scene.add(light);
    scene.add(light.target);

    class ColorGUIHelper {
        constructor(object, prop) {
          this.object = object;
          this.prop = prop;
        }
        get value() {
          return `#${this.object[this.prop].getHexString()}`;
        }
        set value(hexString) {
          this.object[this.prop].set(hexString);
        }
      }

    const gui = new GUI();
    gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
    gui.add(light, 'intensity', 0, 2, 0.01);
    gui.add(light.target.position, 'x', -100, 100);
    gui.add(light.target.position, 'z', -100, 100);
    gui.add(light.target.position, 'y', -100, 100);
}