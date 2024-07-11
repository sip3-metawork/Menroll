
import { Container, Row, Col, Button, CardImgOverlay } from "react-bootstrap";

import TopNavi from "../../../../components/TopNavi";

import prisma from "../../../../lib/prisma";
import {TResource} from "../../../../lib/resourceType";

import {Spot, Resource} from '@prisma/client'; 

import SoraComponent from "../../../../components/SoraComponent";
import WebXRBase from "../../../../components/WebXRBase";

var hasRun: boolean = false;

export default async function({params}) {
//  console.log("Params",params )
    const id = Number(
        Array.isArray(params?.id)
        ? params?.id[ 0 ]
        : params?.id,
    )

  const spotData =  await prisma.spot.findUnique({
    where: { id },
    include: {
        resources: true,
        clients: true
    }
  });

  //check camera
    let robot:Resource | null = null;
    let camera:Resource | null = null;
    let rdesc, cdesc;
    spotData.resources.forEach(function(elm:Resource,index:Number){
        switch(elm.type){
            case TResource.ROBOT_ARM:
                robot = elm;
                rdesc = JSON.parse(robot.desc);
                break;
            case TResource.SINGLE_CAMERA:
                camera = elm;
                cdesc = JSON.parse(camera.desc);
                break;
            case TResource.DUAL_CAMERA:
                camera = elm;
                cdesc = JSON.parse(camera.desc);
                break;
        }
    });


  

//  console.log("Parsing JSON",resData.desc)
//  const desc = JSON.parse(resData.desc)
//  console.log("ResultJSON",desc)

  return (
    <div>
      <TopNavi></TopNavi>
      <div>
        <Container fluid="sm">
          <Row>
          <Col xs={12}>
          Connect for {spotData.name}  Robot:{robot.name} Cam:{camera.name} <a href={"/p/"+spotData.id}>[back]</a>)
            <SoraComponent signalingURL={cdesc.webRTCServer} channel={cdesc.webRTCChannel} autoConnect={true}></SoraComponent>
        </Col>
        </Row>
        <Row>
        <Col>
            <WebXRBase mqttServer={rdesc.mqttServer} mqttTopic={rdesc.mqttTopic} ></WebXRBase>
        </Col>
        </Row>
        </Container>
      </div>
    </div>
  );
};
