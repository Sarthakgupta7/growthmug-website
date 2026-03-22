// import { useState, useEffect, useRef } from "react";

// // ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
// const C = {
//   bg:          "#080604",
//   bgDeep:      "#050402",
//   card:        "#100D09",
//   cardHover:   "#181310",
//   brown:       "#6B3F1A",
//   brownMid:    "#8B5230",
//   brownLight:  "#A0683C",
//   orange:      "#E07B39",
//   orangeLight: "#F09450",
//   orangeGlow:  "#E07B3944",
//   cream:       "#F5E6D3",
//   creamDim:    "#C4A882",
//   creamFaint:  "#7A6858",
//   white:       "#FFFFFF",
//   green:       "#25D366",
// };

// // ─── UTILS ────────────────────────────────────────────────────────────────────
// const useInView = (threshold = 0.12) => {
//   const ref = useRef(null);
//   const [inView, setInView] = useState(false);
//   useEffect(() => {
//     const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, []);
//   return [ref, inView];
// };

// const useCountUp = (target, inView, duration = 2200) => {
//   const [val, setVal] = useState(0);
//   useEffect(() => {
//     if (!inView) return;
//     let start = null;
//     const step = (ts) => {
//       if (!start) start = ts;
//       const p = Math.min((ts - start) / duration, 1);
//       const ease = 1 - Math.pow(1 - p, 3);
//       setVal(Math.floor(ease * target));
//       if (p < 1) requestAnimationFrame(step);
//     };
//     requestAnimationFrame(step);
//   }, [inView, target, duration]);
//   return val;
// };

// const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

// // ─── BUTTON ───────────────────────────────────────────────────────────────────
// const Btn = ({ children, onClick, variant = "primary", size = "md", style: extra = {} }) => {
//   const [hov, setHov] = useState(false);
//   const base = {
//     display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer",
//     fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "0.2px",
//     border: "none", borderRadius: 10, transition: "all 0.25s cubic-bezier(.4,0,.2,1)",
//   };
//   const sizes = { sm: { padding: "9px 18px", fontSize: 13 }, md: { padding: "13px 28px", fontSize: 15 }, lg: { padding: "16px 36px", fontSize: 16 } };
//   const variants = {
//     primary: {
//       background: hov ? C.orangeLight : C.orange,
//       color: C.white,
//       boxShadow: hov ? `0 16px 48px ${C.orange}66, 0 4px 16px ${C.orange}44` : `0 6px 24px ${C.orange}44`,
//       transform: hov ? "translateY(-2px)" : "translateY(0)",
//     },
//     ghost: {
//       background: "transparent",
//       color: hov ? C.orange : C.creamDim,
//       border: `1.5px solid ${hov ? C.orange : C.brown + "66"}`,
//       transform: hov ? "translateY(-2px)" : "translateY(0)",
//     },
//     whatsapp: {
//       background: hov ? "#1ebe5d" : C.green,
//       color: C.white,
//       boxShadow: hov ? `0 12px 40px ${C.green}55` : `0 6px 24px ${C.green}44`,
//       transform: hov ? "translateY(-2px)" : "translateY(0)",
//     },
//   };
//   return (
//     <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//       style={{ ...base, ...sizes[size], ...variants[variant], ...extra }}>
//       {children}
//     </button>
//   );
// };

// // ─── LOGO ─────────────────────────────────────────────────────────────────────
// const Logo = () => (
//   <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
//     <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
//       <rect width="40" height="40" rx="11" fill={C.orange} />
//       <rect x="7" y="18" width="17" height="14" rx="2.5" fill={C.bg} />
//       <path d="M24 21 Q32 21 32 25.5 Q32 30 24 30" stroke={C.bg} strokeWidth="2.4" fill="none" strokeLinecap="round" />
//       <polyline points="11,15 11,7 22,7 22,15" stroke={C.cream} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
//       <polyline points="19,10 22,7 25,10" stroke={C.cream} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>
//     <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: C.cream, letterSpacing: "-0.5px" }}>
//       Growth<span style={{ color: C.orange }}>Mug</span>
//     </span>
//   </div>
// );

// // ─── NAVBAR ───────────────────────────────────────────────────────────────────
// const Navbar = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const [open, setOpen] = useState(false);
//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 30);
//     window.addEventListener("scroll", fn);
//     return () => window.removeEventListener("scroll", fn);
//   }, []);

//   const links = ["Services", "Portfolio", "Results", "Testimonials", "FAQ", "Contact"];

//   return (
//     <>
//       <nav style={{
//         position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
//         height: 68, padding: "0 32px",
//         display: "flex", alignItems: "center", justifyContent: "space-between",
//         background: scrolled ? "rgba(8,6,4,0.72)" : "rgba(8,6,4,0.35)",
//         backdropFilter: "blur(18px) saturate(180%)",
//         WebkitBackdropFilter: "blur(18px) saturate(180%)",
//         borderBottom: `1px solid rgba(107,63,26,${scrolled ? "0.35" : "0.15"})`,
//         boxShadow: scrolled ? `0 8px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(224,123,57,0.08)` : "none",
//         transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
//       }}>
//         <Logo />

//         {/* Desktop */}
//         <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="gm-nav-links">
//           {links.map(l => {
//             const [h, setH] = useState(false);
//             return (
//               <button key={l} onClick={() => scrollTo(l.toLowerCase())}
//                 onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
//                 style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: h ? C.orange : C.creamDim, transition: "color 0.2s", letterSpacing: "0.3px" }}>
//                 {l}
//               </button>
//             );
//           })}
//           <Btn onClick={() => scrollTo("contact")} size="sm">Free Audit ☕</Btn>
//         </div>

//         {/* Hamburger */}
//         <button onClick={() => setOpen(!open)} className="gm-hamburger"
//           style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: C.cream, fontSize: 26, lineHeight: 1 }}>
//           {open ? "✕" : "☰"}
//         </button>
//       </nav>

//       {/* Mobile drawer */}
//       <div style={{
//         position: "fixed", top: 68, left: 0, right: 0, zIndex: 199,
//         background: "rgba(8,6,4,0.97)", backdropFilter: "blur(20px)",
//         borderBottom: `1px solid ${C.brown}33`,
//         padding: open ? "24px 28px 32px" : "0 28px",
//         maxHeight: open ? 500 : 0, overflow: "hidden",
//         transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
//         display: "flex", flexDirection: "column", gap: open ? 18 : 0,
//       }} className="gm-mobile-menu">
//         {links.map(l => (
//           <button key={l} onClick={() => { scrollTo(l.toLowerCase()); setOpen(false); }}
//             style={{ background: "none", border: "none", cursor: "pointer", color: C.cream, fontSize: 17, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, textAlign: "left", padding: "4px 0", borderBottom: `1px solid ${C.brown}22` }}>
//             {l}
//           </button>
//         ))}
//         <Btn onClick={() => { scrollTo("contact"); setOpen(false); }}>Get Free Audit ☕</Btn>
//       </div>
//     </>
//   );
// };

// // ─── HERO ─────────────────────────────────────────────────────────────────────
// const Hero = () => {
//   const [loaded, setLoaded] = useState(false);
//   useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

//   const anim = (delay) => ({
//     opacity: loaded ? 1 : 0,
//     transform: loaded ? "translateY(0)" : "translateY(28px)",
//     transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
//   });

//   return (
//     <section style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "100px 24px 80px" }}>

//       {/* BG image + overlays */}
//       <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
//         <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1600&q=80&auto=format&fit=crop" alt="café background"
//           style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", filter: "brightness(0.22) saturate(1.3)" }} />
//         <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${C.bgDeep} 0%, rgba(8,6,4,0.6) 50%, ${C.bgDeep} 100%)` }} />
//         <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 60% at 50% 40%, ${C.brown}28 0%, transparent 70%)` }} />
//         {/* Noise */}
//         <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")", opacity: 0.6 }} />
//       </div>

//       {/* Content */}
//       <div style={{ position: "relative", zIndex: 1, maxWidth: 860, textAlign: "center", width: "100%" }}>
//         <div style={{ ...anim(0.1), display: "inline-flex", alignItems: "center", gap: 8, background: `${C.brown}30`, border: `1px solid ${C.orange}44`, borderRadius: 100, padding: "7px 20px", marginBottom: 36 }}>
//           <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.orange, display: "inline-block", boxShadow: `0 0 8px ${C.orange}` }} />
//           <span style={{ color: C.orangeLight, fontSize: 12.5, fontFamily: "'DM Sans', sans-serif", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700 }}>India's Premium Digital Marketing Agency</span>
//         </div>

//         <h1 style={{ ...anim(0.25), fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)", fontWeight: 900, color: C.cream, lineHeight: 1.08, marginBottom: 28, textShadow: "0 4px 40px rgba(0,0,0,0.6)" }}>
//           We Help Brands &<br />
//           <span style={{ color: C.orange, textShadow: `0 0 60px ${C.orange}55` }}>Local Businesses</span><br />
//           <span style={{ fontStyle: "italic" }}>Grow Digitally</span>
//         </h1>

//         <p style={{ ...anim(0.4), fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.2rem)", color: C.creamDim, maxWidth: 580, margin: "0 auto 48px", lineHeight: 1.8 }}>
//           From jaw-dropping reels to full-funnel paid ads, custom websites to Zomato setups — we help cafés, local brands & small businesses become unstoppable online.
//         </p>

//         <div style={{ ...anim(0.55), display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 64 }}>
//           <Btn size="lg" onClick={() => scrollTo("contact")}>Get More Customers →</Btn>
//           <Btn size="lg" variant="ghost" onClick={() => scrollTo("contact")}>Book a Free Call 📞</Btn>
//         </div>

//         {/* Stats bar */}
//         <div style={{ ...anim(0.7), display: "flex", gap: 0, justifyContent: "center", flexWrap: "wrap", background: "rgba(16,13,9,0.7)", border: `1px solid ${C.brown}33`, borderRadius: 16, backdropFilter: "blur(12px)", overflow: "hidden" }}>
//           {[["50+", "Businesses Grown"], ["3.2M+", "Reach Created"], ["4.8★", "Client Rating"], ["₹2Cr+", "Revenue Generated"]].map(([num, label], i) => (
//             <div key={label} style={{ flex: "1 1 120px", padding: "22px 20px", textAlign: "center", borderRight: i < 3 ? `1px solid ${C.brown}22` : "none" }}>
//               <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 900, color: C.orange }}>{num}</div>
//               <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.creamFaint, marginTop: 4, letterSpacing: "0.3px" }}>{label}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Bottom fade */}
//       <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 160, background: `linear-gradient(transparent, ${C.bg})`, pointerEvents: "none", zIndex: 2 }} />
//     </section>
//   );
// };

// // ─── SERVICES ─────────────────────────────────────────────────────────────────
// const services = [
//   {
//     icon: "📱",
//     title: "Social Media Marketing",
//     short: "Reels · Ads · Strategy",
//     desc: "Full-spectrum social growth — we handle reel shooting & editing, Instagram & Facebook paid ads, and month-long content strategy so your brand stays top-of-mind every single day.",
//     bullets: ["Reel Shooting & Editing", "Instagram & Facebook Ads", "Content Calendar & Strategy", "Community Management"],
//     img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80&auto=format&fit=crop",
//     accent: C.orange,
//   },
//   {
//     icon: "🌐",
//     title: "Website Development",
//     short: "Fast · Beautiful · SEO-Ready",
//     desc: "Custom-built websites with online menus, reservation flows, and Google SEO that puts you on page 1 — turning Google searches into walk-in customers.",
//     bullets: ["Mobile-First Design", "Online Menu & Ordering", "Google SEO Optimization", "Speed & Performance"],
//     img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80&auto=format&fit=crop",
//     accent: "#4A9EF5",
//   },
//   {
//     icon: "📈",
//     title: "Business Growth Strategy",
//     short: "Survey · Audit · Scale",
//     desc: "We don't just plan from a screen — we visit your location, study your market, and hand you a battle-tested roadmap. From on-field surveys to college club tie-ups, we grow your brand from the ground up.",
//     bullets: [
//       "On-Field Location Survey & Visit",
//       "Written Improvement Report (PDF)",
//       "Brand Identity & Positioning",
//       "College Club & Campus Tie-ups",
//       "Loyalty Program Design",
//     ],
//     img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80&auto=format&fit=crop",
//     accent: "#A78BFA",
//   },
//   {
//     icon: "🍽️",
//     title: "Menu Designing",
//     short: "Digital & Print",
//     desc: "Sales-optimized menu design for both digital screens and physical print — using psychology of choice, visual hierarchy, and mouth-watering photography layout.",
//     bullets: ["Digital Menu (QR-ready)", "Print-Ready PDF Design", "Sales Psychology Layout", "Seasonal Menu Updates"],
//     img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80&auto=format&fit=crop",
//     accent: "#F59E42",
//   },
//   {
//     icon: "🚀",
//     title: "Online Platform Setup",
//     short: "Zomato · Swiggy · Magicpin",
//     desc: "We onboard and optimize your presence across all major platforms — so customers can find, order from, and review your business wherever they are.",
//     bullets: ["Zomato & Swiggy Setup", "Magicpin Optimization", "Amazon / Flipkart / Meesho", "Listing & Review Strategy"],
//     img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80&auto=format&fit=crop",
//     accent: "#34D399",
//   },
// ];

// const ServiceCard = ({ icon, title, short, desc, bullets, img, accent, delay }) => {
//   const [ref, inView] = useInView();
//   const [hov, setHov] = useState(false);
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//       style={{
//         background: hov ? C.cardHover : C.card,
//         border: `1px solid ${hov ? accent + "55" : C.brown + "28"}`,
//         borderRadius: 20, overflow: "hidden", flex: "1 1 300px", maxWidth: 420,
//         transform: inView ? (hov ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)") : "translateY(50px)",
//         opacity: inView ? 1 : 0,
//         transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s, border-color 0.3s, background 0.3s, box-shadow 0.3s`,
//         boxShadow: hov ? `0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px ${accent}22, inset 0 1px 0 rgba(255,255,255,0.05)` : "0 4px 20px rgba(0,0,0,0.3)",
//         cursor: "default",
//       }}>
//       {/* Image */}
//       <div style={{ height: 180, overflow: "hidden", position: "relative" }}>
//         <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6) saturate(1.2)", transition: "transform 0.5s ease", transform: hov ? "scale(1.07)" : "scale(1)" }} />
//         <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 40%, ${C.card} 100%)` }} />
//         <div style={{ position: "absolute", top: 16, left: 16, fontSize: 28, background: `${C.bgDeep}cc`, borderRadius: 10, padding: "6px 10px", backdropFilter: "blur(8px)" }}>{icon}</div>
//         <div style={{ position: "absolute", bottom: 12, left: 16, background: `${accent}22`, border: `1px solid ${accent}44`, borderRadius: 100, padding: "3px 12px" }}>
//           <span style={{ color: accent, fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>{short}</span>
//         </div>
//       </div>

//       {/* Body */}
//       <div style={{ padding: "24px 24px 20px" }}>
//         <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 800, color: C.cream, marginBottom: 10 }}>{title}</h3>
//         <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.creamDim, lineHeight: 1.75, marginBottom: 16 }}>{desc}</p>

//         {/* Expandable bullets */}
//         <div style={{ maxHeight: expanded ? 200 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(.4,0,.2,1)" }}>
//           <ul style={{ listStyle: "none", padding: 0, marginBottom: 16 }}>
//             {bullets.map(b => (
//               <li key={b} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: C.creamDim, padding: "5px 0", display: "flex", alignItems: "center", gap: 8, borderBottom: `1px solid ${C.brown}18` }}>
//                 <span style={{ color: accent, fontSize: 14 }}>✓</span> {b}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <button onClick={() => setExpanded(!expanded)}
//           style={{ background: "none", border: "none", cursor: "pointer", color: accent, fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, fontWeight: 700, padding: 0, display: "flex", alignItems: "center", gap: 6, transition: "opacity 0.2s" }}>
//           {expanded ? "Show Less ↑" : "Learn More ↓"}
//         </button>
//       </div>
//     </div>
//   );
// };

// const Services = () => {
//   const [ref, inView] = useInView();
//   return (
//     <section id="services" style={{ padding: "110px 24px", background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bgDeep} 50%, ${C.bg} 100%)` }}>
//       <div style={{ maxWidth: 1240, margin: "0 auto" }}>
//         <div ref={ref} style={{ textAlign: "center", marginBottom: 68, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.75s ease" }}>
//           <p style={{ color: C.orange, fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>What We Brew</p>
//           <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontWeight: 900, color: C.cream, marginBottom: 16 }}>Services That Drive Real Results</h2>
//           <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: C.creamDim, maxWidth: 520, margin: "0 auto" }}>Everything your business needs to dominate online — under one roof.</p>
//         </div>
//         <div style={{ display: "flex", flexWrap: "wrap", gap: 22, justifyContent: "center" }}>
//           {services.map((s, i) => <ServiceCard key={s.title} {...s} delay={i * 0.09} />)}
//         </div>
//         <div style={{ textAlign: "center", marginTop: 52 }}>
//           <Btn onClick={() => scrollTo("contact")} size="lg">Get a Custom Quote →</Btn>
//         </div>
//       </div>
//     </section>
//   );
// };

// // ─── PORTFOLIO ────────────────────────────────────────────────────────────────
// const cases = [
//   {
//     tag: "Café Branding + Reels + Ads",
//     name: "The Brew Lab",
//     location: "Mumbai, Maharashtra",
//     img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80&auto=format&fit=crop",
//     problem: "A specialty coffee shop with amazing brews but zero digital presence — only 180 Instagram followers, no ads, and no website.",
//     solution: "Redesigned visual identity, weekly reel production, hyper-local Instagram ads (15 km radius), and a slick website with Swiggy Dineout integration.",
//     results: [["12k+", "New Followers"], ["₹3.8L", "Monthly Revenue ↑"], ["4.1×", "ROAS"]],
//     accent: C.orange,
//   },
//   {
//     tag: "Paid Ads + Platform Setup + SEO",
//     name: "Beanster Café",
//     location: "Koramangala, Bengaluru",
//     img: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80&auto=format&fit=crop",
//     problem: "Foot traffic declining after a competitor opened nearby. Google rating 3.7, no differentiation strategy, and zero online ordering presence.",
//     solution: "Google My Business overhaul, Zomato & Swiggy onboarding, storytelling reels about their sourcing story, and A/B tested Facebook ads targeting office-goers within 5 km.",
//     results: [["4.9★", "Google Rating"], ["220%", "Walk-in Growth"], ["₹2.1L", "Ad Savings"]],
//     accent: C.brownLight,
//   },
// ];

// const CaseCard = ({ tag, name, location, img, problem, solution, results, accent, delay }) => {
//   const [ref, inView] = useInView();
//   const [hov, setHov] = useState(false);
//   return (
//     <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//       style={{
//         flex: "1 1 400px", background: C.card, borderRadius: 22, overflow: "hidden",
//         border: `1px solid ${hov ? accent + "55" : C.brown + "28"}`,
//         transform: inView ? (hov ? "translateY(-5px)" : "translateY(0)") : "translateY(50px)",
//         opacity: inView ? 1 : 0,
//         transition: `all 0.8s ease ${delay}s, border-color 0.3s, transform 0.3s`,
//         boxShadow: hov ? `0 28px 70px rgba(0,0,0,0.55), 0 0 0 1px ${accent}22` : "0 4px 24px rgba(0,0,0,0.3)",
//       }}>
//       {/* Image */}
//       <div style={{ height: 220, position: "relative", overflow: "hidden" }}>
//         <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55) saturate(1.3)", transition: "transform 0.6s", transform: hov ? "scale(1.06)" : "scale(1)" }} />
//         <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 30%, ${C.card} 100%)` }} />
//         <div style={{ position: "absolute", top: 18, left: 18, background: `${accent}22`, border: `1px solid ${accent}55`, borderRadius: 100, padding: "5px 14px" }}>
//           <span style={{ color: accent, fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "1px" }}>{tag}</span>
//         </div>
//         <div style={{ position: "absolute", bottom: 18, left: 18 }}>
//           <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: C.cream, margin: 0 }}>{name}</h3>
//           <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.creamDim, margin: "3px 0 0" }}>📍 {location}</p>
//         </div>
//       </div>

//       <div style={{ padding: "24px 28px 28px" }}>
//         {[["🔴 The Problem", problem, "#E05A5A"], ["✅ Our Solution", solution, C.orange]].map(([label, text, col]) => (
//           <div key={label} style={{ marginBottom: 18 }}>
//             <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, color: col, fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 7 }}>{label}</p>
//             <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.creamDim, lineHeight: 1.75 }}>{text}</p>
//           </div>
//         ))}

//         <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
//           {results.map(([num, label]) => (
//             <div key={label} style={{ flex: "1 1 90px", background: `${accent}12`, border: `1px solid ${accent}30`, borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
//               <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: accent }}>{num}</div>
//               <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.creamFaint, marginTop: 3 }}>{label}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const Portfolio = () => {
//   const [ref, inView] = useInView();
//   return (
//     <section id="portfolio" style={{ padding: "110px 24px", background: `linear-gradient(180deg, ${C.bg} 0%, rgba(16,10,6,0.8) 100%)` }}>
//       <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//         <div ref={ref} style={{ textAlign: "center", marginBottom: 64, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.75s ease" }}>
//           <p style={{ color: C.orange, fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>Real Results</p>
//           <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontWeight: 900, color: C.cream, marginBottom: 16 }}>Case Studies That Speak</h2>
//           <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: C.creamDim, maxWidth: 480, margin: "0 auto" }}>Transformations we've delivered for real businesses.</p>
//         </div>
//         <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
//           {cases.map((c, i) => <CaseCard key={c.name} {...c} delay={i * 0.15} />)}
//         </div>
//         <div style={{ textAlign: "center", marginTop: 52 }}>
//           <Btn variant="ghost" onClick={() => scrollTo("contact")} size="lg">Get Similar Results for Your Business →</Btn>
//         </div>
//       </div>
//     </section>
//   );
// };

// // ─── RESULTS ──────────────────────────────────────────────────────────────────
// const StatItem = ({ target, suffix, label, icon }) => {
//   const [ref, inView] = useInView();
//   const val = useCountUp(target, inView);
//   return (
//     <div ref={ref} style={{ textAlign: "center", flex: "1 1 180px", padding: "12px 8px" }}>
//       <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
//       <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 900, color: C.orange, lineHeight: 1 }}>
//         {val}{suffix}
//       </div>
//       <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.creamDim, marginTop: 10, lineHeight: 1.4 }}>{label}</div>
//     </div>
//   );
// };

// const Results = () => {
//   const [ref, inView] = useInView();
//   const stats = [
//     { target: 50, suffix: "+", label: "Businesses & Brands Grown", icon: "🏪" },
//     { target: 320, suffix: "%", label: "Avg Revenue Increase", icon: "💹" },
//     { target: 3, suffix: ".2M+", label: "People Reached Online", icon: "📡" },
//     { target: 98, suffix: "%", label: "Client Retention Rate", icon: "🤝" },
//   ];
//   return (
//     <section id="results" style={{ padding: "110px 24px" }}>
//       <div style={{ maxWidth: 1100, margin: "0 auto" }}>
//         <div ref={ref} style={{ textAlign: "center", marginBottom: 64, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.75s ease" }}>
//           <p style={{ color: C.orange, fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>The Numbers</p>
//           <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontWeight: 900, color: C.cream }}>Growth You Can Measure</h2>
//         </div>
//         <div style={{ background: `linear-gradient(135deg, ${C.card} 0%, rgba(24,19,13,0.8) 100%)`, border: `1px solid ${C.brown}33`, borderRadius: 28, padding: "60px 40px", display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "space-around", boxShadow: `0 0 80px ${C.brown}18, inset 0 1px 0 rgba(255,255,255,0.04)` }}>
//           {stats.map(s => <StatItem key={s.label} {...s} />)}
//         </div>
//         <div style={{ textAlign: "center", marginTop: 44 }}>
//           <Btn onClick={() => scrollTo("contact")} size="lg">Start Growing Today →</Btn>
//         </div>
//       </div>
//     </section>
//   );
// };

// // ─── BEFORE / AFTER ───────────────────────────────────────────────────────────
// const BeforeAfter = () => {
//   const [ref, inView] = useInView();
//   const rows = [
//     ["Instagram Followers", "~180", "14,200+"],
//     ["Monthly Walk-ins", "400", "1,850"],
//     ["Online Orders / Month", "₹0", "₹80,000+"],
//     ["Google Rating", "3.6 ★", "4.9 ★"],
//     ["Ad Spend ROI", "—", "4.3×"],
//     ["Zomato Ranking", "Not Listed", "Top 5 in Area"],
//   ];
//   return (
//     <section style={{ padding: "80px 24px", background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bgDeep} 100%)` }}>
//       <div style={{ maxWidth: 920, margin: "0 auto" }}>
//         <div ref={ref} style={{ textAlign: "center", marginBottom: 52, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.75s ease" }}>
//           <p style={{ color: C.orange, fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>The Transformation</p>
//           <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900, color: C.cream }}>Before GrowthMug vs. After</h2>
//         </div>
//         <div style={{ background: C.card, border: `1px solid ${C.brown}33`, borderRadius: 22, overflow: "hidden", boxShadow: "0 16px 60px rgba(0,0,0,0.4)" }}>
//           <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1.2fr", background: `linear-gradient(90deg, ${C.brown}28, ${C.brown}18)` }}>
//             {["Metric", "Before ❌", "After GrowthMug ✅"].map(h => (
//               <div key={h} style={{ padding: "16px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 800, color: C.creamDim, letterSpacing: "1.5px", textTransform: "uppercase" }}>{h}</div>
//             ))}
//           </div>
//           {rows.map(([metric, before, after], i) => (
//             <div key={metric} style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1.2fr", borderTop: `1px solid ${C.brown}1a`, background: i % 2 === 0 ? "transparent" : "rgba(107,63,26,0.04)" }}>
//               <div style={{ padding: "18px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, color: C.cream, fontWeight: 500 }}>{metric}</div>
//               <div style={{ padding: "18px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#E05A5A", fontWeight: 500 }}>{before}</div>
//               <div style={{ padding: "18px 24px", fontFamily: "'Playfair Display', serif", fontSize: 15, color: C.orange, fontWeight: 800 }}>{after}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
// const testimonials = [
//   { name: "Priya Sharma", role: "Owner, The Brew Lab · Mumbai", quote: "GrowthMug didn't just run our ads — they understood our vibe. Within 3 months we went from 200 to 12,000 followers and our weekends are now fully booked.", avatar: "PS", rating: 5 },
//   { name: "Aditya Menon", role: "Co-founder, Beanster Café · Bengaluru", quote: "The reels they created went viral locally. A reel about our single-origin Coorg beans got 80K views and brought in customers from across the city!", avatar: "AM", rating: 5 },
//   { name: "Sunita Rao", role: "Owner, Sip & Story Apparel · Pune", quote: "Our website now ranks #1 for our brand in Koregaon Park. Online orders went from zero to ₹80,000/month. GrowthMug are absolute game changers.", avatar: "SR", rating: 5 },
// ];

// const TestCard = ({ name, role, quote, avatar, rating, delay }) => {
//   const [ref, inView] = useInView();
//   const [hov, setHov] = useState(false);
//   return (
//     <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//       style={{
//         background: C.card, border: `1px solid ${hov ? C.orange + "44" : C.brown + "28"}`, borderRadius: 20, padding: "30px 26px", flex: "1 1 280px",
//         opacity: inView ? 1 : 0, transform: inView ? (hov ? "translateY(-5px)" : "translateY(0)") : "translateY(40px)",
//         transition: `opacity 0.8s ease ${delay}s, transform 0.4s ease, border-color 0.3s, box-shadow 0.3s`,
//         boxShadow: hov ? `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px ${C.orange}18` : "none",
//       }}>
//       <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
//         {[...Array(rating)].map((_, i) => <span key={i} style={{ color: C.orange, fontSize: 14 }}>★</span>)}
//       </div>
//       <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.creamDim, lineHeight: 1.8, marginBottom: 24, fontStyle: "italic" }}>"{quote}"</p>
//       <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: `1px solid ${C.brown}28`, paddingTop: 18 }}>
//         <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${C.orange}, ${C.brownLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: C.white, fontSize: 14, flexShrink: 0 }}>{avatar}</div>
//         <div>
//           <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, fontWeight: 700, color: C.cream }}>{name}</div>
//           <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: C.creamFaint, marginTop: 1 }}>{role}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Testimonials = () => {
//   const [ref, inView] = useInView();
//   return (
//     <section id="testimonials" style={{ padding: "110px 24px" }}>
//       <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//         <div ref={ref} style={{ textAlign: "center", marginBottom: 64, opacity: inView ? 1 : 0, transition: "all 0.75s ease" }}>
//           <p style={{ color: C.orange, fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>Client Love ❤️</p>
//           <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontWeight: 900, color: C.cream }}>What Café Owners Say</h2>
//         </div>
//         <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
//           {testimonials.map((t, i) => <TestCard key={t.name} {...t} delay={i * 0.12} />)}
//         </div>
//       </div>
//     </section>
//   );
// };

// // ─── FAQ ──────────────────────────────────────────────────────────────────────
// const faqs = [
//   { q: "Do you work with small businesses and brands too — not just cafés?", a: "Absolutely. While cafés are our specialty, we work with all kinds of local businesses and small brands — clothing stores, cloud kitchens, coaching centres, salons, D2C brands, and more. If you sell something and need more customers, GrowthMug is for you." },
//   { q: "How long does it take to see results?", a: "Most clients start seeing measurable improvements — more profile visits, story views, and walk-ins — within the first 30 days. Significant revenue impact typically follows in 60–90 days as campaigns optimize." },
//   { q: "Do you handle ads AND content both?", a: "Yes! We manage the complete digital stack — content creation, reel shooting & editing, paid ad campaigns, and community management. You focus on your business; we handle the internet." },
//   { q: "What is your pricing model?", a: "We offer flexible monthly retainers starting from ₹15,000/month depending on the services chosen. We also offer project-based pricing for one-time work like websites or menu design. Book a free call for a custom quote." },
//   { q: "What does the on-field survey include?", a: "Our team visits your location physically, assesses your setup, signage, customer experience, and local competition, then delivers a written Improvement Report (PDF) with a clear 90-day action plan tailored to your business." },
//   { q: "Can you manage our Instagram fully?", a: "Yes. Full Instagram management includes content planning, reel production, posting, story management, hashtag research, engagement, and monthly performance reports. We become your virtual social media team." },
//   { q: "What are your college club tie-ups?", a: "We partner with college fest committees, student clubs, and campus communities for brand activations, sponsorships, and promotions — giving your brand massive reach among young audiences at low cost." },
// ];

// const FAQItem = ({ q, a, i }) => {
//   const [open, setOpen] = useState(false);
//   const [hov, setHov] = useState(false);
//   return (
//     <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//       style={{ background: hov || open ? C.cardHover : C.card, border: `1px solid ${open ? C.orange + "55" : hov ? C.brown + "55" : C.brown + "28"}`, borderRadius: 14, overflow: "hidden", transition: "all 0.3s ease", marginBottom: 12 }}>
//       <button onClick={() => setOpen(!open)}
//         style={{ width: "100%", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
//         <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15.5, fontWeight: 700, color: open ? C.orange : C.cream, textAlign: "left", lineHeight: 1.4 }}>
//           <span style={{ color: C.orange, marginRight: 10, fontFamily: "'Playfair Display', serif" }}>0{i + 1}.</span>{q}
//         </span>
//         <span style={{ color: C.orange, fontSize: 20, flexShrink: 0, transform: open ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.35s cubic-bezier(.4,0,.2,1)", fontWeight: 300 }}>+</span>
//       </button>
//       <div style={{ maxHeight: open ? 300 : 0, overflow: "hidden", transition: "max-height 0.45s cubic-bezier(.4,0,.2,1)" }}>
//         <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, color: C.creamDim, lineHeight: 1.8, padding: "0 24px 22px", borderTop: `1px solid ${C.brown}22`, paddingTop: 14 }}>{a}</p>
//       </div>
//     </div>
//   );
// };

// const FAQ = () => {
//   const [ref, inView] = useInView();
//   return (
//     <section id="faq" style={{ padding: "110px 24px", background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bgDeep} 100%)` }}>
//       <div style={{ maxWidth: 820, margin: "0 auto" }}>
//         <div ref={ref} style={{ textAlign: "center", marginBottom: 60, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.75s ease" }}>
//           <p style={{ color: C.orange, fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>Got Questions?</p>
//           <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 900, color: C.cream, marginBottom: 12 }}>Frequently Asked</h2>
//           <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.creamDim }}>Everything café owners ask before working with us.</p>
//         </div>
//         {faqs.map((f, i) => <FAQItem key={f.q} {...f} i={i} />)}
//         <div style={{ textAlign: "center", marginTop: 44 }}>
//           <Btn onClick={() => scrollTo("contact")} size="lg">Still Have Questions? Let's Talk ☕</Btn>
//         </div>
//       </div>
//     </section>
//   );
// };

// // ─── CONTACT ──────────────────────────────────────────────────────────────────
// const Contact = () => {
//   const [ref, inView] = useInView();
//   const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
//   const [sent, setSent] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Load EmailJS script once
//   useEffect(() => {
//     if (document.getElementById("emailjs-sdk")) return;
//     const script = document.createElement("script");
//     script.id = "emailjs-sdk";
//     script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
//     script.onload = () => {
//       window.emailjs.init({ publicKey: "user_placeholder_public_key" });
//     };
//     document.head.appendChild(script);
//   }, []);

//   const handleSubmit = async () => {
//     setError("");
//     if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
//       setError("Please fill in Name, Email and Message.");
//       return;
//     }
//     setLoading(true);
//     try {
//       // EmailJS: sends form data to sg166344@gmail.com
//       // Setup: go to emailjs.com → create account → add Gmail service →
//       // create template with variables {{name}}, {{email}}, {{phone}}, {{message}} →
//       // replace SERVICE_ID, TEMPLATE_ID, and publicKey above with your real values
//       await window.emailjs.send(
//         "YOUR_SERVICE_ID",     // replace with your EmailJS Service ID
//         "YOUR_TEMPLATE_ID",    // replace with your EmailJS Template ID
//         {
//           name: form.name,
//           email: form.email,
//           phone: form.phone || "Not provided",
//           message: form.message,
//           to_email: "sg166344@gmail.com",
//         }
//       );
//       setSent(true);
//     } catch (err) {
//       // Fallback: open WhatsApp with form data pre-filled
//       const text = encodeURIComponent(
//         `Hi GrowthMug! Here's my inquiry:\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nMessage: ${form.message}`
//       );
//       window.open(`https://wa.me/918445201080?text=${text}`, "_blank");
//       setSent(true);
//     }
//     setLoading(false);
//   };

//   const inp = {
//     width: "100%", padding: "14px 18px", background: C.bgDeep, border: `1px solid ${C.brown}44`,
//     borderRadius: 11, color: C.cream, fontFamily: "'DM Sans', sans-serif", fontSize: 15,
//     outline: "none", boxSizing: "border-box", transition: "border-color 0.25s",
//   };

//   return (
//     <section id="contact" style={{ padding: "110px 24px" }}>
//       <div style={{ maxWidth: 700, margin: "0 auto" }}>
//         <div ref={ref} style={{ textAlign: "center", marginBottom: 52, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.75s ease" }}>
//           <p style={{ color: C.orange, fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>Let's Talk</p>
//           <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 900, color: C.cream, marginBottom: 14 }}>Ready to Brew<br /><span style={{ color: C.orange, fontStyle: "italic" }}>Some Growth?</span></h2>
//           <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: C.creamDim }}>Get a free marketing audit — we'll show you exactly what's holding your business back.</p>
//         </div>

//         {sent ? (
//           <div style={{ textAlign: "center", background: C.card, border: `1px solid ${C.orange}44`, borderRadius: 20, padding: "60px 40px" }}>
//             <div style={{ fontSize: 52, marginBottom: 16 }}>☕</div>
//             <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: C.cream, marginBottom: 10 }}>Message received!</h3>
//             <p style={{ fontFamily: "'DM Sans', sans-serif", color: C.creamDim, fontSize: 15 }}>We'll reach out to you at <strong style={{ color: C.orange }}>{form.email}</strong> within 24 hours.</p>
//           </div>
//         ) : (
//           <div style={{ background: C.card, border: `1px solid ${C.brown}33`, borderRadius: 22, padding: "40px 36px", boxShadow: "0 16px 60px rgba(0,0,0,0.4)" }}>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
//               <input placeholder="Your Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inp}
//                 onFocus={e => e.target.style.borderColor = C.orange} onBlur={e => e.target.style.borderColor = `${C.brown}44`} />
//               <input placeholder="Email Address *" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inp}
//                 onFocus={e => e.target.style.borderColor = C.orange} onBlur={e => e.target.style.borderColor = `${C.brown}44`} />
//             </div>
//             <input placeholder="Phone / WhatsApp Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={{ ...inp, marginBottom: 14 }}
//               onFocus={e => e.target.style.borderColor = C.orange} onBlur={e => e.target.style.borderColor = `${C.brown}44`} />
//             <textarea placeholder="Tell us about your business and your biggest marketing challenge... *" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5}
//               style={{ ...inp, resize: "vertical", marginBottom: error ? 8 : 18 }}
//               onFocus={e => e.target.style.borderColor = C.orange} onBlur={e => e.target.style.borderColor = `${C.brown}44`} />
//             {error && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#E05A5A", marginBottom: 14 }}>⚠️ {error}</p>}
//             <Btn onClick={handleSubmit} size="lg" style={{ width: "100%", justifyContent: "center" }}>
//               {loading ? "Sending... ☕" : "Get My Free Marketing Audit →"}
//             </Btn>
//             <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.creamFaint, textAlign: "center", marginTop: 12 }}>
//               📧 Sends directly to GrowthMug
//             </p>
//           </div>
//         )}

//         {/* Alt CTAs */}
//         <div style={{ textAlign: "center", marginTop: 32 }}>
//           <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.creamFaint, marginBottom: 16 }}>Prefer to connect directly?</p>
//           <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
//             <Btn variant="whatsapp" size="md"
//               onClick={() => window.open("https://wa.me/918445201080?text=Hi%2C%20I%20want%20a%20free%20marketing%20audit%20for%20my%20business!", "_blank")}>
//               💬 Chat on WhatsApp
//             </Btn>
//             <Btn variant="ghost" size="md"
//               onClick={() => window.open("https://instagram.com/growthmug", "_blank")}>
//               📸 Follow on Instagram
//             </Btn>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // ─── FOOTER ───────────────────────────────────────────────────────────────────
// const Footer = () => {
//   const links = ["Services", "Portfolio", "Results", "Testimonials", "FAQ", "Contact"];
//   return (
//     <footer style={{ borderTop: `1px solid ${C.brown}28`, background: C.bgDeep, padding: "52px 24px 32px" }}>
//       <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//         <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
//           <div style={{ maxWidth: 300 }}>
//             <Logo />
//             <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.creamFaint, marginTop: 14, lineHeight: 1.7 }}>
//               Brewing Growth for Your Business ☕<br />India's premium digital marketing agency for small businesses & local brands.
//             </p>
//           </div>
//           <div>
//             <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.orange, letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>Navigation</p>
//             <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//               {links.map(l => {
//                 const [h, setH] = useState(false);
//                 return (
//                   <button key={l} onClick={() => scrollTo(l.toLowerCase())}
//                     onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
//                     style={{ background: "none", border: "none", cursor: "pointer", color: h ? C.orange : C.creamFaint, fontFamily: "'DM Sans', sans-serif", fontSize: 14, textAlign: "left", transition: "color 0.2s" }}>
//                     {l}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//           <div>
//             <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.orange, letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>Connect</p>
//             <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//               {[
//                 { label: "📸 Instagram", href: "https://instagram.com/growthmug" },
//                 { label: "💬 WhatsApp", href: "https://wa.me/918445201080" },
//                 { label: "💼 LinkedIn", href: "#" },
//                 { label: "📧 hello@growthmug.in", href: "mailto:hello@growthmug.in" },
//               ].map(({ label, href }) => {
//                 const [h, setH] = useState(false);
//                 return (
//                   <a key={label} href={href} target="_blank" rel="noopener noreferrer"
//                     onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
//                     style={{ color: h ? C.orange : C.creamFaint, fontFamily: "'DM Sans', sans-serif", fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}>
//                     {label}
//                   </a>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//         <div style={{ borderTop: `1px solid ${C.brown}22`, paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
//           <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.creamFaint }}>© 2026 GrowthMug. All rights reserved.</p>
//           <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.creamFaint }}>Made with ☕ in India</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// // ─── FLOATING WHATSAPP ────────────────────────────────────────────────────────
// const FloatingWhatsApp = () => {
//   const [vis, setVis] = useState(false);
//   const [hov, setHov] = useState(false);
//   useEffect(() => { const t = setTimeout(() => setVis(true), 2000); return () => clearTimeout(t); }, []);
//   return (
//     <a href="https://wa.me/918445201080?text=Hi%2C%20I%20want%20a%20free%20marketing%20audit%20for%20my%20business!" target="_blank" rel="noopener noreferrer"
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//       style={{
//         position: "fixed", bottom: 28, right: 28, zIndex: 999,
//         width: hov ? 56 : 52, height: hov ? 56 : 52,
//         background: C.green, borderRadius: "50%",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         fontSize: 26, textDecoration: "none",
//         boxShadow: hov ? `0 12px 40px ${C.green}77, 0 0 0 6px ${C.green}22` : `0 6px 24px ${C.green}55`,
//         transform: vis ? (hov ? "scale(1.1)" : "scale(1)") : "scale(0)",
//         transition: "all 0.4s cubic-bezier(.34,1.56,.64,1)",
//       }}>
//       💬
//     </a>
//   );
// };

// // ─── APP ──────────────────────────────────────────────────────────────────────
// export default function App() {
//   useEffect(() => {
//     const link = document.createElement("link");
//     link.rel = "stylesheet";
//     link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=DM+Sans:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);

//     const style = document.createElement("style");
//     style.textContent = `
//       *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
//       html { scroll-behavior: smooth; }
//       body { background: #080604; color: #F5E6D3; -webkit-font-smoothing: antialiased; }
//       input::placeholder, textarea::placeholder { color: #4A3F35; }
//       @media (max-width: 680px) {
//         .gm-nav-links { display: none !important; }
//         .gm-hamburger { display: block !important; }
//       }
//     `;
//     document.head.appendChild(style);
//   }, []);

//   return (
//     <div style={{ background: C.bg, minHeight: "100vh" }}>
//       <Navbar />
//       <Hero />
//       <Services />
//       <Portfolio />
//       <Results />
//       <BeforeAfter />
//       <Testimonials />
//       <FAQ />
//       <Contact />
//       <Footer />
//       <FloatingWhatsApp />
//     </div>
//   );
// }


import { useState, useEffect, useRef } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  bg:          "#080604",
  bgDeep:      "#050402",
  card:        "#100D09",
  cardHover:   "#181310",
  brown:       "#6B3F1A",
  brownMid:    "#8B5230",
  brownLight:  "#A0683C",
  orange:      "#E07B39",
  orangeLight: "#F09450",
  orangeGlow:  "#E07B3944",
  cream:       "#F5E6D3",
  creamDim:    "#C4A882",
  creamFaint:  "#7A6858",
  white:       "#FFFFFF",
  green:       "#25D366",
};

// ─── UTILS ────────────────────────────────────────────────────────────────────
const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const useCountUp = (target, inView, duration = 2200) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return val;
};

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

// ─── BUTTON ───────────────────────────────────────────────────────────────────
const Btn = ({ children, onClick, variant = "primary", size = "md", style: extra = {} }) => {
  const [hov, setHov] = useState(false);
  const base = {
    display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "0.2px",
    border: "none", borderRadius: 10, transition: "all 0.25s cubic-bezier(.4,0,.2,1)",
  };
  const sizes = { sm: { padding: "9px 18px", fontSize: 13 }, md: { padding: "13px 28px", fontSize: 15 }, lg: { padding: "16px 36px", fontSize: 16 } };
  const variants = {
    primary: {
      background: hov ? C.orangeLight : C.orange,
      color: C.white,
      boxShadow: hov ? `0 16px 48px ${C.orange}66, 0 4px 16px ${C.orange}44` : `0 6px 24px ${C.orange}44`,
      transform: hov ? "translateY(-2px)" : "translateY(0)",
    },
    ghost: {
      background: "transparent",
      color: hov ? C.orange : C.creamDim,
      border: `1.5px solid ${hov ? C.orange : C.brown + "66"}`,
      transform: hov ? "translateY(-2px)" : "translateY(0)",
    },
    whatsapp: {
      background: hov ? "#1ebe5d" : C.green,
      color: C.white,
      boxShadow: hov ? `0 12px 40px ${C.green}55` : `0 6px 24px ${C.green}44`,
      transform: hov ? "translateY(-2px)" : "translateY(0)",
    },
  };
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...base, ...sizes[size], ...variants[variant], ...extra }}>
      {children}
    </button>
  );
};

// ─── LOGO ─────────────────────────────────────────────────────────────────────
const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="11" fill={C.orange} />
      <rect x="7" y="18" width="17" height="14" rx="2.5" fill={C.bg} />
      <path d="M24 21 Q32 21 32 25.5 Q32 30 24 30" stroke={C.bg} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <polyline points="11,15 11,7 22,7 22,15" stroke={C.cream} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="19,10 22,7 25,10" stroke={C.cream} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: C.cream, letterSpacing: "-0.5px" }}>
      Growth<span style={{ color: C.orange }}>Mug</span>
    </span>
  </div>
);

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Services", "Portfolio", "Results", "Testimonials", "FAQ", "Contact"];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: 68, padding: "0 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(8,6,4,0.72)" : "rgba(8,6,4,0.35)",
        backdropFilter: "blur(18px) saturate(180%)",
        WebkitBackdropFilter: "blur(18px) saturate(180%)",
        borderBottom: `1px solid rgba(107,63,26,${scrolled ? "0.35" : "0.15"})`,
        boxShadow: scrolled ? `0 8px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(224,123,57,0.08)` : "none",
        transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
      }}>
        <Logo />

        {/* Desktop */}
        <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="gm-nav-links">
          {links.map(l => {
            const [h, setH] = useState(false);
            return (
              <button key={l} onClick={() => scrollTo(l.toLowerCase())}
                onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: h ? C.orange : C.creamDim, transition: "color 0.2s", letterSpacing: "0.3px" }}>
                {l}
              </button>
            );
          })}
          <Btn onClick={() => scrollTo("contact")} size="sm">Free Audit ☕</Btn>
        </div>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} className="gm-hamburger"
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: C.cream, fontSize: 26, lineHeight: 1 }}>
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div style={{
        position: "fixed", top: 68, left: 0, right: 0, zIndex: 199,
        background: "rgba(8,6,4,0.97)", backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${C.brown}33`,
        padding: open ? "24px 28px 32px" : "0 28px",
        maxHeight: open ? 500 : 0, overflow: "hidden",
        transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
        display: "flex", flexDirection: "column", gap: open ? 18 : 0,
      }} className="gm-mobile-menu">
        {links.map(l => (
          <button key={l} onClick={() => { scrollTo(l.toLowerCase()); setOpen(false); }}
            style={{ background: "none", border: "none", cursor: "pointer", color: C.cream, fontSize: 17, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, textAlign: "left", padding: "4px 0", borderBottom: `1px solid ${C.brown}22` }}>
            {l}
          </button>
        ))}
        <Btn onClick={() => { scrollTo("contact"); setOpen(false); }}>Get Free Audit ☕</Btn>
      </div>
    </>
  );
};

// ─── HERO ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  const anim = (delay) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
  });

  return (
    <section style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "100px 24px 80px" }}>

      {/* BG image + overlays */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1600&q=80&auto=format&fit=crop" alt="café background"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", filter: "brightness(0.22) saturate(1.3)" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${C.bgDeep} 0%, rgba(8,6,4,0.6) 50%, ${C.bgDeep} 100%)` }} />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 60% at 50% 40%, ${C.brown}28 0%, transparent 70%)` }} />
        {/* Noise */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")", opacity: 0.6 }} />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 860, textAlign: "center", width: "100%" }}>
        <div style={{ ...anim(0.1), display: "inline-flex", alignItems: "center", gap: 8, background: `${C.brown}30`, border: `1px solid ${C.orange}44`, borderRadius: 100, padding: "7px 20px", marginBottom: 36 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.orange, display: "inline-block", boxShadow: `0 0 8px ${C.orange}` }} />
          <span style={{ color: C.orangeLight, fontSize: 12.5, fontFamily: "'DM Sans', sans-serif", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700 }}>India's Premium Digital Marketing Agency</span>
        </div>

        <h1 style={{ ...anim(0.25), fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)", fontWeight: 900, color: C.cream, lineHeight: 1.08, marginBottom: 28, textShadow: "0 4px 40px rgba(0,0,0,0.6)" }}>
          We Help Brands &<br />
          <span style={{ color: C.orange, textShadow: `0 0 60px ${C.orange}55` }}>Local Businesses</span><br />
          <span style={{ fontStyle: "italic" }}>Grow Digitally</span>
        </h1>

        <p style={{ ...anim(0.4), fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.2rem)", color: C.creamDim, maxWidth: 580, margin: "0 auto 48px", lineHeight: 1.8 }}>
          From jaw-dropping reels to full-funnel paid ads, custom websites to Zomato setups — we help cafés, local brands & small businesses become unstoppable online.
        </p>

        <div style={{ ...anim(0.55), display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 64 }}>
          <Btn size="lg" onClick={() => scrollTo("contact")}>Get More Customers →</Btn>
          <Btn size="lg" variant="ghost" onClick={() => scrollTo("contact")}>Book a Free Call 📞</Btn>
        </div>

        {/* Stats bar */}
        <div style={{ ...anim(0.7), display: "flex", gap: 0, justifyContent: "center", flexWrap: "wrap", background: "rgba(16,13,9,0.7)", border: `1px solid ${C.brown}33`, borderRadius: 16, backdropFilter: "blur(12px)", overflow: "hidden" }}>
          {[["50+", "Businesses Grown"], ["3.2M+", "Reach Created"], ["4.8★", "Client Rating"], ["₹2Cr+", "Revenue Generated"]].map(([num, label], i) => (
            <div key={label} style={{ flex: "1 1 120px", padding: "22px 20px", textAlign: "center", borderRight: i < 3 ? `1px solid ${C.brown}22` : "none" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 900, color: C.orange }}>{num}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.creamFaint, marginTop: 4, letterSpacing: "0.3px" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 160, background: `linear-gradient(transparent, ${C.bg})`, pointerEvents: "none", zIndex: 2 }} />
    </section>
  );
};

// ─── SERVICES ─────────────────────────────────────────────────────────────────
const services = [
  {
    icon: "📱",
    title: "Social Media Marketing",
    short: "Reels · Ads · Strategy",
    desc: "Full-spectrum social growth — we handle reel shooting & editing, Instagram & Facebook paid ads, and month-long content strategy so your brand stays top-of-mind every single day.",
    bullets: ["Reel Shooting & Editing", "Instagram & Facebook Ads", "Content Calendar & Strategy", "Community Management"],
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80&auto=format&fit=crop",
    accent: C.orange,
  },
  {
    icon: "🌐",
    title: "Website Development",
    short: "Fast · Beautiful · SEO-Ready",
    desc: "Custom-built websites with online menus, reservation flows, and Google SEO that puts you on page 1 — turning Google searches into walk-in customers.",
    bullets: ["Mobile-First Design", "Online Menu & Ordering", "Google SEO Optimization", "Speed & Performance"],
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80&auto=format&fit=crop",
    accent: "#4A9EF5",
  },
  {
    icon: "📈",
    title: "Business Growth Strategy",
    short: "Survey · Audit · Scale",
    desc: "We don't just plan from a screen — we visit your location, study your market, and hand you a battle-tested roadmap. From on-field surveys to college club tie-ups, we grow your brand from the ground up.",
    bullets: [
      "On-Field Location Survey & Visit",
      "Written Improvement Report (PDF)",
      "Brand Identity & Positioning",
      "College Club & Campus Tie-ups",
      "Fest Sponsorships & Event Collabs",
      "Loyalty Program Design",
      "Competitor Analysis",
      "Monthly Growth Reports",
    ],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80&auto=format&fit=crop",
    accent: "#A78BFA",
  },
  {
    icon: "🍽️",
    title: "Menu Designing",
    short: "Digital & Print",
    desc: "Sales-optimized menu design for both digital screens and physical print — using psychology of choice, visual hierarchy, and mouth-watering photography layout.",
    bullets: ["Digital Menu (QR-ready)", "Print-Ready PDF Design", "Sales Psychology Layout", "Seasonal Menu Updates"],
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80&auto=format&fit=crop",
    accent: "#F59E42",
  },
  {
    icon: "🚀",
    title: "Online Platform Setup",
    short: "Zomato · Swiggy · Magicpin",
    desc: "We onboard and optimize your presence across all major platforms — so customers can find, order from, and review your business wherever they are.",
    bullets: ["Zomato & Swiggy Setup", "Magicpin Optimization", "Amazon / Flipkart / Meesho", "Listing & Review Strategy"],
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80&auto=format&fit=crop",
    accent: "#34D399",
  },
];

const ServiceCard = ({ icon, title, short, desc, bullets, img, accent, delay }) => {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? C.cardHover : C.card,
        border: `1px solid ${hov ? accent + "55" : C.brown + "28"}`,
        borderRadius: 20, overflow: "hidden", flex: "1 1 300px", maxWidth: 420,
        transform: inView ? (hov ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)") : "translateY(50px)",
        opacity: inView ? 1 : 0,
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s, border-color 0.3s, background 0.3s, box-shadow 0.3s`,
        boxShadow: hov ? `0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px ${accent}22, inset 0 1px 0 rgba(255,255,255,0.05)` : "0 4px 20px rgba(0,0,0,0.3)",
        cursor: "default",
      }}>
      {/* Image */}
      <div style={{ height: 180, overflow: "hidden", position: "relative" }}>
        <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6) saturate(1.2)", transition: "transform 0.5s ease", transform: hov ? "scale(1.07)" : "scale(1)" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 40%, ${C.card} 100%)` }} />
        <div style={{ position: "absolute", top: 16, left: 16, fontSize: 28, background: `${C.bgDeep}cc`, borderRadius: 10, padding: "6px 10px", backdropFilter: "blur(8px)" }}>{icon}</div>
        <div style={{ position: "absolute", bottom: 12, left: 16, background: `${accent}22`, border: `1px solid ${accent}44`, borderRadius: 100, padding: "3px 12px" }}>
          <span style={{ color: accent, fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>{short}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "24px 24px 20px" }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 800, color: C.cream, marginBottom: 10 }}>{title}</h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.creamDim, lineHeight: 1.75, marginBottom: 16 }}>{desc}</p>

        {/* Expandable bullets */}
        <div style={{ maxHeight: expanded ? 200 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(.4,0,.2,1)" }}>
          <ul style={{ listStyle: "none", padding: 0, marginBottom: 16 }}>
            {bullets.map(b => (
              <li key={b} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: C.creamDim, padding: "5px 0", display: "flex", alignItems: "center", gap: 8, borderBottom: `1px solid ${C.brown}18` }}>
                <span style={{ color: accent, fontSize: 14 }}>✓</span> {b}
              </li>
            ))}
          </ul>
        </div>

        <button onClick={() => setExpanded(!expanded)}
          style={{ background: "none", border: "none", cursor: "pointer", color: accent, fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, fontWeight: 700, padding: 0, display: "flex", alignItems: "center", gap: 6, transition: "opacity 0.2s" }}>
          {expanded ? "Show Less ↑" : "Learn More ↓"}
        </button>
      </div>
    </div>
  );
};

const Services = () => {
  const [ref, inView] = useInView();
  return (
    <section id="services" style={{ padding: "110px 24px", background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bgDeep} 50%, ${C.bg} 100%)` }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: 68, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.75s ease" }}>
          <p style={{ color: C.orange, fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>What We Brew</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontWeight: 900, color: C.cream, marginBottom: 16 }}>Services That Drive Real Results</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: C.creamDim, maxWidth: 520, margin: "0 auto" }}>Everything your business needs to dominate online — under one roof.</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 22, justifyContent: "center" }}>
          {services.map((s, i) => <ServiceCard key={s.title} {...s} delay={i * 0.09} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: 52 }}>
          <Btn onClick={() => scrollTo("contact")} size="lg">Get a Custom Quote →</Btn>
        </div>
      </div>
    </section>
  );
};

// ─── PORTFOLIO ────────────────────────────────────────────────────────────────
const cases = [
  {
    tag: "Café Branding + Reels + Ads",
    name: "The Brew Lab",
    location: "Mumbai, Maharashtra",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80&auto=format&fit=crop",
    problem: "A specialty coffee shop with amazing brews but zero digital presence — only 180 Instagram followers, no ads, and no website.",
    solution: "Redesigned visual identity, weekly reel production, hyper-local Instagram ads (15 km radius), and a slick website with Swiggy Dineout integration.",
    results: [["12k+", "New Followers"], ["₹3.8L", "Monthly Revenue ↑"], ["4.1×", "ROAS"]],
    accent: C.orange,
  },
  {
    tag: "Paid Ads + Platform Setup + SEO",
    name: "Beanster Café",
    location: "Koramangala, Bengaluru",
    img: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80&auto=format&fit=crop",
    problem: "Foot traffic declining after a competitor opened nearby. Google rating 3.7, no differentiation strategy, and zero online ordering presence.",
    solution: "Google My Business overhaul, Zomato & Swiggy onboarding, storytelling reels about their sourcing story, and A/B tested Facebook ads targeting office-goers within 5 km.",
    results: [["4.9★", "Google Rating"], ["220%", "Walk-in Growth"], ["₹2.1L", "Ad Savings"]],
    accent: C.brownLight,
  },
];

const CaseCard = ({ tag, name, location, img, problem, solution, results, accent, delay }) => {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        flex: "1 1 400px", background: C.card, borderRadius: 22, overflow: "hidden",
        border: `1px solid ${hov ? accent + "55" : C.brown + "28"}`,
        transform: inView ? (hov ? "translateY(-5px)" : "translateY(0)") : "translateY(50px)",
        opacity: inView ? 1 : 0,
        transition: `all 0.8s ease ${delay}s, border-color 0.3s, transform 0.3s`,
        boxShadow: hov ? `0 28px 70px rgba(0,0,0,0.55), 0 0 0 1px ${accent}22` : "0 4px 24px rgba(0,0,0,0.3)",
      }}>
      {/* Image */}
      <div style={{ height: 220, position: "relative", overflow: "hidden" }}>
        <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55) saturate(1.3)", transition: "transform 0.6s", transform: hov ? "scale(1.06)" : "scale(1)" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 30%, ${C.card} 100%)` }} />
        <div style={{ position: "absolute", top: 18, left: 18, background: `${accent}22`, border: `1px solid ${accent}55`, borderRadius: 100, padding: "5px 14px" }}>
          <span style={{ color: accent, fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "1px" }}>{tag}</span>
        </div>
        <div style={{ position: "absolute", bottom: 18, left: 18 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: C.cream, margin: 0 }}>{name}</h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.creamDim, margin: "3px 0 0" }}>📍 {location}</p>
        </div>
      </div>

      <div style={{ padding: "24px 28px 28px" }}>
        {[["🔴 The Problem", problem, "#E05A5A"], ["✅ Our Solution", solution, C.orange]].map(([label, text, col]) => (
          <div key={label} style={{ marginBottom: 18 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, color: col, fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 7 }}>{label}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.creamDim, lineHeight: 1.75 }}>{text}</p>
          </div>
        ))}

        <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
          {results.map(([num, label]) => (
            <div key={label} style={{ flex: "1 1 90px", background: `${accent}12`, border: `1px solid ${accent}30`, borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: accent }}>{num}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.creamFaint, marginTop: 3 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [ref, inView] = useInView();
  return (
    <section id="portfolio" style={{ padding: "110px 24px", background: `linear-gradient(180deg, ${C.bg} 0%, rgba(16,10,6,0.8) 100%)` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: 64, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.75s ease" }}>
          <p style={{ color: C.orange, fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>Real Results</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontWeight: 900, color: C.cream, marginBottom: 16 }}>Case Studies That Speak</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: C.creamDim, maxWidth: 480, margin: "0 auto" }}>Transformations we've delivered for real businesses.</p>
        </div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {cases.map((c, i) => <CaseCard key={c.name} {...c} delay={i * 0.15} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: 52 }}>
          <Btn variant="ghost" onClick={() => scrollTo("contact")} size="lg">Get Similar Results for Your Business →</Btn>
        </div>
      </div>
    </section>
  );
};

// ─── RESULTS ──────────────────────────────────────────────────────────────────
const StatItem = ({ target, suffix, label, icon }) => {
  const [ref, inView] = useInView();
  const val = useCountUp(target, inView);
  return (
    <div ref={ref} style={{ textAlign: "center", flex: "1 1 180px", padding: "12px 8px" }}>
      <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 900, color: C.orange, lineHeight: 1 }}>
        {val}{suffix}
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.creamDim, marginTop: 10, lineHeight: 1.4 }}>{label}</div>
    </div>
  );
};

const Results = () => {
  const [ref, inView] = useInView();
  const stats = [
    { target: 50, suffix: "+", label: "Businesses & Brands Grown", icon: "🏪" },
    { target: 320, suffix: "%", label: "Avg Revenue Increase", icon: "💹" },
    { target: 3, suffix: ".2M+", label: "People Reached Online", icon: "📡" },
    { target: 98, suffix: "%", label: "Client Retention Rate", icon: "🤝" },
  ];
  return (
    <section id="results" style={{ padding: "110px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: 64, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.75s ease" }}>
          <p style={{ color: C.orange, fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>The Numbers</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontWeight: 900, color: C.cream }}>Growth You Can Measure</h2>
        </div>
        <div style={{ background: `linear-gradient(135deg, ${C.card} 0%, rgba(24,19,13,0.8) 100%)`, border: `1px solid ${C.brown}33`, borderRadius: 28, padding: "60px 40px", display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "space-around", boxShadow: `0 0 80px ${C.brown}18, inset 0 1px 0 rgba(255,255,255,0.04)` }}>
          {stats.map(s => <StatItem key={s.label} {...s} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: 44 }}>
          <Btn onClick={() => scrollTo("contact")} size="lg">Start Growing Today →</Btn>
        </div>
      </div>
    </section>
  );
};

// ─── BEFORE / AFTER ───────────────────────────────────────────────────────────
const BeforeAfter = () => {
  const [ref, inView] = useInView();
  const rows = [
    ["Instagram Followers", "~180", "14,200+"],
    ["Monthly Walk-ins", "400", "1,850"],
    ["Online Orders / Month", "₹0", "₹80,000+"],
    ["Google Rating", "3.6 ★", "4.9 ★"],
    ["Ad Spend ROI", "—", "4.3×"],
    ["Zomato Ranking", "Not Listed", "Top 5 in Area"],
  ];
  return (
    <section style={{ padding: "80px 24px", background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bgDeep} 100%)` }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: 52, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.75s ease" }}>
          <p style={{ color: C.orange, fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>The Transformation</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900, color: C.cream }}>Before GrowthMug vs. After</h2>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.brown}33`, borderRadius: 22, overflow: "hidden", boxShadow: "0 16px 60px rgba(0,0,0,0.4)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1.2fr", background: `linear-gradient(90deg, ${C.brown}28, ${C.brown}18)` }}>
            {["Metric", "Before ❌", "After GrowthMug ✅"].map(h => (
              <div key={h} style={{ padding: "16px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 800, color: C.creamDim, letterSpacing: "1.5px", textTransform: "uppercase" }}>{h}</div>
            ))}
          </div>
          {rows.map(([metric, before, after], i) => (
            <div key={metric} style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1.2fr", borderTop: `1px solid ${C.brown}1a`, background: i % 2 === 0 ? "transparent" : "rgba(107,63,26,0.04)" }}>
              <div style={{ padding: "18px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, color: C.cream, fontWeight: 500 }}>{metric}</div>
              <div style={{ padding: "18px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#E05A5A", fontWeight: 500 }}>{before}</div>
              <div style={{ padding: "18px 24px", fontFamily: "'Playfair Display', serif", fontSize: 15, color: C.orange, fontWeight: 800 }}>{after}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const testimonials = [
  { name: "Priya Sharma", role: "Owner, The Brew Lab · Mumbai", quote: "GrowthMug didn't just run our ads — they understood our vibe. Within 3 months we went from 200 to 12,000 followers and our weekends are now fully booked.", avatar: "PS", rating: 5 },
  { name: "Aditya Menon", role: "Co-founder, Beanster Café · Bengaluru", quote: "The reels they created went viral locally. A reel about our single-origin Coorg beans got 80K views and brought in customers from across the city!", avatar: "AM", rating: 5 },
  { name: "Sunita Rao", role: "Owner, Sip & Story Apparel · Pune", quote: "Our website now ranks #1 for our brand in Koregaon Park. Online orders went from zero to ₹80,000/month. GrowthMug are absolute game changers.", avatar: "SR", rating: 5 },
];

const TestCard = ({ name, role, quote, avatar, rating, delay }) => {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: C.card, border: `1px solid ${hov ? C.orange + "44" : C.brown + "28"}`, borderRadius: 20, padding: "30px 26px", flex: "1 1 280px",
        opacity: inView ? 1 : 0, transform: inView ? (hov ? "translateY(-5px)" : "translateY(0)") : "translateY(40px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.4s ease, border-color 0.3s, box-shadow 0.3s`,
        boxShadow: hov ? `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px ${C.orange}18` : "none",
      }}>
      <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
        {[...Array(rating)].map((_, i) => <span key={i} style={{ color: C.orange, fontSize: 14 }}>★</span>)}
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.creamDim, lineHeight: 1.8, marginBottom: 24, fontStyle: "italic" }}>"{quote}"</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: `1px solid ${C.brown}28`, paddingTop: 18 }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${C.orange}, ${C.brownLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: C.white, fontSize: 14, flexShrink: 0 }}>{avatar}</div>
        <div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, fontWeight: 700, color: C.cream }}>{name}</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: C.creamFaint, marginTop: 1 }}>{role}</div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [ref, inView] = useInView();
  return (
    <section id="testimonials" style={{ padding: "110px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: 64, opacity: inView ? 1 : 0, transition: "all 0.75s ease" }}>
          <p style={{ color: C.orange, fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>Client Love ❤️</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontWeight: 900, color: C.cream }}>What Café Owners Say</h2>
        </div>
        <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
          {testimonials.map((t, i) => <TestCard key={t.name} {...t} delay={i * 0.12} />)}
        </div>
      </div>
    </section>
  );
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  { q: "Do you work with small businesses and brands too — not just cafés?", a: "Absolutely. While cafés are our specialty, we work with all kinds of local businesses and small brands — clothing stores, cloud kitchens, coaching centres, salons, D2C brands, and more. If you sell something and need more customers, GrowthMug is for you." },
  { q: "How long does it take to see results?", a: "Most clients start seeing measurable improvements — more profile visits, story views, and walk-ins — within the first 30 days. Significant revenue impact typically follows in 60–90 days as campaigns optimize." },
  { q: "Do you handle ads AND content both?", a: "Yes! We manage the complete digital stack — content creation, reel shooting & editing, paid ad campaigns, and community management. You focus on your business; we handle the internet." },
  { q: "What is your pricing model?", a: "We offer flexible monthly retainers starting from ₹15,000/month depending on the services chosen. We also offer project-based pricing for one-time work like websites or menu design. Book a free call for a custom quote." },
  { q: "What does the on-field survey include?", a: "Our team visits your location physically, assesses your setup, signage, customer experience, and local competition, then delivers a written Improvement Report (PDF) with a clear 90-day action plan tailored to your business." },
  { q: "Can you manage our Instagram fully?", a: "Yes. Full Instagram management includes content planning, reel production, posting, story management, hashtag research, engagement, and monthly performance reports. We become your virtual social media team." },
  { q: "What are your college club tie-ups?", a: "We partner with college fest committees, student clubs, and campus communities for brand activations, sponsorships, and promotions — giving your brand massive reach among young audiences at low cost." },
];

const FAQItem = ({ q, a, i }) => {
  const [open, setOpen] = useState(false);
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov || open ? C.cardHover : C.card, border: `1px solid ${open ? C.orange + "55" : hov ? C.brown + "55" : C.brown + "28"}`, borderRadius: 14, overflow: "hidden", transition: "all 0.3s ease", marginBottom: 12 }}>
      <button onClick={() => setOpen(!open)}
        style={{ width: "100%", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15.5, fontWeight: 700, color: open ? C.orange : C.cream, textAlign: "left", lineHeight: 1.4 }}>
          <span style={{ color: C.orange, marginRight: 10, fontFamily: "'Playfair Display', serif" }}>0{i + 1}.</span>{q}
        </span>
        <span style={{ color: C.orange, fontSize: 20, flexShrink: 0, transform: open ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.35s cubic-bezier(.4,0,.2,1)", fontWeight: 300 }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 300 : 0, overflow: "hidden", transition: "max-height 0.45s cubic-bezier(.4,0,.2,1)" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, color: C.creamDim, lineHeight: 1.8, padding: "0 24px 22px", borderTop: `1px solid ${C.brown}22`, paddingTop: 14 }}>{a}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [ref, inView] = useInView();
  return (
    <section id="faq" style={{ padding: "110px 24px", background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bgDeep} 100%)` }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: 60, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.75s ease" }}>
          <p style={{ color: C.orange, fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>Got Questions?</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 900, color: C.cream, marginBottom: 12 }}>Frequently Asked</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.creamDim }}>Everything café owners ask before working with us.</p>
        </div>
        {faqs.map((f, i) => <FAQItem key={f.q} {...f} i={i} />)}
        <div style={{ textAlign: "center", marginTop: 44 }}>
          <Btn onClick={() => scrollTo("contact")} size="lg">Still Have Questions? Let's Talk ☕</Btn>
        </div>
      </div>
    </section>
  );
};

// ─── CONTACT ──────────────────────────────────────────────────────────────────
const Contact = () => {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load EmailJS script once and initialise with real public key
  useEffect(() => {
    if (document.getElementById("emailjs-sdk")) return;
    const script = document.createElement("script");
    script.id = "emailjs-sdk";
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = () => {
     window.emailjs.init({
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
});
    };
    document.head.appendChild(script);
  }, []);

  const handleSubmit = async () => {
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in Name, Email and Message.");
      return;
    }
    setLoading(true);
    try {
      // Sends lead notification to muggrowth@gmail.com
      // + auto-reply to the customer via template_m0ag6zw
      await window.emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name:     form.name,
          email:    form.email,
          phone:    form.phone || "Not provided",
          message:  form.message,
          to_email: "muggrowth@gmail.com",
          reply_to: form.email,
        }
      );
      setSent(true);
    } catch (err) {
      // Fallback: pre-fill WhatsApp with form data if EmailJS fails
      const text = encodeURIComponent(
        `Hi GrowthMug! Here's my inquiry:\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || "N/A"}\nMessage: ${form.message}`
      );
      window.open(`https://wa.me/918445201080?text=${text}`, "_blank");
      setSent(true);
    }
    setLoading(false);
  };

  const inp = {
    width: "100%", padding: "14px 18px", background: C.bgDeep, border: `1px solid ${C.brown}44`,
    borderRadius: 11, color: C.cream, fontFamily: "'DM Sans', sans-serif", fontSize: 15,
    outline: "none", boxSizing: "border-box", transition: "border-color 0.25s",
  };

  return (
    <section id="contact" style={{ padding: "110px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: 52, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.75s ease" }}>
          <p style={{ color: C.orange, fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>Let's Talk</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 900, color: C.cream, marginBottom: 14 }}>Ready to Brew<br /><span style={{ color: C.orange, fontStyle: "italic" }}>Some Growth?</span></h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: C.creamDim }}>Get a free marketing audit — we'll show you exactly what's holding your business back.</p>
        </div>

        {sent ? (
          <div style={{ textAlign: "center", background: C.card, border: `1px solid ${C.orange}44`, borderRadius: 20, padding: "60px 40px" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>☕</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: C.cream, marginBottom: 10 }}>Message received!</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: C.creamDim, fontSize: 15, lineHeight: 1.7 }}>
              We'll reach out to you at <strong style={{ color: C.orange }}>{form.email}</strong> within 24 hours.<br />
              <span style={{ fontSize: 13, color: C.creamFaint }}>Check your inbox — an auto-reply is on its way too! 📬</span>
            </p>
          </div>
        ) : (
          <div style={{ background: C.card, border: `1px solid ${C.brown}33`, borderRadius: 22, padding: "40px 36px", boxShadow: "0 16px 60px rgba(0,0,0,0.4)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <input placeholder="Your Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inp}
                onFocus={e => e.target.style.borderColor = C.orange} onBlur={e => e.target.style.borderColor = `${C.brown}44`} />
              <input placeholder="Email Address *" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inp}
                onFocus={e => e.target.style.borderColor = C.orange} onBlur={e => e.target.style.borderColor = `${C.brown}44`} />
            </div>
            <input placeholder="Phone / WhatsApp Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={{ ...inp, marginBottom: 14 }}
              onFocus={e => e.target.style.borderColor = C.orange} onBlur={e => e.target.style.borderColor = `${C.brown}44`} />
            <textarea placeholder="Tell us about your business and your biggest marketing challenge... *" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5}
              style={{ ...inp, resize: "vertical", marginBottom: error ? 8 : 18 }}
              onFocus={e => e.target.style.borderColor = C.orange} onBlur={e => e.target.style.borderColor = `${C.brown}44`} />
            {error && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#E05A5A", marginBottom: 14 }}>⚠️ {error}</p>}
            <Btn onClick={handleSubmit} size="lg" style={{ width: "100%", justifyContent: "center" }}>
              {loading ? "Sending... ☕" : "Get My Free Marketing Audit →"}
            </Btn>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.creamFaint, textAlign: "center", marginTop: 12 }}>
              📧 Sends to muggrowth@gmail.com · Auto-reply sent to you instantly
            </p>
          </div>
        )}

        {/* Alt CTAs */}
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.creamFaint, marginBottom: 16 }}>Prefer to connect directly?</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn variant="whatsapp" size="md"
              onClick={() => window.open("https://wa.me/918445201080?text=Hi%2C%20I%20want%20a%20free%20marketing%20audit%20for%20my%20business!", "_blank")}>
              💬 Chat on WhatsApp
            </Btn>
            <Btn variant="ghost" size="md"
              onClick={() => window.open("https://instagram.com/growthmug", "_blank")}>
              📸 Follow on Instagram
            </Btn>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = () => {
  const links = ["Services", "Portfolio", "Results", "Testimonials", "FAQ", "Contact"];
  return (
    <footer style={{ borderTop: `1px solid ${C.brown}28`, background: C.bgDeep, padding: "52px 24px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
          <div style={{ maxWidth: 300 }}>
            <Logo />
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.creamFaint, marginTop: 14, lineHeight: 1.7 }}>
              Brewing Growth for Your Business ☕<br />India's premium digital marketing agency for small businesses & local brands.
            </p>
          </div>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.orange, letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>Navigation</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {links.map(l => {
                const [h, setH] = useState(false);
                return (
                  <button key={l} onClick={() => scrollTo(l.toLowerCase())}
                    onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: h ? C.orange : C.creamFaint, fontFamily: "'DM Sans', sans-serif", fontSize: 14, textAlign: "left", transition: "color 0.2s" }}>
                    {l}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.orange, letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>Connect</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "📸 Instagram", href: "https://instagram.com/growthmug" },
                { label: "💬 WhatsApp", href: "https://wa.me/918445201080" },
                { label: "💼 LinkedIn", href: "#" },
                { label: "📧 hello@growthmug.in", href: "mailto:hello@growthmug.in" },
              ].map(({ label, href }) => {
                const [h, setH] = useState(false);
                return (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                    style={{ color: h ? C.orange : C.creamFaint, fontFamily: "'DM Sans', sans-serif", fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}>
                    {label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${C.brown}22`, paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.creamFaint }}>© 2026 GrowthMug. All rights reserved.</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.creamFaint }}>Made with ☕ in India</p>
        </div>
      </div>
    </footer>
  );
};

// ─── FLOATING WHATSAPP ────────────────────────────────────────────────────────
const FloatingWhatsApp = () => {
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 2000); return () => clearTimeout(t); }, []);
  return (
    <a href="https://wa.me/918445201080?text=Hi%2C%20I%20want%20a%20free%20marketing%20audit%20for%20my%20business!" target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 999,
        width: hov ? 56 : 52, height: hov ? 56 : 52,
        background: C.green, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 26, textDecoration: "none",
        boxShadow: hov ? `0 12px 40px ${C.green}77, 0 0 0 6px ${C.green}22` : `0 6px 24px ${C.green}55`,
        transform: vis ? (hov ? "scale(1.1)" : "scale(1)") : "scale(0)",
        transition: "all 0.4s cubic-bezier(.34,1.56,.64,1)",
      }}>
      💬
    </a>
  );
};

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=DM+Sans:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { background: #080604; color: #F5E6D3; -webkit-font-smoothing: antialiased; }
      input::placeholder, textarea::placeholder { color: #4A3F35; }
      @media (max-width: 680px) {
        .gm-nav-links { display: none !important; }
        .gm-hamburger { display: block !important; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Results />
      <BeforeAfter />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}