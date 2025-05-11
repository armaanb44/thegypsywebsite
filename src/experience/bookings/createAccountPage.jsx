import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function CreateAccountPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('+91')

  const handleSignup = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    const fullPhone = phone ? `${countryCode}${phone}` : null
    console.log('Creating account with:', {
      name,
      email,
      password,
      phone: fullPhone,
    })

    // Hook up to Firebase or backend API here
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
          <h1 className="text-3xl font-bold text-amber-400">Create Account</h1>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded text-black border border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Email <span className="text-red-400">*</span>
            </label>
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
            <label className="block mb-1 font-medium">
              Password <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              required
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded text-black border border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Confirm Password <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              required
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 rounded text-black border border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Mobile Number</label>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="p-2 rounded text-black border border-gray-300 bg-white"
              >
                <option value="+91">🇮🇳 +91 (India)</option>
                <option value="+1">🇺🇸 +1 (USA)</option>
                <option value="+44">🇬🇧 +44 (UK)</option>
                <option value="+61">🇦🇺 +61 (Australia)</option>
                <option value="+81">🇯🇵 +81 (Japan)</option>
                <option value="+49">🇩🇪 +49 (Germany)</option>
                <option value="+33">🇫🇷 +33 (France)</option>
                <option value="+86">🇨🇳 +86 (China)</option>
                <option value="+971">🇦🇪 +971 (UAE)</option>
                <option value="+39">🇮🇹 +39 (Italy)</option>
                <option value="+7">🇷🇺 +7 (Russia)</option>
                <option value="+55">🇧🇷 +55 (Brazil)</option>
                <option value="+34">🇪🇸 +34 (Spain)</option>
                <option value="+27">🇿🇦 +27 (South Africa)</option>
                <option value="+82">🇰🇷 +82 (South Korea)</option>
                <option value="+47">🇳🇴 +47 (Norway)</option>
                <option value="+46">🇸🇪 +46 (Sweden)</option>
                <option value="+31">🇳🇱 +31 (Netherlands)</option>
                <option value="+41">🇨🇭 +41 (Switzerland)</option>
                <option value="+63">🇵🇭 +63 (Philippines)</option>
              </select>

              <input
                type="tel"
                placeholder="Enter mobile # (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 p-2 rounded text-black border border-gray-300"
                pattern="[0-9]{7,15}"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 text-black font-semibold py-2 rounded hover:bg-amber-600 transition"
          >
            Sign Up
          </button>

          <p className="text-sm text-gray-300 mb-2">
            Fields marked with <span className="text-red-400">*</span> are mandatory.
          </p>
        </form>

        <div className="text-sm text-center text-gray-300 mt-4">
          Already have an account? <Link to="/login" href="#" className="underline">Log in</Link>
        </div>
      </div>
    </div>
  )
}
