import React from 'react'
import RainMap from '../components/RainMap';
import City_Det from '../components/City_Det';

const Middle = ({place}) => {
  return (
    <div style={{ height: "99vh", backgroundColor: "#FFF8E1" }}>
      <h2 align="center">World Info</h2>
      <div className='Layout'>
        <section className='left-section'>
          <h3 style={{ textAlign: "center", borderBottom: "2px solid" }}>
            World Map</h3>
          <RainMap />
        </section>
        <section className='right-section'>
          <h3 style={{ textAlign: "center", borderBottom: "2px solid" }}>
            City Detail's</h3>
            <City_Det place={place}/>
        </section>
      </div>

    </div>
  )
}

export default Middle