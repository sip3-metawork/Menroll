//import React, { useEffect, useState } from "react";
import { Container, Row, Col,Table,  Button } from "react-bootstrap";
import prisma from "../../lib/prisma"

import TopNavi from "../../components/TopNavi";
import Spot from "../../components/Spot"

var hasRun: boolean = false;

const Page = async function() {
  const feed = await prisma.spot.findMany({
    include: { 
      site: true,
      resources: true,
      clients: true
    },
  })
  return (
    <>
    <TopNavi />
    <Container fluid="md" > 
      <Row> <Col> Select Remote  Spot </Col></Row>
      <Row><Col>
        <Table border={2} data-bs-theme="dark" striped size="lg">
        <thead><tr><td>Site</td><td>Spot</td><td>Robot</td><td>Clients</td></tr>
        </thead>
        <tbody>{feed.map((spot) => (<tr key={spot.id}>
          <td> {spot.site.name}</td>
          <td> <Spot spot={spot}/></td>
          <td> {spot.resources[0].name}</td>
          <td> {spot.clients.length}</td>
          </tr>))}
        </tbody>
        </Table></Col>
      </Row>
      </Container>
    </>
  )

 };

export default Page;
