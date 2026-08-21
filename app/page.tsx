"use client";

import { useEffect, useRef, useState } from "react";
import { FaFacebookMessenger, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SiMeta, SiTelegram } from "react-icons/si";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const channels = [
  { name: "WhatsApp", icon: <FaWhatsapp />, cls: "wa" },
  { name: "Instagram", icon: <FaInstagram />, cls: "ig" },
  { name: "Messenger", icon: <FaFacebookMessenger />, cls: "fb" },
  { name: "Meta Ads", icon: <SiMeta />, cls: "meta" },
];

function ChannelIcon({ cls, children }: { cls: string; children: React.ReactNode }) {
  return <span className={`channel-icon ${cls}`}>{children}</span>;
}

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const [score, setScore] = useState(42);
  const [phase, setPhase] = useState("Reading conversation");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro.from(".nav", { y: -24, opacity: 0, duration: .8 })
        .from(".hero-kicker", { y: 20, opacity: 0, duration: .55 }, "-=.35")
        .from(".hero-line", { yPercent: 110, opacity: 0, duration: .9, stagger: .1 }, "-=.25")
        .from(".hero-copy", { y: 25, opacity: 0, duration: .7 }, "-=.45")
        .from(".hero-device", { y: 70, opacity: 0, scale: .9, rotateX: 14, duration: 1.2 }, "-=.55")
        .from(".hero-channel", { scale: .4, opacity: 0, duration: .5, stagger: .08 }, "-=.7");

      gsap.to(".hero-orbit-ring", { rotation: 360, duration: 35, repeat: -1, ease: "none" });
      gsap.to(".hero-device", { y: -10, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".hero-glow", { scale: 1.12, opacity: .7, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, { y: 65, opacity: 0, duration: .9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 82%" } });
      });

      ScrollTrigger.create({
        trigger: ".product-story", start: "top top", end: "+=1900", pin: ".product-visual", scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          const s = Math.round(42 + p * 48);
          setScore(s);
          setPhase(p < .22 ? "Reading conversation" : p < .46 ? "Understanding intent" : p < .7 ? "AI qualifying lead" : "Human attention recommended");
          gsap.to(".product-window", { rotateY: -7 + p * 7, rotateX: 2 - p * 2, scale: 1 + p * .025, duration: .15, overwrite: true });
          gsap.to(".ai-answer", { opacity: p > .25 ? 1 : 0, y: p > .25 ? 0 : 16, duration: .2, overwrite: true });
          gsap.to(".lead-alert", { opacity: p > .58 ? 1 : 0, scale: p > .58 ? 1 : .85, duration: .2, overwrite: true });
          gsap.to(".score-fill", { width: `${s}%`, duration: .2, overwrite: true });
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={root}>
      <nav className="nav">
        <a className="brand" href="#"><span className="brand-mark">L</span><span>Lluna</span></a>
        <div className="nav-links"><a href="#product">Product</a><a href="#outcomes">Outcomes</a><a href="#channels">Channels</a><a href="#results">Results</a></div>
        <a className="nav-cta" href="#demo">Book a demo <span>↗</span></a>
      </nav>

      <section className="hero">
        <div className="hero-kicker"><span className="live-dot"/> AI CUSTOMER CONVERSATION PLATFORM</div>
        <h1 className="hero-title"><span className="hero-line-wrap"><span className="hero-line">Turn conversations</span></span><span className="hero-line-wrap"><span className="hero-line">into <em>real growth.</em></span></span></h1>
        <div className="hero-copy"><p>Lluna brings WhatsApp, Instagram, Facebook and your Meta ads into one intelligent workspace — so AI can respond, qualify, follow up and help your team close more bookings.</p><a className="primary-button" href="#product">See Lluna in action <span>↓</span></a></div>

        <div className="hero-visual">
          <div className="hero-glow"/><div className="hero-orbit-ring"/>
          <div className="hero-device">
            <div className="device-bar"><span/><span/><span/><b>Lluna / Command Center</b><i>LIVE</i></div>
            <div className="device-grid">
              <aside><div className="side-logo"><span>L</span> Lluna</div><div className="side-active">▣ Inbox <b>74</b></div><div>◎ Leads <b>99+</b></div><div>◈ Broadcast</div><div>▥ Analytics</div><div>⌁ Connect</div></aside>
              <div className="device-main"><div className="mini-stat"><span>AI handling</span><strong>87%</strong></div><div className="chat-card"><div className="chat-head"><span className="avatar">AM</span><div><b>Ahmad Malik</b><small>WhatsApp · active now</small></div><strong>HOT</strong></div><div className="msg customer-msg">Hi, is the Growth plan available?</div><div className="thinking"><span/> Lluna is understanding the conversation</div><div className="msg ai-msg">Yes — it's available. I can help you choose the right option and get you booked.</div><div className="intent-card"><span>Intent score</span><b>86</b><div className="tiny-bar"><i/></div></div></div></div>
            </div>
          </div>
          {channels.map((c, i) => <div className={`hero-channel hc-${i}`} key={c.name}><ChannelIcon cls={c.cls}>{c.icon}</ChannelIcon><span>{c.name}</span></div>)}
          <div className="hero-orbit-label">ONE INTELLIGENT WORKSPACE</div>
        </div>
      </section>

      <section className="statement reveal" id="outcomes"><div className="eyebrow">THE PROBLEM</div><h2>Customers don't wait.<br/><span>Your team shouldn't have to either.</span></h2><p>Slow replies, repetitive questions, forgotten follow-ups and disconnected channels quietly turn marketing spend into lost opportunities.</p><div className="problem-row"><div><b>01</b><strong>Slow replies</strong><span>Leads move on before your team responds.</span></div><div><b>02</b><strong>Manual follow-ups</strong><span>Good leads go cold when nobody remembers.</span></div><div><b>03</b><strong>No visibility</strong><span>Your team can't see who is ready to buy.</span></div><div><b>04</b><strong>Ad blind spots</strong><span>You spend, but don't see which ads book.</span></div></div></section>

      <section className="product-story" id="product">
        <div className="story-copy reveal"><div className="eyebrow">01 — INBOX</div><h2>Every conversation.<br/>One intelligent workspace.</h2><p>Every customer interaction comes together in one clean inbox. Lluna reads the conversation, understands context and surfaces what your team needs to act on.</p><div className="story-steps"><span className="active">Conversation</span><span>Understanding</span><span>Intent</span><span>Action</span></div></div>
        <div className="product-visual"><div className="product-window"><div className="window-top"><div className="dots"><i/><i/><i/></div><span>Lluna / Inbox</span><b>● LIVE</b></div><div className="window-body"><aside className="inbox-list"><div className="search-box">⌕ Search conversations...</div><div className="filter-row"><b>All</b><span>Unread</span><span>Hot</span></div>{[["AM","Ahmad Malik","Is the Growth plan available?"],["SL","Sarah Lee","I'll check my schedule"],["JW","James Wong","Can I book Friday?"]].map((x,i)=><div className={`contact ${i===0?"selected":""}`} key={x[0]}><span className="avatar">{x[0]}</span><div><b>{x[1]}</b><small>{x[2]}</small></div><i>{i*8+2}m</i></div>)}</aside><div className="conversation-panel"><div className="conversation-title"><div><b>Ahmad Malik</b><small>WhatsApp · Customer</small></div><span className="hot-pill">🔥 Hot</span></div><div className="chat-flow"><div className="msg customer-msg">Hi, is the Growth plan still available?</div><div className="ai-thinking"><span/> {phase}</div><div className="msg ai-msg ai-answer">Yes — here's exactly what the Growth plan includes. I can also help you find the best option and book a time.</div><div className="lead-alert"><span>🔥</span><div><b>HOT LEAD DETECTED</b><small>Customer shows strong purchase intent</small></div><strong>{score}</strong></div></div></div><aside className="insight-panel"><small>LLUNA INTELLIGENCE</small><h3>Context understood</h3><p>Conversation history and intent are being used to decide what happens next.</p><div className="score-box"><span>Intent score</span><strong>{score}<small>/100</small></strong><div className="score-track"><i className="score-fill"/></div><b>🔥 Hot lead</b></div><div className="trace">✓ Response grounded in business knowledge</div></aside></div></div></div>
      </section>

      <section className="feature-section reveal"><div className="eyebrow">02 — LEAD INTELLIGENCE</div><div className="feature-grid"><div><h2>Stop treating every lead the same.</h2><p>Lluna automatically scores every conversation from 0–100 and tells your team who needs attention now.</p></div><div className="lead-demo"><div className="lead-demo-head"><span>Lead pipeline</span><b>AI classified</b></div><div className="lead-line hot"><span>🔥</span><div><b>Ready to book</b><small>Pricing + availability asked</small></div><strong>86</strong></div><div className="lead-line warm"><span>🟡</span><div><b>Needs nurturing</b><small>Interested · no decision yet</small></div><strong>55</strong></div><div className="lead-line cold"><span>🔵</span><div><b>Early stage</b><small>Browsing / information</small></div><strong>18</strong></div></div></div></section>

      <section className="dark-results" id="results"><div className="eyebrow">03 — OUTCOMES</div><div className="result-head"><h2>Less manual work.<br/><span>More business happening.</span></h2><p>Every Lluna feature is designed around a business outcome: faster response, better qualification, more follow-ups and more visibility into revenue.</p></div><div className="big-metrics"><div><strong>80–90<span>%</span></strong><p>of conversations can be handled automatically.</p></div><div><strong>24<span>/7</span></strong><p>Customer engagement without adding shifts.</p></div><div><strong>1<span> workspace</span></strong><p>Across the channels your customers already use.</p></div></div></section>

      <section className="channels-section" id="channels"><div className="eyebrow reveal">04 — CONNECT</div><h2 className="reveal">Meet customers<br/><span>where they already are.</span></h2><p className="reveal">Connect the channels, intelligence and actions behind every customer conversation.</p><div className="channel-universe"><div className="universe-glow"/><div className="universe-core"><span>L</span><b>Lluna</b><small>INTELLIGENT LAYER</small></div>{channels.map((c,i)=><div className={`orbit-channel oc-${i}`} key={c.name}><ChannelIcon cls={c.cls}>{c.icon}</ChannelIcon><b>{c.name}</b></div>)}<div className="orbit-line line-a"/><div className="orbit-line line-b"/></div></section>

      <section className="workflow reveal"><div className="eyebrow">05 — FROM MESSAGE TO REVENUE</div><h2>One conversation.<br/><span>Four intelligent actions.</span></h2><div className="workflow-track"><div><b>01</b><strong>Listen</strong><span>Capture every message.</span></div><i>→</i><div><b>02</b><strong>Understand</strong><span>Use context + knowledge.</span></div><i>→</i><div><b>03</b><strong>Qualify</strong><span>Score intent automatically.</span></div><i>→</i><div><b>04</b><strong>Act</strong><span>Follow up, alert or book.</span></div></div></section>

      <section className="final-cta" id="demo"><div className="eyebrow">READY TO GROW?</div><h2>Turn every conversation<br/><span>into an opportunity.</span></h2><p>See how Lluna can help your business respond faster, follow up smarter and convert more of the leads you're already paying for.</p><a className="primary-button" href="mailto:hello@lluna.ai">Book a Lluna demo <span>↗</span></a></section>
      <footer><div className="brand"><span className="brand-mark">L</span> Lluna</div><span>AI-powered customer conversations.</span><span>© 2026 Lluna</span></footer>
    </main>
  );
}
