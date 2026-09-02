import { ReactNode } from "react";
import Link from "next/link";
import { Leaf, Users, BookOpen, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { PlantGrowthIllustration, CalmPersonIllustration, CourseIllustration } from "@/components/shared/illustrations";

interface AuthSplitLayoutProps {
  children: ReactNode;
  currentTab: "login" | "register";
}

export function AuthSplitLayout({ children, currentTab }: AuthSplitLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#F7F6F2] font-sans overflow-hidden selection:bg-sage/30 relative">
      
      {/* Full-width Top Navigation */}
      <header className="absolute top-0 left-0 w-full z-50 hidden lg:flex items-center justify-between px-12 xl:px-20 pt-10">
        <div className="flex items-center gap-2 text-forest-deep font-display text-xl font-bold tracking-tight">
          <Leaf className="h-6 w-6 text-sage" fill="currentColor" />
          RECONNECT
        </div>
        <nav className="flex items-center gap-8 text-sm font-medium text-forest-deep/80">
          <a href="#" className="hover:text-forest-deep transition-colors">How it works</a>
          <a href="#" className="hover:text-forest-deep transition-colors">For participants</a>
          <a href="#" className="hover:text-forest-deep transition-colors">For organizations</a>
          <a href="#" className="hover:text-forest-deep transition-colors">Resources</a>
          <a href="#" className="hover:text-forest-deep transition-colors">About us</a>
        </nav>
        <button className="px-5 py-2.5 rounded-full border border-forest/20 text-forest-deep text-sm font-semibold hover:bg-forest/5 transition-colors bg-white/50 backdrop-blur-sm">
          Contact us
        </button>
      </header>

      {/* Left Column - Marketing/Landing */}
      <div className="hidden lg:flex lg:w-[55%] flex-col relative z-10 px-12 xl:px-20 pt-40">

        {/* Hero Content */}
        <div className="max-w-xl relative z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sage/10 text-forest text-xs font-semibold mb-6">
            <Leaf className="w-3.5 h-3.5" />
            A supportive ecosystem for rehabilitation and reintegration
          </div>
          
          <h1 className="font-display text-[4rem] leading-[1.1] text-forest-deep mb-6">
            Your journey.<br />
            Our support.<br />
            Stronger together.
          </h1>
          
          <p className="text-lg text-forest-deep/70 mb-12 max-w-md leading-relaxed">
            RECONNECT is a platform that connects people with the right support, at the right time, for a stronger tomorrow.
          </p>

          {/* Features */}
          <div className="grid grid-cols-4 gap-4 max-w-lg mb-16">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center text-forest shadow-sm">
                <Leaf className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-forest-deep">Personalized<br/>Guidance</span>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F4EBE1] flex items-center justify-center text-[#B56A4F] shadow-sm">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-forest-deep">Trusted<br/>Community</span>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F0E8] flex items-center justify-center text-sage shadow-sm">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-forest-deep">Learning &<br/>Resources</span>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F0F4E8] flex items-center justify-center text-[#7C9A4B] shadow-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-forest-deep">Track<br/>Progress</span>
            </div>
          </div>
        </div>

        {/* Abstract organic shapes / illustration mimicking the green garden background */}
        <div className="absolute -bottom-20 -left-20 w-[140%] h-[50%] bg-gradient-to-t from-sage/20 to-transparent rounded-[100%] z-0 pointer-events-none blur-3xl" />
      </div>

      {/* Right Column - Auth Box */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12 lg:pt-32 relative z-20">
        
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-2 text-forest-deep font-display text-2xl font-bold mb-8">
          <Leaf className="h-7 w-7 text-sage" fill="currentColor" />
          RECONNECT
        </div>

        <div className="w-full max-w-[500px] rounded-[32px] bg-white p-8 sm:p-12 shadow-[0_8px_40px_rgb(0,0,0,0.04)] relative overflow-hidden">
          {/* Decorative Green Accent Line */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-sage via-forest to-sage" />
          
          {/* Subtle Background Leaves */}
          <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none -mr-8 -mt-8">
             <PlantGrowthIllustration className="w-48 h-48 text-forest rotate-[15deg]" />
          </div>

          <div className="mb-8 text-center relative z-10">
            <h2 className="font-display text-3xl text-forest-deep mb-2 flex items-center justify-center gap-2">
              Welcome to RECONNECT
              <Leaf className="w-6 h-6 text-sage rotate-12" fill="currentColor" />
            </h2>
            <p className="text-sm text-muted-foreground">Sign in or create an account to continue your journey.</p>
          </div>

          {/* Tabs */}
          <div className="flex mb-8 border-b border-border">
            <Link 
              href="/login"
              className={cn(
                "flex-1 text-center py-3 text-sm font-semibold transition-colors relative",
                currentTab === "login" ? "text-forest-deep" : "text-muted-foreground hover:text-forest-deep"
              )}
            >
              Log in
              {currentTab === "login" && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-forest-deep" />
              )}
            </Link>
            <Link 
              href="/register"
              className={cn(
                "flex-1 text-center py-3 text-sm font-semibold transition-colors relative",
                currentTab === "register" ? "text-forest-deep" : "text-muted-foreground hover:text-forest-deep"
              )}
            >
              Sign up
              {currentTab === "register" && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-forest-deep" />
              )}
            </Link>
          </div>

          {/* Form Content */}
          {children}

        </div>
      </div>
    </div>
  );
}
