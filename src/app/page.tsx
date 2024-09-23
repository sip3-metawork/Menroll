"use client";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import TopNavi from "../components/TopNavi";
import "./page.css";


var hasRun: boolean = false;

const Page = () => {
  // ページが開いたら１回だけ実行される処理
  const doit = () => {
    //    connectSora();
  };

  useEffect(() => {
    // ページが開かれた時に実行される関数
    if (!hasRun) {
      hasRun = true;
//      console.log("doit!");
      doit();
    }
  }, []); // 空の配列を渡すことで、初回レンダリング時のみ実行されます

  return (
    <div>
      <TopNavi />

      <div>
        <div>
          <Container>
          <h3>Menroll for the Metawork Enrollment</h3>
          <Row>
            <Col>
             <h4>Menroll is a remote robot management system.</h4>

             Please check "RobotsSite menu"
            </Col>
          </Row>

          </Container>
        </div>
      </div>
    </div>
  );
};

export default Page;
