
"use client"

import React from 'react';
import { Button , ButtonProps} from "react-bootstrap";


interface HandleButtonProps extends ButtonProps {
    id?: string;
  }


export const ButtonView: React.FC<HandleButtonProps> = ({ id }) => {
    const handleView = (id) => {
        window.open("./view/" + String(id), 'menView', 'noopener,noreferrer');
    }

    return (
        <Button size="sm" onClick={() => handleView(id)}>View</Button>
    )
}

export const ButtonConnect : React.FC<HandleButtonProps> = ({ id }) => {

    const handleConnect = (id) => {
        window.open("./con/" + String(id), '_blank', 'noopener,noreferrer');
    }

    return (
        <Button onClick={() => handleConnect(id)}>Connect</Button>
    )
}
