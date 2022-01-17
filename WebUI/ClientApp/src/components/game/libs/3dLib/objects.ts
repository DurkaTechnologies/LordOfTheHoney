import * as THREE from "three";

export class Generator {
    

    static Plane(scene: THREE.Scene, wigth: number = 40, lenght: number = 40) {
            const planeWidth = wigth;
            const planeLenght = lenght;
        
            const loader = new THREE.TextureLoader();
            const texture = loader.load('https://threejs.org/manual/examples/resources/images/checker.png');
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.magFilter = THREE.NearestFilter;
            const repeatsWidth = planeWidth / 2;
            const repeatsLenght = planeLenght / 2;
            texture.repeat.set(repeatsWidth, repeatsLenght);
        
            const planeGeo = new THREE.PlaneGeometry(repeatsWidth, repeatsLenght);
            const planeMat = new THREE.MeshPhongMaterial({
              map: texture,
              side: THREE.DoubleSide,
            });
            const mesh = new THREE.Mesh(planeGeo, planeMat);
            mesh.rotation.x = Math.PI * -.5;
            scene.add(mesh);
    }
    
}   
