
import React, { useEffect, useState } from "react";
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
      client: true
    },
  })
  console.log("SiteSrv:",feed)

  return (
    <>
    <TopNavi />
    <Container fluid="md"> 
      <Row> <>　 </></Row>
      <Row> Select Remote  Spot</Row>
      <Row>
    <Table border="2" padding="2">
      <thead><tr><td>Site</td><td>Spot</td><td>Robot</td><td>Clients</td></tr>
      </thead>
      <tbody>{feed.map((spot) => (<tr key={spot.id}>
        <td> {spot.site.name}</td>
        <td> <Spot spot={spot}/></td>
        <td> {spot.resources[0].name}</td>
        <td> {spot.client.length}</td>
        </tr>))}
      </tbody>
      </Table>
      </Row>
      </Container>
    </>
  )

 };

export default Page;
