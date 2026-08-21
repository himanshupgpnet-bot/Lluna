"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-copy > *", { y: 35, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out" });
      gsap.from(".product-window", { x: 80, opacity: 0, rotateY: -18, duration: 1.3, delay: .15, ease: "power3.out" });
      gsap.to(".product-window", { y: -10, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="hero">
      <nav className="nav">
        <div className="logo"><span className="logo-mark" />Lluna</div>
        <div className="nav-links">
          <a href="#product">Product</a>
          <a href="#solutions">Solutions</a>
          <a href="#company">Company</a>
          <a href="#resources">Resources</a>
        </div>
        <button className="nav-cta">Book a demo</button>
      </nav>

      <section className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">The intelligent customer workspace</div>
          <h1>Every conversation.<br />One intelligent workspace.</h1>
          <p>Lluna brings every customer interaction into one place, lets AI handle routine work, and surfaces the conversations that need your team.</p>
          <div className="hero-actions">
            <button className="primary">See Lluna in action <span>↗</span></button>
            <button className="secondary">Explore the platform</button>
          </div>
        </div>

        <div className="stage" aria-label="Lluna product simulation">
          <div className="orb" />
          <div className="product-window">
            <div className="window-top">
              <span className="dot" /><span className="dot" /><span className="dot" />
              <span className="window-title">Lluna / Inbox</span>
              <span className="live">LIVE</span>
            </div>
            <div className="window-body">
              <div className="ai-card">
                <div className="ai-label">AI ACTIVITY</div>
                <strong>Context understood</strong>
                <div style={{color:'#748099',fontSize:13,marginTop:7}}>Lluna is using conversation history to decide what happens next.</div>
              </div>
              <div className="intent">
                <span>Intent score</span>
                <div className="score">92<small style={{fontSize:13,color:'#9aa3b4'}}>/100</small></div>
                <span>● Warm lead</span>
              </div>
              <div className="status"><span className="pill ai">✓ AI handling</span><span className="pill intent">Intent detected</span></div>
            </div>
          </div>
        </div>
      </section>

      <div className="scroll-cue"><span>Live product simulation</span><span>·</span><span>scroll to see Lluna move from conversation to <b>action</b></span></div>
    </main>
  );
}
