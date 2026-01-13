import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100">
      {/* Navigation */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="relative h-10 w-10">
                {/* Using the logo we copied */}
                <Image src="/logo.png" alt="BuildFlow Logo" fill className="object-contain" />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">BuildFlow PM</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">Testimonials</a>
              <a href="#pricing" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">Pricing</a>
            </nav>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium">Log in</Link>
              <Link href="/login">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 shadow-lg shadow-blue-600/20">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl mix-blend-multiply filter animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl mix-blend-multiply filter animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-purple-500 rounded-full blur-3xl mix-blend-multiply filter animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            <span className="block text-gray-900">Manage Construction</span>
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              With Precision.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 mb-10">
            The all-in-one project management platform for modern builders. Track projects, assign tasks, and manage teams seamlessly.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl shadow-blue-600/30 font-semibold">
                Start Free Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50 text-gray-600 hover:text-blue-600 font-semibold transition-all">
              Watch Demo
            </Button>
          </div>

          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 h-24 bottom-0"></div>
            {/* Placeholder for a dashbaord screenshot if we had one, CSS shape for now */}
            <div className="mx-auto max-w-5xl bg-gray-900 rounded-xl shadow-2xl border border-gray-800 p-2 aspect-[16/9] flex items-center justify-center">
              <div className="text-center text-white">
                <p className="text-2xl font-bold mb-2">BuildFlow Dashboard</p>
                <p className="text-gray-400">Interactive Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="relative h-6 w-6 opacity-80">
              <Image src="/logo.png" alt="BuildFlow Logo" fill className="object-contain" />
            </div>
            <span>© 2025 BuildFlow PM. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
