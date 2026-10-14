import React from 'react'
import { Link } from 'react-router-dom'
import { Compass, ArrowLeft } from 'lucide-react'

const ErrorPage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white flex items-center justify-center px-6 font-sans antialiased">
      <section className='error-page text-center max-w-md mx-auto space-y-6'>
        
        {/* Animated Icon Container */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-800 shadow-xs animate-bounce duration-1000">
          <Compass className="w-8 h-8 text-zinc-900" />
        </div>

        <div className='error-container space-y-3'>
          {/* Main Error Heading (Unchanged text) */}
          <h1 className='text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900'>
            Bro! you are at the wrong path..
          </h1>
          
          {/* Subtitle / Navigation Link (Unchanged text concept) */}
          <h3 className='text-zinc-500 text-sm font-medium'>
            Go back to your{' '}
            <Link 
              to="/" 
              className='inline-flex items-center gap-1 text-zinc-900 font-semibold underline underline-offset-4 hover:text-zinc-700 transition-colors'
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Home
            </Link>
          </h3>
        </div>

        {/* Quick Back Button Pill */}
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center h-10 px-6 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 active:scale-95 rounded-full transition-all shadow-xs"
          >
            Take Me Home
          </Link>
        </div>

      </section>
    </div>
  )
}

export default ErrorPage