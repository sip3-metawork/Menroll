"use client"
import React, {useEffect,useState} from "react";
// sora component should be in th client space
import SoraClient from "../lib/soraclient";
import {useParams} from 'next/navigation';
import { checkPrimeSync } from "crypto";

interface SoraProps {
    signalingURL: string,
    channel: string;
    autoConnect?: boolean;
};


const SoraComponent : React.FC<SoraProps> = ({signalingURL,channel, autoConnect})=>{

    const param = useParams();
    const [cSora, setCSora] = useState(undefined)
    const [isConnected, setIsConnected]= useState(false);

//    console.log("SoraComponent Props",param , signalingURL, channel, autoConnect)

    const connectSora = async () => {
        console.log("Connect!");
        var soraClient = cSora
        if (soraClient === undefined  ){
            soraClient = new SoraClient(
            "sc01",
            signalingURL,
            channel,
            "",
            "token"
            );
            setCSora(soraClient)
//            console.log("setCSora",cSora)
        }
        try{ 
            await soraClient.connect();
            setIsConnected(true);
        }catch (exception){
            console.log("Exception:",exception)
        }
    };
    const disconnectSora = async () => {
        console.log("Discon!",cSora);
        await cSora.disconnect();
        setIsConnected(false);
    };

    if (autoConnect){
        useEffect(()=>{
            // ここで ちゃんとページが表示されたかをチェックしたい。
            window.setTimeout(connectSora,200 );

        },[])
    }

return (
      <div>
        <button disabled={isConnected} onClick={connectSora}>connect</button>
        <button disabled={!isConnected}onClick={disconnectSora}>stop</button>
        <br />
        <div id="remote-videos"></div>
      </div>
)
}

export default SoraComponent;
