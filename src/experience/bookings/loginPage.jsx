import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  

  const handleLogin = (e) => {
    e.preventDefault()
    console.log('Logging in with:', { email, password })
    // hook up Firebase or API here later
  }

  return (
    <div className="h-screen bg-lime-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-lime-800 p-6 rounded-lg shadow-lg text-white">
       <div className="flex items-center justify-center mb-6 space-x-3">
  <img
    src="/gypsytraillogo.jpg"
    alt="Gypsy Trail Logo"
    className="w-20 h-20 object-contain"
  />
  <h1 className="text-3xl font-bold text-amber-400">Gypsy Trail Login</h1>
</div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
  type="email"
  required
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full p-2 rounded text-black border border-gray-300"
/>

          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
  type="password"
  required
  placeholder="Enter your password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full p-2 rounded text-black border border-gray-300"
/>

          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 text-black font-semibold py-2 rounded hover:bg-amber-600 transition"
          >
            Log In
          </button>
        </form>

        <div className="text-sm text-center text-gray-300 mt-4">
         Forgot your password? <Link to="/forgot-password" className="underline">Reset</Link><br />
          New here? <Link to="/signup" className="underline">Create an account</Link>
        </div>
      </div>
    </div>
  )
}
