import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  Vector3,
} from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import throttle from "lodash.throttle";

class Noise {
  scene = null;
  camera = null;
  renderer = null;
  composer = null;
  counter = 0.0;
  customPass = null;

  constructor() {
    this.three();
    this.shaders();
    this.resize();
    this.render();
  }

  three() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new WebGLRenderer({
      canvas: document.querySelector("#noise"),
    });

    this.scene.add(new AmbientLight(0x666666));
    this.camera.position.y = 6;

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  shaders() {
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    // Shaders
    const vertShader = `varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix 
        * modelViewMatrix 
        * vec4( position, 1.0 );
    }`;
    const fragShader = `uniform float amount;
    uniform sampler2D tDiffuse;
    varying vec2 vUv;
  
    float random( vec2 p )
    {
      vec2 K1 = vec2(
        23.14069263277926, // e^pi (Gelfond's constant)
        2.665144142690225 // 2^sqrt(2) (Gelfondâ€“Schneider constant)
      );
      return fract( cos( dot(p,K1) ) * 12345.6789 );
    }
  
    void main() {
  
      vec4 color = texture2D( tDiffuse, vUv );
      vec2 uvRandom = vUv;
      uvRandom.y *= random(vec2(uvRandom.y,amount));
      color.rgb += random(uvRandom)*0.10;
      gl_FragColor = vec4( color  );
    }`;

    this.customPass = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        amount: { value: this.counter },
      },
      vertexShader: vertShader,
      fragmentShader: fragShader,
    });
    this.customPass.renderToScreen = true;
    this.composer.addPass(this.customPass);
  }

  resize() {
    window.addEventListener(
      "resize",
      throttle(() => {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      }, 100)
    );
  }

  render() {
    const timer = Date.now() * 0.0002;
    this.camera.position.x = Math.cos(timer) * 10;
    this.camera.position.z = Math.sin(timer) * 10;
    this.camera.lookAt(new Vector3(0, 1, 0));

    this.counter += 0.01;
    this.customPass.uniforms["amount"].value = this.counter;

    requestAnimationFrame(() => this.render());
    this.composer.render();
  }
}

export default Noise;
