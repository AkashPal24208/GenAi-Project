import React from 'react'
import "../css/ErrorPage.css"
const ErrorPage = () => {
  return (
    <div>
        <section className='error-page'>
            <div className='error-container'>
                <h1>Bro! you are at the wrong path..</h1>
                <h3>Go back to your <a href="/">Home</a></h3>
            </div>
        </section>
    </div>
  )
}

export default ErrorPage
