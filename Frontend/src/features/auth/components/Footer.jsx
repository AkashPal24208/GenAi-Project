import React from 'react'
import "../css/Fotter.css"
const Footer = () => {
  return (
    <section className='footer-section'>
        <div className='details-section'>

            <h3>AI Resume Product Company</h3>
             <div className='social-handle'>
              <ul>
                <li><a href="#github">GitHub</a></li>
                <li><a href="#linkedin">Linkedin</a></li>
              </ul>
             </div>
        </div>

        <div className='contact-info'>
                <p>About Us</p>
             <ul>
                <li><strong>Email:</strong>code@gmail.com</li>
                <li><strong>Contact-us</strong>91-12345678910</li>
             </ul>

        </div>

        <div>
            <p>&copy;2026 All rights reserved. Privacy policy | Terms of Service</p>
        </div>
        
    </section>
  )
}

export default Footer
