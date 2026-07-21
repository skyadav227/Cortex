import "../CSS/Auth.css"
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../Services/auth'
import { toast } from 'sonner'
import PageWrapper from '../Components/PageWrapper'

export default function Login() {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await login(formData)
      localStorage.setItem("token", response.token)
      localStorage.setItem("user", JSON.stringify(response.user))
      toast.success(response.message)
      navigate("/home")
    }

    catch (error) {
      toast.error(error.message)
    }

    finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageWrapper>
        <div className="auth-page">

          <div className="blur blur1"></div>
          <div className="blur blur2"></div>
          <div className="stars"></div>

          <div className="auth-card">
            <h1>CORTEX</h1>
            <h2>Welcome Back</h2>
            <p>Continue your AI journey.</p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="auth-footer">
              Don't have an account?

              <Link to="/signup">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  )
}
