import React from 'react'
import "../css/Hero.css"
const Hero = () => {
  return (
     <section className='hero'>
        <div className='hero-content'>
            <h1>Building something Amazing</h1>
            <p>Analyze you resume to provide you better options</p>

            <div className='hero-buttons'>
                <button className='first'>Get Started</button>
             
                <button className='secondary'>Learn more</button>
            </div>

        </div>
     </section>
  )
}

export default Hero
