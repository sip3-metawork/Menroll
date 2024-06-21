
import React from 'react'
import styles from './Spot.module.css'
import Link from 'next/link'

const Spot = ({ spot }) => {

  console.log("SpotClt:",spot)
  return (
    <Link key={spot.id}
      href={`/p/${spot.id}`}
      className={styles.spot}
    >
      {spot.name}
    </Link>
  )
}

export default Spot
