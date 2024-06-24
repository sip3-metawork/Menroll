
import React  from "react";
import { Container, Row, Col,Table, Stack, Button } from "react-bootstrap";

import TopNavi from "../../../components/TopNavi";
import ResType from "../../../lib/resourceType";
import prisma from "../../../lib/prisma";

import {ButtonConnect, ButtonView} from "./Handlers";


export default async function({params}) {
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
  })

  
  return (
    <>
    <TopNavi />
    <Container fluid="md"> 
      <Row> <Col>Spot: {spotData.name}</Col></Row>
      <Row>
        <Col><Table bordered striped size="lg">
          <thead>
            <tr><td>Type</td><td>Name</td><td>Desc</td><td>Connected</td></tr>
          </thead>
          <tbody>
        {spotData.resources.map((res)=>(
            <tr>
              <td>{ResType[res.type]}</td>
              <td>{res.name} </td><td>{res.desc}</td><td>{res.clients ? res.clients.length: 0}</td>
              <td>{res.type!=1 ?<ButtonView size="sm" id={res.id} >View</ButtonView> : ""}</td>
            </tr>
          ))}
        </tbody>
        </Table>
        </Col>
      </Row>
      <Row>
        <Col>

        <ButtonConnect id={spotData.id}>Connect!</ButtonConnect>
        </Col>
      </Row>
      </Container>
    </>
  )

 };
