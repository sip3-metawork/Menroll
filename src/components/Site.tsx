'use client'
import React from 'react'
import styles from './Site.module.css'
import Link from 'next/link'
import Spot from './Spot' 

const Site = ({ site }) => {
//  console.log("SiteClt:",site)
  const spots = site.spots;
//  console.log("Spots:",spots)
  return (
    <>
      <td> {site.name}</td>
      <td>
      <table>
        {      
      spots.map((spot) => {
        <Spot spot={spot}></Spot>
      })}
      </table></td>
    </>
  )
}

export default Site
