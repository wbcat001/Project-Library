import React, {Suspense, useState, useRef, useTransition, useDeferredValue} from "react";
import {Canvas, useFrame, ThreeElements} from "@react-three/fiber";
import {Box, Grid, TextField, Button} from "@mui/material";
import * as THREE from 'three';
import {useControls} from "leva"
import { AccumulativeShadows, RandomizedLight, Center, Environment, OrbitControls, useGLTF} from "@react-three/drei"
import { Vector3 } from 'three';
import tunnel from 'tunnel-rat'

import {BookResponse} from "../models/Book";


const status = tunnel()


type PresetType = 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park' | 'lobby';

// 

interface LibraryProps{
    books: BookResponse[],
}

interface ModelProps {
    url: string;
    position?: [number, number, number];
}


const useHoverClick = () => {
    const ref = useRef<THREE.Mesh>(null!);
    const [hovered, setHover] = useState(false)
    const [clicked, setClick] = useState(false)

    useFrame((state, delta) => ref.current.rotation.x += delta)

    const events = {
        onClick: () => setClick(!clicked),
        onPointerOver: () => setHover(true),
        onPointerOut: () => setHover(false),
    }

    return {ref, hovered, clicked, events};
}

function Model({url, ...props}:ModelProps) {
    console.log(url);
    
    const deferred = useDeferredValue(url)
    // useGLTF.clear(deferred);
    const {scene} = useGLTF(deferred) as unknown as { scene: THREE.Group }
   
    return <primitive object={scene}{...props}/>;
}

const Env: React.FC = () => {
    const [preset, setPreset] = useState<PresetType>('sunset')
    const [inTransition, startTransition] = useTransition()
    const { blur } = useControls({
        blur: { value: 0.65, min: 0, max: 1 },
        preset: {
          value: preset,
          options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
            
          onChange: (value) => startTransition(() => setPreset(value))
        }
      })
      return <Environment preset={preset} background backgroundBlurriness={blur} />
};

const Sphere: React.FC = () => {
    const {ref, hovered, clicked, events} = useHoverClick();
    return(
        <Center top>
            <mesh castShadow
                ref={ref}
                {...events}>
                <sphereGeometry args={[0.75, 64, 64]}/>
                <meshStandardMaterial metalness={1} roughness={1}/>
            </mesh>
        </Center>
    )
}



const LibraryView: React.FC<LibraryProps> = ({books}) =>{

    // const { model } = useControls({ model: { value: 'Beech', options: Object.keys(MODELS) } })

    return (
        <Canvas shadows camera={{ position: [20, 20, 4.5], fov: 50 }}>
                {/* <ambientLight/>
                <pointLight position={[10, 10, 10]}/> */}
                <group position={[0, -0.65, 0]}>
                    <AccumulativeShadows temporal frames={200} color="purple" colorBlend={0.5} opacity={1} scale={10} alphaTest={0.85}>
                        <RandomizedLight amount={8} radius={5} ambient={0.5} position={[5, 3, 2]} bias={0.001} />
                    </AccumulativeShadows>
                    <Sphere/>
                    
                    {books.map((book, index) => (
                        <Suspense fallback={<status.In>Loading ...</status.In>} key={book.id}>
                            <Model url={book.modelURL} position={[index* 10, 0.25 , 0]}/>
                            </Suspense>
                        ))};
                 
                </group>
                <Env />
                <OrbitControls autoRotate autoRotateSpeed={0.1} enablePan={true} enableZoom={true} minPolarAngle={Math.PI / 2.1} maxPolarAngle={Math.PI / 2.1} />
            </Canvas>
    );
};


export default LibraryView;