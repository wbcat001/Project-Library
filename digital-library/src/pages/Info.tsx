
import { useRef } from "react"
import { easing } from "maath"
import { useFrame } from "@react-three/fiber"
import { Text, Mask, useMask } from "@react-three/drei"
import { BookResponse } from "../models/Book"


interface InfoProps{
    book: BookResponse|null
}


export const Info: React.FC<InfoProps> = ({book}) => {

    return (
        <group>
            <Text position={[1, 1.25, 0]} color="black" fontSize={1}  letterSpacing={-0.05}>
                { book ? book.title : ""}
            </Text>
        </group>
    )
}