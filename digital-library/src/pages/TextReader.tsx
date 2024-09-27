import React, {useState} from "react";
import "../css/TextReader.css"


const sampleText = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet malesuada nibh, non accumsan velit fermentum eu. 
Suspendisse potenti. Nulla facilisi. In sit amet massa eget lorem tincidunt aliquam. Pellentesque commodo mauris eget metus tincidunt cursus.
`
interface TextReaderProps{
    text: string
}

export const TextReader: React.FC<TextReaderProps> = ({text}) => {
    return (
        <div className="reader-container">
            <div className="text-container">
                <p>{text}</p>
            </div>
        </div>
    )
}