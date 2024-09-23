
import { Container, Row, Col, Button } from "react-bootstrap";
import Link from 'next/link';

import TopNavi from "../../../../components/TopNavi";

import prisma from "../../../../lib/prisma";

import SoraComponent from "../../../../components/SoraComponent";
import "../../../page.css";

var hasRun: boolean = false;

export default async function({params}) {
//  console.log("Params",params )
  const id = Number(
    Array.isArray(params?.id)
      ? params?.id[ 0 ]
      : params?.id,
  )
  const resData =  await prisma.resource.findUnique({
    where: { id },
    include: { 
      spot : true
    },
  })

//  console.log("Parsing JSON",resData.desc)
  const desc = JSON.parse(resData.desc)
//  console.log("ResultJSON",desc)

  return (
    <div>
      <TopNavi></TopNavi>
      <div>
        <Container fluid="sm">
          <Row>
          <Col xs={5}>
          View for {resData.name} in {resData.spot.name} (id={resData.spot.id} <Link href={"/p/"+resData.spot.id}>[back]</Link>)
        <SoraComponent signalingURL={desc.webRTCServer} channel={desc.webRTCChannel} autoConnect={true}></SoraComponent>
        </Col></Row>
        </Container>
      </div>
    </div>
  );
};
