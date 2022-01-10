import * as THREE from "three";

class GeometrySettings {
    width?: number;
    height?: number;
    depth?: number;
    widthSegments?: number;
    heightSegments?: number;
    depthSegments?: number;

    constructor(width?: number, height?: number, depth?: number,
        widthSegments?: number, heightSegments?: number, depthSegments?: number) {
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.widthSegments = widthSegments;
        this.heightSegments = heightSegments;
        this.depthSegments = depthSegments;
    }
}

class CubeSettings extends GeometrySettings {
    constructor(size?: number, widthSegments?: number, 
        heightSegments?: number, depthSegments?: number) {
        super(size, size, size, widthSegments, heightSegments, depthSegments)
    }
}

class Primitives {
    static CreateBoxGeometry(geometrySettings: GeometrySettings) {
        const geometry = new THREE.BoxGeometry(
            geometrySettings.width, 
            geometrySettings.height, 
            geometrySettings.depth, 
            geometrySettings.widthSegments, 
            geometrySettings.heightSegments, 
            geometrySettings.depthSegments
        );

        return geometry;
    }

    static CreateCubeGeometry(cubeSettings: CubeSettings) {
        const geometry = new THREE.BoxGeometry(
            cubeSettings.width, 
            cubeSettings.height, 
            cubeSettings.depth, 
            cubeSettings.widthSegments, 
            cubeSettings.heightSegments, 
            cubeSettings.depthSegments
        );

        return geometry;
    }

    static CreatePlaneGeometry(geometrySettings: GeometrySettings) {
        const geometry = new THREE.PlaneGeometry(
            geometrySettings.width, 
            geometrySettings.height, 
            geometrySettings.widthSegments, 
            geometrySettings.heightSegments, 
        );

        return geometry;
    }
}
