"use client"
import React, {useEffect,useState} from "react";

import { XRContext } from "../lib/XRContext";


interface WebXRProps {
    mqttServer: string,
    mqttTopic: string;
    autoConnect?: boolean;
};


const WebXRBase : React.FC<WebXRProps> = ({mqttServer,mqttTopic, autoConnect})=>{
    const [vrState, setVrState] = useState("NoVR");
    const [hasVR, setHasVR] =useState(false);

    useEffect(()=>{
        // ここで ちゃんとページが表示されたかをチェックしたい。
        window.setTimeout(enterVR,400 );
    },[])

    // XR環境の有無を確認する！
    const checkXR = ()=> {
        let vrState = "No VR";
        let hasVR = false;
        if (navigator.xr) {// 環境側の状況を確認
            navigator.xr.isSessionSupported("immersive-vr").then((supported) => {
                setVrState("Enter VR");
                setHasVR(true);
            })
        }
        console.log(vrState, hasVR);
    }
    // ページが VR 対応かチェックが必要
    useEffect(()=>{
        checkXR();
    },[])

    const initWebVR = ()=>{
        const vr = new XRContext()
    }



    const enterVR = async () => {
        console.log("EnterVR");
        initWebVR();
    }

    return (
        <div>
              <button  disabled={!hasVR} onClick={enterVR}>{vrState}</button>
       </div>
    )
}

export default WebXRBase;
