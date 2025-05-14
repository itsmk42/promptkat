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

      {/* Categories Section */}
      <section id="categories" className="py-16 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Categories</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore prompts by category to find exactly what you need
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <Link href="/categories/creative-writing" className="group block bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-all">
              <div className="flex items-center mb-4">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-500/20 text-purple-400 mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </span>
                <span className="font-semibold text-lg">Creative Writing</span>
              </div>
              <p className="text-gray-400">Story starters, poetry, and more for writers and creatives.</p>
            </Link>
            <Link href="/categories/marketing" className="group block bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-pink-500/50 transition-all">
              <div className="flex items-center mb-4">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-500/20 text-pink-400 mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </span>
                <span className="font-semibold text-lg">Marketing</span>
              </div>
              <p className="text-gray-400">Prompts for campaigns, branding, and content creation.</p>
            </Link>
            <Link href="/categories/programming" className="group block bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition-all">
              <div className="flex items-center mb-4">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-500/20 text-orange-400 mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </span>
                <span className="font-semibold text-lg">Programming</span>
              </div>
              <p className="text-gray-400">Debugging, code generation, and developer tools.</p>
            </Link>
            <Link href="/categories/personal-development" className="group block bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-yellow-500/50 transition-all">
              <div className="flex items-center mb-4">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500/20 text-yellow-400 mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span className="font-semibold text-lg">Personal Development</span>
              </div>
              <p className="text-gray-400">Productivity, wellness, and growth prompts.</p>
            </Link>
            <Link href="/categories/business" className="group block bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all">
              <div className="flex items-center mb-4">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400 mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <span className="font-semibold text-lg">Business</span>
              </div>
              <p className="text-gray-400">Strategy, management, and entrepreneurship prompts.</p>
            </Link>
            <Link href="/categories/education" className="group block bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-green-500/50 transition-all">
              <div className="flex items-center mb-4">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500/20 text-green-400 mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </span>
                <span className="font-semibold text-lg">Education</span>
              </div>
              <p className="text-gray-400">Learning aids, tutoring, and academic prompts.</p>
            </Link>
            <Link href="/categories/design" className="group block bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-teal-500/50 transition-all">
              <div className="flex items-center mb-4">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-500/20 text-teal-400 mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                <span className="font-semibold text-lg">Design</span>
              </div>
              <p className="text-gray-400">Visual, UI/UX, and creative design prompts.</p>
            </Link>
            <Link href="/categories/lifestyle" className="group block bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-red-500/50 transition-all">
              <div className="flex items-center mb-4">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500/20 text-red-400 mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </span>
                <span className="font-semibold text-lg">Lifestyle</span>
              </div>
              <p className="text-gray-400">Health, travel, and everyday living prompts.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Prompts Section */}
      <section id="featured" className="py-16 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Prompts</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our most popular and effective prompts curated for exceptional AI performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {samplePrompts.slice(0, 3).map((prompt) => (
              <PromptCard
                key={prompt.id}
                id={prompt.id}
                title={prompt.title}
                description={prompt.description}
                category={prompt.category}
                categoryColor={prompt.categoryColor}
                price={prompt.price}
                rating={prompt.rating}
                reviews={prompt.reviews}
                type={prompt.type}
              />
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Link href="/prompts" className="bg-gradient-to-r from-purple-500 to-pink-600 px-8 py-4 rounded-lg text-lg font-medium hover:opacity-90 transition text-center shadow-lg">
              Explore More
            </Link>
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
