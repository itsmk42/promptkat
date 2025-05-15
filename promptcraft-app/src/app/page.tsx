import Image from "next/image";
import Link from "next/link";
import PromptCard from '@/components/PromptCard';
import Header from '@/components/Header';
import FAQSection from '@/components/FAQSection';

const samplePrompts = [
  {
    id: '1',
    title: 'Creative Writing Starter',
    description: 'A prompt to kickstart your next short story or novel chapter with an intriguing scenario.',
    category: 'Creative Writing',
    categoryColor: 'purple',
    price: 9.99,
    rating: 4.8,
    reviews: 124,
    type: 'text' as 'text'
  },
  {
    id: '2',
    title: 'Marketing Campaign Brainstorm',
    description: 'Generate innovative ideas for a new product launch marketing campaign.',
    category: 'Marketing',
    categoryColor: 'pink',
    price: 12.99,
    rating: 4.7,
    reviews: 86,
    type: 'text' as 'text'
  },
  {
    id: '3',
    title: 'Code Debugging Assistant',
    description: 'Describe your coding problem and get suggestions for debugging.',
    category: 'Programming',
    categoryColor: 'orange',
    price: 8.99,
    rating: 4.9,
    reviews: 152,
    type: 'text' as 'text'
  },
  {
    id: '4',
    title: 'Daily Productivity Planner',
    description: 'Structure your day for maximum productivity with this planning prompt.',
    category: 'Personal Development',
    categoryColor: 'yellow',
    price: 7.99,
    rating: 4.6,
    reviews: 93,
    type: 'text' as 'text'
  },
];

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen pt-16">
      <Header />

      {/* Hero Section */}
      <header className="relative pt-24 pb-20 px-4 md:pt-40 md:pb-32">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
          <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80')] bg-cover bg-center blur-sm"></div>
        </div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Craft Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">AI Responses</span> with Expert Prompts
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Unlock the full potential of AI with our curated collection of premium prompts designed by experts for stunning results.
            </p>
            <div className="flex justify-center">
              <Link href="/prompts" className="bg-gradient-to-r from-purple-500 to-pink-600 px-8 py-4 rounded-lg text-base font-medium hover:opacity-90 transition text-center shadow-lg">
                Browse Prompts
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>5,000+ Premium Prompts</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Works with All AI Platforms</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Expert-Crafted Results</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Prompts Section */}
      <section className="py-16 px-4 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Prompts</h2>
            <Link href="/prompts" className="text-purple-400 hover:text-purple-300 transition">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {samplePrompts.map((prompt) => (
              <PromptCard key={prompt.id} {...prompt} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section with FAQ */}
      <section id="how-it-works" className="py-12 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">How It Works</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">Get perfect AI outputs in three simple steps</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-xl duration-300">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center mb-3">
                  {/* Magnifying glass icon for Browse & Purchase */}
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                </div>
                <h3 className="text-lg font-bold mb-1">Browse & Purchase</h3>
                <p className="text-gray-400 text-sm">Find the perfect prompt from our extensive library, categorized by use case and AI platform compatibility.</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-xl duration-300">
                <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center mb-3">
                  {/* Pencil/edit icon for Copy & Customize */}
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z" /></svg>
                </div>
                <h3 className="text-lg font-bold mb-1">Copy & Customize</h3>
                <p className="text-gray-400 text-sm">Copy your premium prompt and customize the variable fields to match your specific requirements.</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-xl duration-300">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center mb-3">
                  {/* Trophy icon for Enjoy Perfect Results */}
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 17v4M17 5V3a1 1 0 00-1-1H8a1 1 0 00-1 1v2a5 5 0 0010 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 7a2 2 0 01-2 2h-1a2 2 0 01-2-2V5a2 2 0 012-2h1a2 2 0 012 2v2zM3 7a2 2 0 002 2h1a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v2z" /></svg>
                </div>
                <h3 className="text-lg font-bold mb-1">Enjoy Perfect Results</h3>
                <p className="text-gray-400 text-sm">Paste into your favorite AI platform and get expertly crafted responses that exceed expectations.</p>
              </div>
            </div>
          </div>
          {/* Interactive FAQ */}
          <div className="max-w-2xl mx-auto mt-10">
            <FAQSection />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Flexible Pricing Options</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Choose the plan that works best for your AI prompt needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pay Per Prompt */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 flex flex-col items-center shadow-lg">
              <h3 className="text-xl font-bold mb-2">Pay Per Prompt</h3>
              <p className="text-gray-400 mb-4">Perfect for occasional users</p>
              <div className="text-3xl font-extrabold text-purple-400 mb-2">$3.99 <span className="text-sm font-medium text-gray-400">/ prompt</span></div>
              <ul className="text-gray-300 text-xs mb-6 space-y-2 text-left">
                <li>Individual prompt purchase</li>
                <li>Lifetime access</li>
                <li>Minor updates included</li>
                <li>No subscription required</li>
              </ul>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-colors w-full">Buy Prompt</button>
            </div>
            {/* Monthly Access */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 border-4 border-purple-400 rounded-xl p-8 flex flex-col items-center shadow-2xl relative">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-xs font-bold shadow">Most Popular</span>
              <h3 className="text-xl font-bold mb-2 text-white">Monthly Access</h3>
              <p className="text-gray-200 mb-4">Best value for regular users</p>
              <div className="text-3xl font-extrabold text-white mb-2">$19.99 <span className="text-sm font-medium text-gray-200">/ month</span></div>
              <ul className="text-white text-xs mb-6 space-y-2 text-left">
                <li>Unlimited prompt downloads</li>
                <li>Access to premium prompts</li>
                <li>Regular updates & improvements</li>
                <li>Prompt customization tool</li>
              </ul>
              <button className="bg-white text-purple-700 font-bold px-6 py-2 rounded-lg transition-colors w-full hover:bg-gray-100">Start Monthly</button>
            </div>
            {/* Annual PRO */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 flex flex-col items-center shadow-lg">
              <h3 className="text-xl font-bold mb-2">Annual PRO</h3>
              <p className="text-gray-400 mb-4">For committed power users</p>
              <div className="text-3xl font-extrabold text-purple-400 mb-2">$149.99 <span className="text-sm font-medium text-gray-400">/ year</span></div>
              <ul className="text-gray-300 text-xs mb-6 space-y-2 text-left">
                <li>Everything in Monthly</li>
                <li>Save 38% vs monthly</li>
                <li>Early access to new prompts</li>
                <li>Priority customer support</li>
              </ul>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-colors w-full">Go Annual PRO</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
