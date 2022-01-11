import * as THREE from "three";
import { ColorRepresentation, NumberKeyframeTrack } from "three";

export class LightSettings {
    public color?: ColorRepresentation;
    public intensity?: number;
    public distance?: number;
    public decay?: number;
    public power?: number;

    constructor(color: ColorRepresentation = 0xFFFFFF, intensity: number = 1, distance: number = 0, decay: number = 2, power: number = 2000) {
        this.color = color;
        this.intensity = intensity;
        this.distance = distance;
        this.decay = decay;
        this.power = power;
    }
}

export class SpotLightSettings extends LightSettings {
    public angle?: number;
    public penumbra?: number;

    constructor(color: ColorRepresentation = 0xFFFFFF, intensity: number = 1, distance: number = 5,
        angle: number = 15, penumbra: number = 0, decay: number = 2, power?: number){
        super(color, intensity, distance, decay, power);

        this.angle = angle;
        this.penumbra = penumbra;
    }
}

export class HemisphereLightSettings {

    public skyColor?: ColorRepresentation;
    public groundColor?: ColorRepresentation;
    public intensity?: number;

    constructor(skyColor?: ColorRepresentation, groundColor?: ColorRepresentation, intensity?: number) {
        this.skyColor = skyColor;
        this.groundColor = groundColor;
        this.intensity = intensity;
    }
}

export class Lights {
    static AddDirectionalLight(lightSettings: LightSettings, vector: THREE.Vector3, scene: THREE.Scene) {
        const light = new THREE.DirectionalLight(lightSettings.color, lightSettings.intensity);
        light.position.set(vector.x, vector.y, vector.z);
        scene.add(light);

        return light;
    }

    static AddAmbientLight(lightSettings: LightSettings, vector?: THREE.Vector3, scene?: THREE.Scene) {
        const light = new THREE.AmbientLight(lightSettings.color, lightSettings.intensity);

        if (vector != null)
            light.position.set(vector.x, vector.y, vector.z);
        if (scene != null)
            scene.add(light);

        return light;
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

        return light;
    }

    static AddSpotLight(spotLightSettings: SpotLightSettings, vector: THREE.Vector3, scene: THREE.Scene) {
        const light = new THREE.SpotLight(
            spotLightSettings.color, 
            spotLightSettings.intensity, 
            spotLightSettings.distance, 
            spotLightSettings.angle, 
            spotLightSettings.penumbra, 
        );

        if (spotLightSettings.power !== undefined)
            light.power = spotLightSettings.power;

        light.position.set(vector.x, vector.y, vector.z);
        scene.add(light);

        return light;
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

        return light;
    }

    static AddHemisphereLight(hemisphereLightSettings: HemisphereLightSettings, vector: THREE.Vector3, scene: THREE.Scene) {
        const light = new THREE.HemisphereLight(hemisphereLightSettings.skyColor, 
            hemisphereLightSettings.groundColor, hemisphereLightSettings.intensity);
        light.position.set(vector.x, vector.y, vector.z);
        scene.add(light);

        return light;
    }
}
