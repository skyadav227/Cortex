import "../CSS/Auth.css"
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../Services/auth'
import { toast } from 'sonner'
import PageWrapper from '../Components/PageWrapper'
import { celebrate } from '../utils/confetti'

export default function Signup() {

  const navigate = useNavigate()

  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (e) => {
    setFormdata({
      ...formData, [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast("Password do not match")
      return
    }

    try {
      const { name, email, password } = formData
      const response = await signup({
        name,
        email,
        password
      })
      toast.success(`${response.message} Login to get started.`)
      celebrate()

      navigate("/login")
    }

    catch (error) {
      toast.error(error.message)
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
            <h2>Create your account</h2>
            <p>Think smarter. Build faster.</p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />

              <input
                type="email"
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />

              <input
                type="password"
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />

              <input
                type="password"
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />

              <button type="submit">
                Create Account
              </button>

            </form>
            <div className="auth-footer">
              Already have an account?

              <Link to="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  )
}
