import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import GoogleLogin from '../components/GoogleLogin'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const { loading, handleLogin } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleLogin({ email, password })
    navigate('/')
  }

  // Loading state
  if (loading) {
    return (
      <main className="min-h-[80vh] flex flex-col items-center justify-center gap-3 text-zinc-900 font-sans">
        <svg className="w-6 h-6 animate-spin text-zinc-900" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
          <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <h1 className="text-sm font-medium text-zinc-600 tracking-tight">Signing you in...</h1>
      </main>
    )
  }

  return (
    <main className="min-h-[85vh] flex items-center justify-center p-6 bg-white font-sans antialiased text-zinc-900">
      <div className="w-full max-w-sm bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        
        {/* Header */}
        <div className="text-center space-y-1.5 mb-8">
          <div className="w-10 h-10 mx-auto rounded-xl bg-zinc-900 text-white flex items-center justify-center font-extrabold text-sm mb-3">
            L
          </div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900">
            Welcome back
          </h1>
          <p className="text-xs text-zinc-500">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email field */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-semibold text-zinc-700">
              Email address
            </label>
            <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email" 
              id="email" 
              name="email" 
              placeholder="name@example.com" 
              className="w-full bg-white border border-zinc-200 focus:border-zinc-900 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none transition-colors"
              required
            />
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-xs font-semibold text-zinc-700">
                Password
              </label>
            </div>
            <input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password" 
              id="password" 
              name="password" 
              placeholder="••••••••" 
              className="w-full bg-white border border-zinc-200 focus:border-zinc-900 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none transition-colors"
              required
            />
          </div>

          {/* Submit button */}
          <button 
            type="submit" 
            className="w-full mt-2 inline-flex items-center justify-center h-10 px-4 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-950 rounded-full transition-colors cursor-pointer shadow-xs"
          >
            Sign in
          </button>
        </form>
    {/* continue with google  */}
    <div className='mt-4'>
      <GoogleLogin/>
    </div>
        {/* Register redirection */}
        <p className="mt-6 text-center text-xs text-zinc-500">
          Don't have an account?{" "}
          <Link 
            to="/register" 
            className="font-semibold text-zinc-900 hover:underline transition-all"
          >
            Register
          </Link>
        </p>
  
      </div>
    </main>
  )
}

export default Login