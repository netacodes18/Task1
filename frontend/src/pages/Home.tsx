import { Link } from 'react-router-dom';
import { Sparkles, Users, BookOpen, Clock, CheckCircle2, GraduationCap, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto pb-20 relative">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] overflow-hidden -z-10 pointer-events-none">
        {/* Fading Light Grid (Made more visible) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
        
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-[#e76f51]/10 to-[#f4a261]/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-20 mb-32 relative">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md text-[#e76f51] font-bold text-sm mb-8 border border-slate-200 shadow-sm hover:border-[#e76f51]/30 hover:scale-105 transition-all cursor-default group">
          <Sparkles size={16} className="text-[#f4a261] group-hover:animate-spin" />
          Enterprise Grade Assignment
        </div>

        <h1 className="text-7xl font-black text-slate-900 tracking-tighter leading-[1.1] mb-8 max-w-5xl drop-shadow-sm">
          Intelligent Student Course <br />
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#e76f51] via-[#f4a261] to-orange-400 drop-shadow-sm">
            Allocation Engine
          </span>
        </h1>

        <p className="text-xl text-slate-500 max-w-2xl mb-12 leading-relaxed font-medium">
          A high-performance algorithmic simulation for dynamic student admissions. Featuring intelligent waitlists, strict category quotas, and an integrated real-time AI assistant.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 z-10">
          <Link
            to="/register"
            className="group px-8 py-4 bg-gradient-to-r from-[#e76f51] to-orange-500 text-white rounded-full font-bold hover:shadow-[0_15px_40px_rgb(231,111,81,0.4)] hover:-translate-y-1 transition-all flex items-center gap-3 text-lg border border-transparent hover:border-white/20"
          >
            <Users size={22} className="group-hover:scale-110 transition-transform" />
            Register Student
          </Link>
          <Link
            to="/dashboard"
            className="group px-8 py-4 bg-white/80 backdrop-blur-xl text-slate-700 rounded-full font-bold border border-slate-200 hover:border-[#e76f51]/40 hover:bg-white hover:text-[#e76f51] transition-all shadow-sm hover:shadow-[0_15px_40px_rgb(0,0,0,0.05)] hover:-translate-y-1 flex items-center gap-3 text-lg"
          >
            Admin Dashboard 
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>

      {/* Advanced Features Grid */}
      <div className="mb-32 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-800 mb-4">Core Architecture</h2>
          <p className="text-slate-500 font-medium text-lg">Engineered for absolute precision and scalability.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:border-[#e76f51]/20 hover:shadow-[0_20px_50px_rgb(231,111,81,0.1)] transition-all duration-500 hover:-translate-y-2 group">
            <div className="w-16 h-16 bg-gradient-to-br from-[#e76f51]/10 to-[#f4a261]/20 rounded-3xl flex items-center justify-center text-[#e76f51] mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
              <Sparkles size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-[#e76f51] transition-colors">AI Analytics Assistant</h3>
            <p className="text-slate-500 font-medium leading-relaxed text-lg">
              Integrated with Google Gemini 2.5 Flash to provide real-time, natural language querying of the active database state and student allocations.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:border-[#2a9d8f]/20 hover:shadow-[0_20px_50px_rgb(42,157,143,0.1)] transition-all duration-500 hover:-translate-y-2 group">
            <div className="w-16 h-16 bg-gradient-to-br from-[#2a9d8f]/10 to-teal-500/20 rounded-3xl flex items-center justify-center text-[#2a9d8f] mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
              <Clock size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-[#2a9d8f] transition-colors">Intelligent Waitlist</h3>
            <p className="text-slate-500 font-medium leading-relaxed text-lg">
              Handles scarcity gracefully. Unallocated students are automatically assigned dynamic waitlist queue numbers for their top-priority course.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:border-blue-500/20 hover:shadow-[0_20px_50px_rgb(59,130,246,0.1)] transition-all duration-500 hover:-translate-y-2 group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-indigo-500/20 rounded-3xl flex items-center justify-center text-blue-500 mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
              <BookOpen size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-500 transition-colors">Multi-Preference Logic</h3>
            <p className="text-slate-500 font-medium leading-relaxed text-lg">
              Dynamically evaluates 3 cascading preferences per student. If Priority 1 is fully saturated, the algorithm seamlessly falls back to Priority 2 and 3.
            </p>
          </div>
        </div>
      </div>

      {/* Business Rules Implementation (Dark Mode Section) */}
      <div className="bg-slate-900 rounded-[3rem] p-16 text-white relative overflow-hidden shadow-2xl shadow-slate-900/20 mx-4">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-1000">
          <ShieldCheck size={300} className="text-[#e76f51]" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white font-bold text-sm mb-6 border border-white/10 backdrop-blur-md">
                <GraduationCap size={18} /> 100% Acceptance Criteria Met
              </div>
              <h2 className="text-5xl font-black tracking-tight">Business Rules Implemented</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="flex gap-5 p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all backdrop-blur-sm group hover:-translate-y-1 hover:shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-[#2a9d8f]/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="text-[#2a9d8f]" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-2 text-white">Merit-Based Priority</h4>
                <p className="text-slate-400 font-medium leading-relaxed">Algorithm dynamically sorts the database queue by highest Marks first before evaluating seats.</p>
              </div>
            </div>

            <div className="flex gap-5 p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all backdrop-blur-sm group hover:-translate-y-1 hover:shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-[#e76f51]/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="text-[#e76f51]" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-2 text-white">Strict Category Reservation</h4>
                <p className="text-slate-400 font-medium leading-relaxed">Independent seat counters for General, OBC, SC, and ST ensuring quotas are mathematically respected.</p>
              </div>
            </div>

            <div className="flex gap-5 p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all backdrop-blur-sm group hover:-translate-y-1 hover:shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="text-blue-400" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-2 text-white">Date Tie-Breakers</h4>
                <p className="text-slate-400 font-medium leading-relaxed">If two students share identical marks, the algorithm prioritizes the earliest application timestamp.</p>
              </div>
            </div>

            <div className="flex gap-5 p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all backdrop-blur-sm group hover:-translate-y-1 hover:shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="text-purple-400" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-2 text-white">Single Allocation Guarantee</h4>
                <p className="text-slate-400 font-medium leading-relaxed">Transaction logic ensures a student can only ever consume a single seat across the entire system.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
