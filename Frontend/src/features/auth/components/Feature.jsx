import React from 'react'
import "../css/Feature.css"
const Feature = () => {
  return (
   <section className="feature-section">
  <div className="feature-header">
    <h1>
      Powerful AI Features for Your Next Interview
    </h1>

    <p>
      Everything you need to analyze your resume and prepare for your next interview.
    </p>
  </div>

  <div className="available-feature">
    <div className="feature-content">
     

      <h2>AI Resume Analysis</h2>

          <p className="feature-description">
        Upload your resume and let AI analyze it instantly.
           </p>

      <p className="feature-subtitle">What you'll get:</p>

       <ul>
            <li>✓ Skills detected</li>
            <li>✓ Experience analysis</li>
            <li>✓ Strengths & weaknesses</li>
         </ul>
    </div>
</div>
</section>
  )
}

export default Feature
