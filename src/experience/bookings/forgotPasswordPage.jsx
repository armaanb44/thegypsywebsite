import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPasswordPage() {
  const [method, setMethod] = useState('email') // 'email' or 'mobile'
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [countryCode, setCountryCode] = useState('+91')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (method === 'email') {
      console.log('Sending password reset email to:', email)
    } else {
      const fullPhone = `${countryCode}${phone}`
      console.log('Sending OTP to phone number:', fullPhone)
    }

    setSubmitted(true)
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
          <h1 className="text-3xl font-bold text-amber-400">Reset Password</h1>
        </div>

        {submitted ? (
          <div className="text-center text-gray-200">
            {method === 'email'
              ? 'If your email exists, a reset link has been sent.'
              : 'If your number is registered, an OTP has been sent.'}
          </div>
        ) : (
          <>
            <div className="flex justify-center space-x-4 mb-4">
              <button
                type="button"
                onClick={() => setMethod('email')}
                className={`px-4 py-2 rounded font-semibold transition ${
                  method === 'email'
                    ? 'bg-amber-500 text-black'
                    : 'bg-lime-800 text-white hover:bg-lime-600'
                }`}
              >
                Use Email
              </button>
              <button
                type="button"
                onClick={() => setMethod('mobile')}
                className={`px-4 py-2 rounded font-semibold transition ${
                  method === 'mobile'
                    ? 'bg-amber-500 text-black'
                    : 'bg-lime-800 text-white hover:bg-lime-600'
                }`}
              >
                Use Mobile
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {method === 'email' ? (
                <div>
                  <label className="block mb-1 font-medium">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 rounded text-black border border-gray-300"
                  />
                </div>
              ) : (
                <div>
                  <label className="block mb-1 font-medium">
                    Mobile Number <span className="text-red-400">*</span>
                  </label>
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
                      required
                      pattern="[0-9]{7,15}"
                      placeholder="Enter your mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 p-2 rounded text-black border border-gray-300"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-amber-500 text-black font-semibold py-2 rounded hover:bg-amber-600 transition"
              >
                {method === 'email' ? 'Send Reset Link' : 'Send OTP'}
              </button>
            </form>
          </>
        )}

        <div className="text-sm text-center text-gray-300 mt-4">
          <Link to="/login" href="#" className="underline">Back to Login</Link>
        </div>
      </div>
    </div>
  )
}
