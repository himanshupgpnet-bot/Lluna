"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const channels = ["WhatsApp", "Instagram", "Facebook", "TikTok"];

export default function Home() {
  const page = useRef<HTMLElement>(null);
  const [intent, setIntent] = useState(42);
  const [status, setStatus] = useState("Reading conversation");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro.from(".nav", { y: -20, opacity: 0, duration: .8 })
        .from(".hero-kicker", { y: 24, opacity: 0, duration: .7 }, "-=.45")
        .from(".hero-title .line", { yPercent: 110, opacity: 0, duration: 1, stagger: .08 }, "-=.4")
        .from(".hero-copy-bottom", { y: 20, opacity: 0, duration: .7 }, "-=.55")
        .from(".hero-stage", { scale: .92, opacity: 0, rotateX: 8, duration: 1.2 }, "-=.8")
        .from(".channel-chip", { scale: .7, opacity: 0, duration: .5, stagger: .08 }, "-=.8");

      gsap.to(".hero-orbit", { rotate: 360, duration: 28, repeat: -1, ease: "none" });
      gsap.to(".hero-core", { y: -8, duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut" });

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, { y: 55, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 82%" } });
      });

      ScrollTrigger.create({
        trigger: ".inbox-section", start: "top top", end: "+=1700", pin: ".inbox-stage", scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          setIntent(Math.round(42 + p * 50));
          setStatus(p < .25 ? "Reading conversation" : p < .5 ? "Understanding intent" : p < .75 ? "AI responding" : "Human attention recommended");
          gsap.to(".inbox-product", { rotateY: -8 + p * 8, rotateX: 2 - p * 2, scale: 1 + p * .035, duration: .15, overwrite: true });
          gsap.to(".conversation-response", { opacity: p > .35 ? 1 : 0, y: p > .35 ? 0 : 14, duration: .2, overwrite: true });
          gsap.to(".hot-lead", { opacity: p > .68 ? 1 : 0, scale: p > .68 ? 1 : .8, duration: .2, overwrite: true });
        }
      });
    }, page);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={page}>
      <nav className="nav"><a className="brand" href="#"><span className="brand-mark">L</span><span>Lluna</span></a><div className="nav-links"><a href="#product">Product</a><a href="#results">Results</a><a href="#connect">Connect</a><a href="#company">Company</a></div><a className="nav-button" href="#demo">Book a demo <span>↗</span></a></nav>

      <section className="hero"><div className="hero-kicker"><span className="live-dot" /> AI CUSTOMER CONVERSATION PLATFORM</div><h1 className="hero-title"><span className="line-wrap"><span className="line">Transform every</span></span><span className="line-wrap"><span className="line">interaction into</span></span><span className="line-wrap gradient-line"><span className="line">measurable growth.</span></span></h1><div className="hero-copy-bottom"><p>Lluna understands your customers, automates engagement, and turns conversations into qualified leads, bookings, and revenue.</p><a className="primary-button" href="#product">Explore Lluna <span>↓</span></a></div><div className="hero-stage"><div className="hero-glow" /><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-core"><div className="core-inner"><span>LLUNA</span><b>AI</b></div></div>{channels.map((channel, i) => <div key={channel} className={`channel-chip chip-${i}`}><i />{channel}</div>)}<div className="hero-caption"><span>04 channels</span><span>01 intelligent workspace</span></div></div></section>

      <section className="intro-section" id="product"><div className="section-number">00 / THE PRODUCT</div><div className="intro-grid reveal"><h2>Your customers are everywhere.<br /><em>Your intelligence should be too.</em></h2><p>One place for every conversation. One layer of intelligence across every channel. One clear view of what needs to happen next.</p></div></section>

      <section className="inbox-section" id="inbox"><div className="inbox-copy reveal"><div className="section-number">01 / INBOX</div><h2>Every conversation.<br />One intelligent workspace.</h2><p>Lluna brings every customer interaction together so your team can focus on the conversations that matter.</p><div className="process"><span className="active">Conversation</span><span>Understanding</span><span>Intent</span><span>Action</span></div></div><div className="inbox-stage"><div className="inbox-product"><div className="product-top"><div className="mini-brand"><span className="mini-mark">L</span> Lluna</div><span className="product-live">LIVE</span></div><div className="product-body"><aside><div className="search">⌕ Search conversations</div><div className="person selected"><span className="avatar">AM</span><span><b>Ahmad Malik</b><small>Is the Growth plan available?</small></span><i>2m</i></div><div className="person"><span className="avatar pink">SL</span><span><b>Sarah Lee</b><small>Thanks, I'll check.</small></span><i>12m</i></div><div className="person"><span className="avatar green">JW</span><span><b>James Wong</b><small>Can I book Friday?</small></span><i>28m</i></div></aside><div className="conversation"><div className="conversation-head"><div><b>Ahmad Malik</b><small>WhatsApp · active now</small></div><span className="score-badge">Intent {intent}</span></div><div className="messages"><div className="bubble customer">Hi, I want to know if the Growth plan is available?</div><div className="ai-state"><span className="pulse" /> {status}</div><div className="bubble ai conversation-response">Yes — the Growth plan is available. I can also help you find the best option and get you booked.</div><div className="hot-lead"><span>🔥</span><div><b>HOT LEAD</b><small>High purchase intent detected</small></div></div></div></div><div className="insight"><small>LLUNA INSIGHT</small><b>Context understood</b><p>Customer asked about availability after discussing the Growth plan.</p><div className="insight-score"><span>Intent</span><strong>{intent}<small>/100</small></strong></div></div></div></div></div></section>

      <section className="metric-section" id="results"><div className="section-number reveal">02 / OUTCOMES</div><div className="metric-head reveal"><h2>Less manual work.<br /><span>More business happening.</span></h2><p>Lluna is designed around outcomes your team can actually measure.</p></div><div className="metrics"><div className="metric reveal"><strong>24<span>/7</span></strong><p>AI-powered customer engagement</p></div><div className="metric reveal"><strong>1<span> inbox</span></strong><p>Every channel, one workspace</p></div><div className="metric reveal"><strong>100<span>%</span></strong><p>Traceable AI responses</p></div></div></section>

      <section className="story-section"><div className="section-number">03 / INTELLIGENCE</div><div className="story-copy reveal"><h2>It doesn't just read the message.<br /><span>It understands the conversation.</span></h2><p>Context, history, intent and business knowledge come together before Lluna decides what to do next.</p></div><div className="flow reveal"><div>MESSAGE</div><b>→</b><div>CONTEXT</div><b>→</b><div>INTENT</div><b>→</b><div>ACTION</div></div></section>

      <section className="connect-section" id="connect"><div className="section-number">04 / CONNECT</div><div className="connect-copy reveal"><h2>Your channels.<br />One intelligent layer.</h2><p>Meet customers where they already are. Lluna connects the conversation, the context and the action.</p></div><div className="connect-orbit"><div className="connect-center">Lluna<br /><small>AI</small></div>{channels.map((c,i)=><div className={`connect-chip c-${i}`} key={c}>{c}</div>)}</div></section>

      <section className="final-section" id="demo"><div className="final-kicker">READY WHEN YOU ARE</div><h2>Every conversation<br /><span>is an opportunity.</span></h2><a className="primary-button" href="mailto:hello@lluna.ai">Book a demo <span>↗</span></a><p>See what Lluna can automate for your business.</p></section><footer><span>© 2026 Lluna</span><span>Intelligent customer conversations.</span></footer>
    </main>
  );
}
