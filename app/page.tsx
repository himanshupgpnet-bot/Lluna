"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaFacebookMessenger, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SiMeta } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const words = ["a Message.", "a Lead.", "a Booking.", "a Customer.", "a Sale."];
const channels = [
  { name: "WhatsApp", icon: <FaWhatsapp />, cls: "wa" },
  { name: "Instagram", icon: <FaInstagram />, cls: "ig" },
  { name: "Messenger", icon: <FaFacebookMessenger />, cls: "ms" },
  { name: "Meta Ads", icon: <SiMeta />, cls: "meta" },
];

function Channel({ name, icon, cls }: { name: string; icon: React.ReactNode; cls: string }) {
  return <div className={`channel ${cls}`}><span>{icon}</span>{name}</div>;
}

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const [word, setWord] = useState(words[0]);

  useEffect(() => {
    let interval: number | undefined;
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from(".nav", { y: -30, opacity: 0, duration: .8 })
        .from(".hero-eyebrow", { y: 25, opacity: 0, duration: .55 }, "-=.4")
        .from(".hero-line", { yPercent: 110, opacity: 0, duration: 1, stagger: .12 }, "-=.25")
        .from(".hero-sub", { y: 25, opacity: 0, duration: .7 }, "-=.45")
        .from(".hero-actions", { y: 20, opacity: 0, duration: .55 }, "-=.4")
        .from(".hero-stage", { y: 80, opacity: 0, scale: .94, duration: 1.2 }, "-=.45")
        .from(".channel", { y: 30, opacity: 0, scale: .7, duration: .5, stagger: .1 }, "-=.65");

      const rotateWord = () => {
        if (!wordRef.current) return;
        gsap.timeline({
          onComplete: () => setWord((current) => words[(words.indexOf(current) + 1) % words.length]),
        })
          .to(wordRef.current, { rotateX: -90, y: 24, opacity: 0, duration: .35, ease: "power2.in" })
          .set(wordRef.current, { rotateX: 90, y: -24 })
          .to(wordRef.current, { rotateX: 0, y: 0, opacity: 1, duration: .5, ease: "back.out(1.5)" });
      };
      interval = window.setInterval(rotateWord, 2600);

      gsap.to(".hero-orb", { y: -18, x: 12, duration: 4.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".hero-orb", { rotate: 360, duration: 45, repeat: -1, ease: "none" });
      gsap.to(".ring-a", { rotation: 360, duration: 32, repeat: -1, ease: "none" });
      gsap.to(".ring-b", { rotation: -360, duration: 48, repeat: -1, ease: "none" });
      gsap.to(".cursor-orb", { x: 22, y: -16, duration: 3.4, repeat: -1, yoyo: true, ease: "sine.inOut" });

      ScrollTrigger.create({
        trigger: ".hero", start: "top top", end: "+=950", scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(".hero-copy-block", { y: -p * 90, opacity: 1 - p * .7 });
          gsap.set(".hero-stage", { y: -p * 120, scale: 1 + p * .07, rotateX: p * 5 });
          gsap.set(".hero-device", { rotateY: -8 + p * 8, rotateX: 3 - p * 3 });
          gsap.set(".wave", { x: p * 35, scale: 1 + p * .12 });
        }
      });

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, { y: 70, opacity: 0, duration: .9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 82%" } });
      });
    }, root);

    return () => {
      if (interval !== undefined) window.clearInterval(interval);
      ctx.revert();
    };
  }, []);

  return (
    <main ref={root}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&display=swap');
        :root{--bg:#f4f4fa;--ink:#10162d;--muted:#68738d;--purple:#8052ff}
        *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--ink);font-family:'Inter Tight',Inter,system-ui,sans-serif}a{text-decoration:none;color:inherit}main{overflow:hidden}
        .nav{height:78px;position:fixed;top:0;left:0;right:0;z-index:50;display:flex;align-items:center;justify-content:space-between;padding:0 5vw;background:linear-gradient(180deg,rgba(244,244,250,.98),rgba(244,244,250,.72),transparent);backdrop-filter:blur(10px)}
        .brand{display:flex;align-items:center;gap:10px;font-size:19px;font-weight:600}.brand-mark{width:30px;height:30px;border-radius:10px;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,#285cff,#9d35ff)}
        .nav-links{display:flex;gap:34px;color:#727b91;font-size:13px}.nav-cta,.btn.primary{background:#10162d;color:#fff}.nav-cta{padding:11px 17px;border-radius:999px;font-size:12px}.hero{min-height:1180px;padding:145px 5vw 0;background:var(--bg);position:relative;text-align:center;perspective:1600px}.hero-copy-block{position:relative;z-index:10}.hero-eyebrow,.eyebrow{font-size:11px;letter-spacing:.2em;font-weight:600;color:var(--purple);text-transform:uppercase}.live{display:inline-flex;align-items:center;gap:8px}.live i{width:7px;height:7px;border-radius:50%;background:#23c66b;box-shadow:0 0 0 6px #23c66b18}.hero-title{font-size:clamp(70px,10vw,145px);line-height:.86;letter-spacing:-.075em;font-weight:600;margin:30px auto 0;max-width:1200px}.hero-line-wrap{display:block;overflow:hidden}.hero-line{display:block}.word-window{display:inline-block;min-width:5.8em;height:1.02em;vertical-align:-.09em;perspective:900px;color:var(--purple);overflow:hidden}.word-window span{display:inline-block;transform-origin:50% 50%;will-change:transform}.hero-sub{max-width:600px;margin:30px auto 0;color:var(--muted);font-size:18px;line-height:1.5}.hero-actions{display:flex;justify-content:center;gap:12px;margin-top:28px}.btn{display:inline-flex;align-items:center;gap:10px;padding:14px 20px;border-radius:999px;font-size:13px}.btn.secondary{border:1px solid #d7d7e2;background:#ffffff70}.hero-stage{position:relative;height:620px;max-width:1220px;margin:45px auto 0;transform-style:preserve-3d}.hero-glow{position:absolute;left:50%;top:40%;width:850px;height:450px;transform:translate(-50%,-50%);background:radial-gradient(circle,#9d6bff25,#6f7dff12 40%,transparent 72%);filter:blur(28px)}.hero-orb{position:absolute;left:50%;top:45%;width:520px;height:520px;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle at 28% 20%,#fff 0%,#efeaff 28%,#cbb7ff 62%,#9d73ff 100%);opacity:.8;box-shadow:inset -35px -45px 80px #7650c329,0 50px 130px #8052ff18}.ring{position:absolute;left:50%;top:45%;transform:translate(-50%,-50%) rotateX(67deg);border:1px solid #8052ff28;border-radius:50%}.ring-a{width:820px;height:280px}.ring-b{width:1040px;height:390px;border-color:#8052ff16;transform:translate(-50%,-50%) rotateX(68deg) rotateZ(20deg)}.hero-device{position:absolute;left:50%;top:48%;width:min(1000px,82vw);height:455px;transform:translate(-50%,-50%) rotateY(-8deg) rotateX(3deg);transform-style:preserve-3d;background:#fff;border:1px solid #fff;overflow:hidden;border-radius:26px;box-shadow:0 45px 110px #1a17341e}.device-top{height:52px;display:flex;align-items:center;gap:7px;padding:0 18px;border-bottom:1px solid #ececf2}.device-top i{width:8px;height:8px;border-radius:50%;background:#d9d9e2}.device-top b{margin-left:10px;color:#8790a4;font-size:11px}.device-top strong{margin-left:auto;color:#7c43ff;background:#f1ebff;border-radius:999px;padding:7px 11px;font-size:9px}.device-body{display:grid;grid-template-columns:21% 54% 25%;height:403px;background:#f7f7fb}.side{padding:18px 12px;border-right:1px solid #e6e6ee;background:#fff}.side .mini-brand{font-weight:600;font-size:12px;margin-bottom:22px}.side-row{height:34px;display:flex;align-items:center;padding:0 9px;color:#777f92;font-size:10px;border-radius:9px}.side-row.active{color:#fff;background:#8052ff}.conversation{position:relative;padding:17px;background:#f6f6fa}.conversation-head{height:45px;display:flex;align-items:center;justify-content:space-between}.customer{display:flex;gap:9px;align-items:center}.avatar{width:31px;height:31px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#14a88a,#0f8f7b);color:white;font-size:9px;font-weight:700}.customer b{display:block;font-size:11px}.customer small{display:block;color:#9199aa;font-size:8px}.hot{font-size:9px;color:#ee4c54;background:#fff0f0;padding:7px 9px;border-radius:999px}.bubble{max-width:72%;padding:14px;border-radius:15px;font-size:11px;line-height:1.5}.bubble.in{margin-top:24px;background:#fff;border:1px solid #ebebf0}.bubble.out{margin:12px 0 0 auto;background:linear-gradient(135deg,#8052ff,#9c5cff);color:#fff}.thinking{display:flex;align-items:center;gap:7px;width:max-content;margin:12px 0;padding:7px 10px;border-radius:999px;background:#eee9ff;color:#7951d9;font-size:8px}.thinking i{width:5px;height:5px;border-radius:50%;background:#8052ff;box-shadow:8px 0 #a98cff,16px 0 #d0c0ff}.intent{position:absolute;right:14px;top:92px;width:115px;padding:13px;background:#fff;border:1px solid #ececf2;border-radius:15px;box-shadow:0 15px 35px #14122610}.intent small{display:block;color:#9199aa;font-size:8px}.intent strong{display:block;font-size:34px;letter-spacing:-.07em;margin:3px 0}.bar{height:4px;background:#ececf3;border-radius:99px;overflow:hidden}.bar i{display:block;width:86%;height:100%;background:linear-gradient(90deg,#8052ff,#b96bff);border-radius:99px}.intel{padding:18px;background:#fff;border-left:1px solid #e6e6ee}.intel-label{font-size:8px;letter-spacing:.13em;color:#9aa1b0}.intel h3{font-size:16px;margin:14px 0 7px}.intel p{font-size:9px;line-height:1.5;color:#8790a4}.intel-card{margin-top:18px;padding:13px;border:1px solid #e7e3f4;border-radius:14px;background:#faf9ff}.intel-card span{font-size:8px;color:#8b92a3}.intel-card strong{display:block;font-size:28px;margin-top:4px}.trace{margin-top:15px;font-size:8px;color:#39a76a}.channel{position:absolute;z-index:15;display:flex;align-items:center;gap:9px;padding:9px 13px 9px 9px;background:#fff;border:1px solid #e1e1e9;border-radius:999px;box-shadow:0 18px 45px #15132913;font-size:11px;color:#596176}.channel span{width:29px;height:29px;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:14px}.wa{left:6%;top:38%}.wa span{background:#25d366}.ig{right:7%;top:31%}.ig span{background:linear-gradient(135deg,#feda75,#d62976,#4f5bd5)}.ms{left:11%;bottom:18%}.ms span{background:#168aff}.meta{right:12%;bottom:12%}.meta span{background:#111}.hero-note{position:absolute;left:50%;bottom:7px;transform:translateX(-50%);font-size:10px;color:#9aa0b0;letter-spacing:.12em;text-transform:uppercase}.cursor-orb{position:absolute;left:72%;top:27%;width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 0 0 8px #8052ff18,0 10px 30px #8052ff35;z-index:20}.wave{position:absolute;left:50%;top:49%;width:1200px;height:420px;transform:translate(-50%,-50%);opacity:.48;z-index:1}.wave path{fill:none;stroke:#8052ff;stroke-width:1.1}
        .below{padding:150px 7vw;background:#fff}.below h2{font-size:clamp(55px,7vw,96px);line-height:.92;letter-spacing:-.07em;margin:25px 0}.below h2 span{color:#9da1ae}.below p{max-width:620px;color:#70798e;font-size:18px;line-height:1.6}.feature-row{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:80px}.feature{padding:28px;min-height:210px;border:1px solid #e4e4eb;border-radius:24px;background:#fafafd}.feature b{color:#8052ff;font-size:10px;letter-spacing:.15em}.feature h3{font-size:23px;margin:28px 0 8px}.feature p{font-size:14px;margin:0}.dark{background:#10121e;color:#fff}.dark p{color:#a9afbd}.metrics{display:grid;grid-template-columns:repeat(3,1fr);margin-top:75px;border-top:1px solid #ffffff20}.metric{padding:38px 20px 20px 0;border-right:1px solid #ffffff18}.metric strong{display:block;font-size:clamp(55px,7vw,100px);letter-spacing:-.08em}.metric span{font-size:.3em;color:#aeb4c0}.metric p{font-size:14px;max-width:240px}.final{padding:160px 7vw;text-align:center;background:linear-gradient(135deg,#eee7ff,#f7f5fb)}.final h2{font-size:clamp(60px,8vw,110px);line-height:.9;letter-spacing:-.075em;margin:24px 0}.final h2 span{color:#8052ff}.final p{max-width:560px;margin:0 auto 30px;color:#70798e;line-height:1.6}.footer{padding:35px 5vw;display:flex;justify-content:space-between;color:#8b91a0;background:#fff;font-size:11px}
        @media(max-width:900px){.nav-links{display:none}.hero{min-height:980px;padding-top:125px}.hero-title{font-size:clamp(60px,12vw,100px)}.hero-stage{height:520px}.hero-device{width:94vw;transform:translate(-50%,-50%) rotateY(-5deg) scale(.82)}.hero-orb{width:430px;height:430px}.ring-a{width:650px}.ring-b{width:800px}.channel{font-size:9px}.feature-row,.metrics{grid-template-columns:1fr}.below,.dark,.final{padding-left:6vw;padding-right:6vw}.metric{border-right:0;border-bottom:1px solid #ffffff18}}
        @media(max-width:620px){.nav{padding:0 5vw}.nav-cta{padding:9px 13px}.hero{min-height:820px;padding-top:115px}.hero-title{font-size:52px}.hero-sub{font-size:15px;margin-top:22px}.hero-stage{height:390px}.hero-orb{width:290px;height:290px}.ring-a{width:430px;height:180px}.ring-b{width:520px;height:230px}.hero-device{height:300px;width:96vw;transform:translate(-50%,-50%) rotateY(-4deg) scale(.58)}.device-top{height:35px;padding:0 10px}.device-body{height:265px;grid-template-columns:23% 52% 25%}.side{padding:10px 5px}.side-row{height:25px;font-size:7px;padding:0 5px}.conversation{padding:8px}.conversation-head{height:28px}.avatar{width:20px;height:20px;font-size:6px}.customer b{font-size:7px}.customer small,.hot{font-size:5px}.bubble{font-size:7px;padding:8px}.thinking{font-size:5px}.intent{width:65px;padding:7px;right:5px;top:55px}.intent strong{font-size:20px}.intel{padding:8px}.intel h3{font-size:9px}.intel p,.trace{font-size:6px}.channel{padding:6px 8px 6px 6px;font-size:7px}.channel span{width:20px;height:20px;font-size:10px}.wa{left:-2%}.ig{right:-2%}.ms{left:0;bottom:12%}.meta{right:0;bottom:7%}.cursor-orb{display:none}.hero-note{font-size:7px}.below h2{font-size:50px}.below p{font-size:15px}.feature{min-height:auto}.footer{display:block}.footer span{display:block;margin-top:8px}}
      ` }} />
      <nav className="nav"><a className="brand" href="#"><span className="brand-mark">L</span>Lluna</a><div className="nav-links"><a href="#product">Product</a><a href="#intelligence">Intelligence</a><a href="#results">Results</a></div><a className="nav-cta" href="#demo">Book a demo ↗</a></nav>
      <section className="hero" id="product"><div className="hero-copy-block"><div className="hero-eyebrow live"><i/> AI-POWERED CUSTOMER CONVERSATIONS</div><h1 className="hero-title"><span className="hero-line-wrap"><span className="hero-line">Every conversation</span></span><span className="hero-line-wrap"><span className="hero-line">becomes <span className="word-window"><span ref={wordRef}>{word}</span></span></span></span></h1><p className="hero-sub">Lluna brings every customer interaction into one intelligent workspace — understanding intent, qualifying leads, following up and helping your team convert.</p><div className="hero-actions"><a className="btn primary" href="#intelligence">See Lluna in action ↓</a><a className="btn secondary" href="#demo">Book a demo ↗</a></div></div>
        <div className="hero-stage"><div className="hero-glow"/><div className="hero-orb"/><div className="ring ring-a"/><div className="ring ring-b"/><svg className="wave" viewBox="0 0 1200 420" aria-hidden="true"><path d="M-80 255 C120 90 290 90 500 255 S900 420 1280 165"/><path d="M-80 285 C120 120 290 120 500 285 S900 450 1280 195"/><path d="M-80 225 C120 60 290 60 500 225 S900 390 1280 135"/></svg><div className="cursor-orb"/>
          <div className="hero-device"><div className="device-top"><i/><i/><i/><b>Lluna / Intelligent Inbox</b><strong>● LIVE</strong></div><div className="device-body"><aside className="side"><div className="mini-brand">◉ Lluna</div><div className="side-row active">▣ Inbox</div><div className="side-row">◎ Leads</div><div className="side-row">◈ Broadcast</div><div className="side-row">▥ Analytics</div><div className="side-row">⌁ Connect</div></aside><div className="conversation"><div className="conversation-head"><div className="customer"><span className="avatar">AM</span><div><b>Ahmad Malik</b><small>WhatsApp · active now</small></div></div><span className="hot">🔥 Hot lead</span></div><div className="bubble in">Hi, is the Growth plan still available?</div><div className="thinking"><i/> Lluna is understanding context</div><div className="bubble out">Yes — it's available. I can help you choose the right option and get you booked.</div><div className="intent"><small>Intent score</small><strong>86</strong><div className="bar"><i/></div></div></div><aside className="intel"><div className="intel-label">LLUNA INTELLIGENCE</div><h3>Context understood</h3><p>Conversation history, knowledge and intent are being used to decide what happens next.</p><div className="intel-card"><span>Lead score</span><strong>86 <small>/100</small></strong><div className="bar"><i/></div></div><div className="trace">✓ Response grounded in business knowledge</div></aside></div></div>
          {channels.map((c) => <Channel key={c.name} {...c} />)}<div className="hero-note">ONE INTELLIGENT WORKSPACE · MESSAGE → UNDERSTAND → QUALIFY → ACT</div>
        </div></section>
      <section className="below reveal" id="intelligence"><div className="eyebrow">01 — INTELLIGENCE</div><h2>Don't just answer.<br/><span>Understand.</span></h2><p>Lluna reads the conversation before it responds. It uses your Knowledge Base, conversation history and customer intent to decide what should happen next.</p><div className="feature-row"><article className="feature"><b>01 — CONTEXT</b><h3>Knows what they mean.</h3><p>Understands the conversation instead of treating every message as a new question.</p></article><article className="feature"><b>02 — INTENT</b><h3>Knows who is ready.</h3><p>Scores conversations from 0–100 and surfaces hot leads to your team.</p></article><article className="feature"><b>03 — ACTION</b><h3>Knows what to do.</h3><p>Reply, follow up, alert a human or help move the customer toward booking.</p></article></div></section>
      <section className="below dark reveal" id="results"><div className="eyebrow">02 — OUTCOMES</div><h2>Less manual work.<br/><span>More business happening.</span></h2><p>One intelligent layer across your customer conversations, built around measurable business outcomes.</p><div className="metrics"><div className="metric"><strong>24<span>/7</span></strong><p>Customer engagement without adding shifts.</p></div><div className="metric"><strong>80<span>–90%</span></strong><p>Potential automation across routine conversations.</p></div><div className="metric"><strong>1<span> workspace</span></strong><p>WhatsApp, Instagram, Facebook and Meta Ads connected.</p></div></div></section>
      <section className="final" id="demo"><div className="eyebrow">READY TO GROW?</div><h2>Turn every conversation<br/><span>into an opportunity.</span></h2><p>See how Lluna can help your team respond faster, qualify smarter and follow up without the manual work.</p><a className="btn primary" href="mailto:hello@lluna.ai">Book a Lluna demo ↗</a></section><footer className="footer"><span>Lluna · AI-powered customer conversations.</span><span>© 2026 Lluna</span></footer>
    </main>
  );
}
