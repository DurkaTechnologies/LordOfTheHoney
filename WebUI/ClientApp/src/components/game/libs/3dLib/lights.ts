import * as THREE from "three";
import { ColorRepresentation } from "three";

class LightSettings {
    public color?: ColorRepresentation = 0xFFFFFF;
    public intensity?: number = 1;
    public distance?: number = 0;
    public decay?: number = 2;
    public power?: number = 200;

    constructor(color?: ColorRepresentation, intensity?: number, distance?: number, decay?: number, power?: number) {
        this.color = color;
        this.intensity = intensity;
        this.distance = distance;
        this.decay = decay;
        this.power = power;
    }
}

class SpotLightSettings extends LightSettings {
    public angle?: number = 60;
    public penumbra?: number = 0;

    constructor(color?: ColorRepresentation, intensity?: number, distance?: number,
        angle?: number, penumbra?: number, decay?: number){
        super(color, intensity, distance, decay);

        this.angle = angle;
        this.penumbra = penumbra;
    }
}

class HemisphereLightSettings {

    public skyColor?: ColorRepresentation;
    public groundColor?: ColorRepresentation;
    public intensity?: number;

    constructor(skyColor?: ColorRepresentation, groundColor?: ColorRepresentation, intensity?: number) {
        this.skyColor = skyColor;
        this.groundColor = groundColor;
        this.intensity = intensity;
    }
}

class Lights {
    static AddDirectionalLight(lightSettings: LightSettings, vector: THREE.Vector3, scene: THREE.Scene) {
        const light = new THREE.DirectionalLight(lightSettings.color, lightSettings.intensity);
        light.position.set(vector.x, vector.y, vector.z);
        scene.add(light);
    }

    static AddAmbientLight(lightSettings: LightSettings, vector: THREE.Vector3, scene: THREE.Scene) {
        const light = new THREE.AmbientLight(lightSettings.color, lightSettings.intensity);
        light.position.set(vector.x, vector.y, vector.z);
        scene.add(light);
    }

    static AddPointLight(lightSettings: LightSettings, vector: THREE.Vector3, scene: THREE.Scene) {
        const light = new THREE.PointLight(
            lightSettings.color, 
            lightSettings.intensity, 
            lightSettings.distance, 
            lightSettings.decay
        );

        if (lightSettings.power !== undefined)
            light.power = lightSettings.power;

        light.position.set(vector.x, vector.y, vector.z);
        scene.add(light);
    }

    static AddSpotLight(spotLightSettings: SpotLightSettings, vector: THREE.Vector3, scene: THREE.Scene) {
        const light = new THREE.SpotLight(
            spotLightSettings.color, 
            spotLightSettings.intensity, 
            spotLightSettings.distance, 
            spotLightSettings.angle, 
            spotLightSettings.penumbra, 
            spotLightSettings.decay
        );

        if (spotLightSettings.power !== undefined)
            light.power = spotLightSettings.power;

        light.position.set(vector.x, vector.y, vector.z);
        scene.add(light);
    }

    static AddRectAreaLight(lightSettings: LightSettings, vector: THREE.Vector3, size: THREE.Vector2, scene: THREE.Scene) {
        const light = new THREE.RectAreaLight(
            lightSettings.color, 
            lightSettings.intensity, 
            size.width,
            size.height
        );

        light.position.set(vector.x, vector.y, vector.z);
        scene.add(light);
    }

    static AddHemisphereLight(hemisphereLightSettings: HemisphereLightSettings, vector: THREE.Vector3, scene: THREE.Scene) {
        const light = new THREE.HemisphereLight(hemisphereLightSettings.skyColor, 
            hemisphereLightSettings.groundColor, hemisphereLightSettings.intensity);
        light.position.set(vector.x, vector.y, vector.z);
        scene.add(light);
    }
}
