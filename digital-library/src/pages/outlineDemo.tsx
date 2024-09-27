import React, {Suspense, useState, useRef, useTransition, useDeferredValue, useCallback} from "react";
import {Canvas, useFrame, ThreeElements} from "@react-three/fiber";
import {Box, Grid, TextField, Button} from "@mui/material";
import * as THREE from 'three';
import {useControls} from "leva"
import { AccumulativeShadows, RandomizedLight, Center, Environment, OrbitControls, useGLTF} from "@react-three/drei"
import { Vector3 } from 'three';
import tunnel from 'tunnel-rat'
import { Select } from "@react-three/postprocessing"
import {BookResponse} from "../models/Book";
import { debounce } from "lodash";
import { ThreeEvent } from "@react-three/fiber"
import { EffectComposer, Selection, Outline, N8AO, TiltShift2, ToneMapping } from "@react-three/postprocessing";
import { easing } from "maath";
import { useThree } from "@react-three/fiber"


function Sphere() {
    const { roughness } = useControls({ roughness: { value: 1, min: 0, max: 1 } })
    const randomPos = Math.random() * 5;
    return (
      <Center top>
        <Select enabled>
            <mesh castShadow position={[randomPos, randomPos, randomPos]}>
                <sphereGeometry args={[0.75, 64, 64]} />
                <meshStandardMaterial metalness={1} roughness={roughness} />
            </mesh>
        </Select>
      </Center>
    )
  }


export const OutlineDemo: React.FC = () => {
    let myArray = [1, 2, 3, 4, 5];
    const [hovered, setHovered] = useState<number|null>(null);
return (
    <div>
    <Canvas shadows camera={{ position: [0, 0, 4.5], fov: 50 }}>
    <group position={[0, -0.65, 0]}>
        <Selection>
        <EffectComposer autoClear={false}>
            <Outline blur edgeStrength={1} visibleEdgeColor={0xff11ff} hiddenEdgeColor={0xffffff}/>
        </EffectComposer>
        <group>
        {
            myArray.map((x, index) => 
                <Select enabled={hovered === index} key={index}>
                    <mesh castShadow position={[x, x, x]} onPointerOver={() => setHovered(index)} onPointerOut={() => setHovered(null)}>
                    <sphereGeometry args={[0.75, 64, 64]} />
                    <meshStandardMaterial metalness={1}/>
                    </mesh>
                </Select>
            )       
        }
        </group>
        </Selection>
        <AccumulativeShadows temporal frames={200} color="purple" colorBlend={0.5} opacity={1} scale={10} alphaTest={0.85}>
        <RandomizedLight amount={8} radius={5} ambient={0.5} position={[5, 3, 2]} bias={0.001} />
        </AccumulativeShadows>
    </group>
   
    <OrbitControls autoRotate autoRotateSpeed={0} enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.1} maxPolarAngle={Math.PI / 2.1} />
    </Canvas>
    </div>
)
}