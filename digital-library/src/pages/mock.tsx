import React, {Suspense, useState, useRef, useTransition, useDeferredValue} from "react";
import {Canvas, useFrame, ThreeElements} from "@react-three/fiber";
import {Box, Grid, TextField, Button} from "@mui/material";
import * as THREE from 'three';
import {useControls} from "leva"
import { AccumulativeShadows, RandomizedLight, Center, Environment, OrbitControls, useGLTF} from "@react-three/drei"
import { Vector3 } from 'three';
import tunnel from 'tunnel-rat'

const status = tunnel()

type PresetType = 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park' | 'lobby';

const MODELS = {
    Beech: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-beech/model.gltf',
    Lime: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-lime/model.gltf',
    Spruce: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-spruce/model.gltf'
  }

interface Book{
    id: number,
    name: string,
    createdAt: Date,
    updatedAt: Date,
    modelURL: string,
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

interface ModelProps {
    url: string;
    position?: [number, number, number];
}


function Model({url, ...props}:ModelProps) {
    console.log(url);
    const deferred = useDeferredValue(url)
    const {scene} = useGLTF(deferred) as unknown as { scene: THREE.Group }
    console.log("scene: " , scene);
    return <primitive object={scene}{...props}/>;
}

const Book3D: React.FC = (props: ThreeElements["mesh"]) => {
    const {ref, hovered, clicked, events} = useHoverClick();

    // useFrame((state, delta) => ref.current.rotation.x += delta)    
    return(
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.1 : 1}
            {...events}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial metalness={1} roughness={1}/>
        </mesh>
    )
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


const View: React.FC = () =>{

    const { model } = useControls({ model: { value: 'Beech', options: Object.keys(MODELS) } })
    return (
        <Canvas shadows camera={{ position: [0, 0, 4.5], fov: 50 }}>
                {/* <ambientLight/>
                <pointLight position={[10, 10, 10]}/> */}
                <group position={[0, -0.65, 0]}>
                    <AccumulativeShadows temporal frames={200} color="purple" colorBlend={0.5} opacity={1} scale={10} alphaTest={0.85}>
                        <RandomizedLight amount={8} radius={5} ambient={0.5} position={[5, 3, 2]} bias={0.001} />
                    </AccumulativeShadows>
                    {/* <Book3D/> */}
                    {/* <Sphere/> */}
                    <Suspense fallback={<status.In>Loading ...</status.In>}>
                        <Model url={MODELS.Lime} position={[0, 0.25, 0]}/>
                    </Suspense>
                </group>
                <Env />
                <OrbitControls autoRotate autoRotateSpeed={0.1} enablePan={true} enableZoom={true} minPolarAngle={Math.PI / 2.1} maxPolarAngle={Math.PI / 2.1} />
            </Canvas>
    );
};



export const Mock: React.FC = () => {

    const handleSubmit = () => {
        console.log("Book title")
        console.log("exist?")
    }
    
    return(
    <Grid container spacing={2} height={800}>
        <Grid item xs={4}>
            <Box p={2}>
                <TextField
                    label="Book Title"
                />
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Register
                </Button>
            </Box>
        </Grid>

        <Grid item xs={8}>
           
           <View/>
        </Grid>
    </Grid>

    )
}



