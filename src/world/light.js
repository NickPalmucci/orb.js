import { DirectionalLight } from 'three/src/lights/DirectionalLight'
import { setWorldGUI } from './gui'


export default function setLight (scene) {
    const color = 0xFFFFFF;
    const intense = 1;
    const light = new DirectionalLight(color, intense);

    light.position.set(25, 10, 50);
    light.target.position.set(10, 10, 0);

    scene.add(light);
    scene.add(light.target);
  
    setWorldGUI(light)
}

export class LightColorGUIHelper {
  constructor(light, prop) {
    this.light = light;
    this.prop = prop;
  }

  get value() {
    return `#${this.light[this.prop].getHexString()}`;
  }

  set value(hexString) {
    this.light[this.prop].set(hexString);
  }
}