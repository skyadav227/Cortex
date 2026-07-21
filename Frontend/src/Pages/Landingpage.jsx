import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../CSS/Landingpage.css"
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Landingpage() {
    const navigate = useNavigate()
    return (
        <>
            <div className="landing">
                <div className="blur blur1"></div>
                <div className="blur blur2"></div>
                <div className="stars"></div>

                <section className="hero">
                    <h1>CORTEX</h1>
                    <h2>
                        Think Smarter.
                        <br />
                        Build Faster.
                    </h2>
                    <p>
                        Your AI assistant built for developers, students and creators.
                        Learn, code, debug and create—all in one place.
                    </p>

                    <div className="scroll-down">
                        ↓ Scroll to Explore
                    </div>
                </section>

                <section className="features">
                    <div className="feature-card">
                        <span>⚡</span>
                        <h3>Lightning Fast</h3>
                        <p>
                            Instant AI responses powered by modern language models.
                        </p>
                    </div>

                    <div className="feature-card">
                        <span>🧠</span>
                        <h3>Smart Conversations</h3>
                        <p>
                            Remembers context naturally for better conversations.
                        </p>
                    </div>

                    <div className="feature-card">
                        <span>🔒</span>
                        <h3>Private & Secure</h3>
                        <p>
                            Your chats stay yours with secure authentication.
                        </p>
                    </div>
                </section>

                <section className="why">
                    <div className="why-left">
                        <h2>Why Cortex?</h2>
                        <p>
                            Cortex is built to help students, developers and creators
                            solve problems faster, learn smarter and build confidently.
                        </p>
                    </div>

                    <div className="why-right">
                        <div className="why-item">
                            ⚡ Instant AI Responses
                        </div>

                        <div className="why-item">
                            🧠 Context Aware Conversations
                        </div>

                        <div className="why-item">
                            📄 Markdown & Code Support
                        </div>

                        <div className="why-item">
                            🌙 Beautiful Dark UI
                        </div>

                        <div className="why-item">
                            📱 Responsive on Every Device
                        </div>

                        <div className="why-item">
                            🔒 Secure Authentication
                        </div>
                    </div>
                </section>

                <section className="steps">
                    <h2>How Cortex Works</h2>
                    <div className="step-container">
                        <div className="step-card">
                            <span>①</span>
                            <h3>Create Account</h3>
                            <p>Register securely and access Cortex anywhere.</p>
                        </div>

                        <div className="step-card">
                            <span>②</span>
                            <h3>Ask Anything</h3>
                            <p>Programming, learning or brainstorming.</p>
                        </div>

                        <div className="step-card">
                            <span>③</span>
                            <h3>Get AI Answers</h3>
                            <p>Receive instant intelligent responses.</p>
                        </div>
                    </div>
                </section>

                <section className="tech">
                    <h2>Built With</h2>
                    <div className="tech-grid">
                        <div className="tech-card">⚛ React</div>

                        <div className="tech-card">🟢 Node.js</div>

                        <div className="tech-card">🚀 Express</div>

                        <div className="tech-card">🍃 MongoDB</div>

                        <div className="tech-card">🤖 OpenRouter</div>

                        <div className="tech-card">⚡ Vercel</div>
                    </div>
                </section>

                <section className="cta">
                    <h2>Ready to Build Smarter?</h2>
                    <p>
                        Join Cortex today and unlock a faster, smarter way to learn,
                        build and create with AI.
                    </p>

                    <button onClick={() => navigate("/signup")}>
                        Get Started →
                    </button>

                    <div className="login-link" onClick={() => navigate("/login")}>
                        Already have an account? Login
                    </div>
                </section>

                <footer className="footer">
                    <h2>CORTEX<span style={{ color: "#6366f1", fontWeight: "bold" }}>.</span></h2>
                    <p>
                        Think Smarter. Build Faster.
                    </p>

                    <div className="social-links">
                        <a
                            href="https://github.com/skyadav227"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaGithub />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/sher-karthikeya-yadav-009193226/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaLinkedin />
                        </a>

                        <a
                            href="mailto:karthikeyayadav547@gmail.com"
                        >
                            <MdEmail />
                        </a>
                    </div>

                    <p>
                        Designed & Developed by Karthik
                    </p>

                    <small>
                        © 2026 Cortex • All Rights Reserved.
                    </small>
                </footer>
            </div>
        </>
    )
}
