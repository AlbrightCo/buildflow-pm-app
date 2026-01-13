"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Clock, FileText, Camera, BarChart3, ChevronRight, Menu, Users } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">

      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-[-20%] right-[10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[128px]" />
      </div>

      {/* Navigation */}
      <header className="fixed top-0 w-full bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image src="/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">BuildFlow</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</a>
            <a href="#about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">About</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:block text-sm font-medium text-slate-300 hover:text-white transition-colors">Sign In</Link>
            <Link href="/login">
              <Button className="hidden md:flex bg-blue-600 hover:bg-blue-500 text-white rounded-full px-6 py-5 shadow-lg shadow-blue-500/25 border border-blue-400/20">
                Get Started <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => document.getElementById('mobile-menu')?.classList.toggle('hidden')}>
                <Menu className="w-6 h-6 text-white" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div id="mobile-menu" className="hidden absolute top-20 left-0 w-full bg-[#020617] border-b border-white/5 p-4 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-5">
          <a href="#features" className="text-lg font-medium text-slate-300 py-2" onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}>Features</a>
          <a href="#pricing" className="text-lg font-medium text-slate-300 py-2" onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}>Pricing</a>
          <a href="#about" className="text-lg font-medium text-slate-300 py-2" onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}>About</a>
          <Link href="/login" className="w-full">
            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-6 text-lg">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      <main className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Hero Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <motion.div variants={fadeInUp} className="flex justify-center mb-8">
              <div className="relative w-32 h-32 md:w-48 md:h-48">
                <Image src="/logo.png" alt="BuildFlow Logo" fill className="object-contain drop-shadow-2xl" />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              New Version 2.0 Live
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Construction Management, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Reimagined.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Streamline your projects from bid to closeout. The all-in-one platform designed for modern general contractors who demand precision.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <Link href="/login">
                <Button size="lg" className="h-14 px-8 rounded-full bg-white text-slate-900 hover:bg-slate-200 font-bold text-lg">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="#demo">
                <Button variant="outline" size="lg" className="h-14 px-8 rounded-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white font-semibold text-lg">
                  <span className="mr-2">▶</span> Watch Demo
                </Button>
              </Link>
            </motion.div>

            {/* Demo Video Section */}
            <motion.div
              id="demo"
              variants={fadeInUp}
              className="relative mx-auto max-w-4xl aspect-video bg-black rounded-2xl border border-white/10 shadow-2xl overflow-hidden mb-32 group cursor-pointer"
              onClick={() => setIsPlaying(true)}
            >
              {!isPlaying ? (
                <>
                  {/* Thumbnail / Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition-colors z-10">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                    </div>
                  </div>

                  {/* Background Image/Gradient (Placeholder for Video Thumbnail) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900">
                    {/* Optional: You can put an <Image /> here for the thumbnail */}
                  </div>

                  <div className="absolute bottom-4 left-4 text-sm text-slate-300 z-10 font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">
                    ▶ Watch Platform Demo (2:14)
                  </div>
                </>
              ) : (
                /* YouTube Embed */
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/LXivk70o3z8?autoplay=1&mute=0"
                  title="BuildFlow Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              )}
            </motion.div>
          </motion.div>

          {/* Dashboard Preview (The "Amazing" Part) */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mx-auto max-w-5xl"
          >
            {/* Glassmorphism Logic */}
            <div className="relative bg-[#0F172A]/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">

              {/* Fake Window Header */}
              <div className="h-12 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                </div>
              </div>

              {/* Dashboard Layout Mockup */}
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Main Project Card */}
                  <div className="flex-1 w-full space-y-6">
                    <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-xl p-6 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500"></div>

                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-1">Highland Medical Center</h3>
                            <p className="text-blue-200/60 text-sm">Phase 2 • Interior Buildout</p>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/20 uppercase">Active</span>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-8">
                          <div className="bg-[#020617]/40 rounded-lg p-4 text-center backdrop-blur-sm">
                            <div className="text-2xl font-bold text-white">5</div>
                            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">Pending</div>
                          </div>
                          <div className="bg-[#020617]/40 rounded-lg p-4 text-center backdrop-blur-sm">
                            <div className="text-2xl font-bold text-white">24</div>
                            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">Drawings</div>
                          </div>
                          <div className="bg-[#020617]/40 rounded-lg p-4 text-center backdrop-blur-sm">
                            <div className="text-2xl font-bold text-emerald-400">89%</div>
                            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">Complete</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Grid Features */}
                    <div className="grid gap-4">
                      {[
                        { title: "Time Tracking", desc: "Clock in and out with geo-fencing", icon: Clock, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                        { title: "Drawings & BIM", desc: "View 3D plans and models", icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10" },
                        { title: "Photo Documentation", desc: "Walking report", icon: Camera, color: "text-purple-400", bg: "bg-purple-500/10" },
                        { title: "Progress Tracking", desc: "Daily logs report", icon: BarChart3, color: "text-orange-400", bg: "bg-orange-500/10" },
                      ].map((item, i) => (
                        <div key={i} className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center`}>
                              <item.icon className={`w-5 h-5 ${item.color}`} />
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-200 group-hover:text-white transition-colors">{item.title}</h4>
                              <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">{item.desc}</p>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>


        {/* Features Section */}
        <section id="features" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need to <span className="text-blue-400">build better.</span></h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">From pre-construction to closeout, BuildFlow connects your office and field teams in one unified platform.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Smart Scheduling", desc: "AI-powered Gantt charts that predict delays before they happen.", icon: Clock },
                { title: "Financial Control", desc: "Real-time budget tracking, change orders, and payment applications.", icon: BarChart3 },
                { title: "Field Management", desc: "Daily logs, photo documentation, and safety reports from mobile.", icon: Camera },
                { title: "Document Control", desc: "Always-up-to-date drawings, submittals, and RFIs.", icon: FileText },
                { title: "Team Collaboration", desc: "Unlimited users and permissions for subs, owners, and architects.", icon: Users },
                { title: "AI Assistant 'Flow'", desc: "Ask questions about your project and get instant answers.", icon: Menu }, // Using Menu as placeholder for AI icon
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-2xl bg-[#0F172A]/40 border border-white/5 hover:bg-[#0F172A]/60 transition-colors">
                  <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center mb-6">
                    <item.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple, transparent <span className="text-purple-400">pricing.</span></h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">No hidden fees. Unlimited users on all plans.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="p-8 rounded-3xl bg-[#0F172A]/40 border border-white/5 flex flex-col">
                <h3 className="text-xl font-bold text-slate-300 mb-2">Starter</h3>
                <div className="text-4xl font-bold mb-6">$399<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                <p className="text-slate-400 mb-8">Perfect for small GCs and specialty contractors.</p>
                <ul className="space-y-4 mb-8 flex-1">
                  {["Up to 5 Projects", "Unlimited Users", "Field & Office Tools", "2GB Storage"].map(feat => (
                    <li key={feat} className="flex items-center gap-3 text-slate-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> {feat}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">Start Trial</Button>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-b from-blue-900/20 to-[#0F172A]/60 border border-blue-500/30 flex flex-col relative transform md:-translate-y-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Most Popular</div>
                <h3 className="text-xl font-bold text-white mb-2">Growth</h3>
                <div className="text-4xl font-bold mb-6 text-blue-400">$699<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                <p className="text-slate-300 mb-8">For growing construction companies.</p>
                <ul className="space-y-4 mb-8 flex-1">
                  {["Unlimited Projects", "AI Assistant 'Flow'", "Financial Management", "Procore Import/Export", "1TB Storage", "Priority Support"].map(feat => (
                    <li key={feat} className="flex items-center gap-3 text-white text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> {feat}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-500">Get Started</Button>
              </div>

              <div className="p-8 rounded-3xl bg-[#0F172A]/40 border border-white/5 flex flex-col">
                <h3 className="text-xl font-bold text-slate-300 mb-2">Enterprise</h3>
                <div className="text-4xl font-bold mb-6">Custom</div>
                <p className="text-slate-400 mb-8">For large ENR 400 contractors.</p>
                <ul className="space-y-4 mb-8 flex-1">
                  {["Everything in Growth", "SSO & Advanced Security", "Custom Integrations", "Dedicated Success Manager", "API Access"].map(feat => (
                    <li key={feat} className="flex items-center gap-3 text-slate-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> {feat}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">Contact Sales</Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 relative border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Built by Builders, for Builders.</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              BuildFlow was founded with a simple mission: to eliminate the chaos of construction management.
              We believe that powerful software shouldn't be complicated or expensive. That's why we built a platform
              that's intuitive enough for the field, but powerful enough for the boardroom.
            </p>
            <div className="flex justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-800 border border-white/10 overflow-hidden relative">
                {/* Placeholder for founder image */}
                <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-500">Img</div>
              </div>
              <div className="text-left">
                <div className="font-bold text-white">Dylan Albright</div>
                <div className="text-sm text-blue-400">Founder & CEO</div>
              </div>
            </div>
          </div>
        </section>

      </main >

      {/* Footer */}
      < footer className="border-t border-white/5 bg-[#020617] mt-20 py-12" >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-500 mb-4">Trusted by the world's best builders.</p>
          <div className="flex justify-center gap-8 grayscale opacity-40">
            {/* Fake logos for effect */}
            <span className="text-xl font-bold font-serif">Turner</span>
            <span className="text-xl font-bold font-sans">Bechtel</span>
            <span className="text-xl font-bold font-mono">SKANSKA</span>
            <span className="text-xl font-bold">DPR</span>
          </div>
          <div className="mt-12 text-sm text-slate-600">
            © 2026 BuildFlow PM. All rights reserved.
          </div>
        </div>
      </footer >
    </div >
  );
}
