"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function Pricing() {
  const router = useRouter();
  const { status } = useSession();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  const handleSubscribe = (plan: 'monthly' | 'yearly') => {
    if (status === 'authenticated') {
      router.push(`/payment?plan=${plan}`);
    } else {
      router.push(`/login?callbackUrl=/payment?plan=${plan}`);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Choose Your Plan</h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Get unlimited access to premium AI prompts with our subscription plans.
              Pay with cryptocurrency for secure and private transactions.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="bg-gray-800/60 inline-flex rounded-lg p-1">
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  selectedPlan === 'monthly'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedPlan('yearly')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  selectedPlan === 'yearly'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Yearly <span className="text-xs text-purple-400">Save 16%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Individual Prompts */}
            <div className="bg-gray-800/60 rounded-xl p-8 border border-gray-700 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Individual Prompts</h2>
              <p className="text-gray-300 mb-6">
                Purchase individual prompts without a subscription. Pay only for what you need.
              </p>
              <div className="text-3xl font-extrabold text-purple-400 mb-2">
                $3.99 <span className="text-sm font-medium text-gray-400">/ prompt</span>
              </div>
              <ul className="text-gray-300 text-sm mb-6 space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-purple-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Individual prompt purchase
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-purple-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Lifetime access
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-purple-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Minor updates included
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-purple-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  No subscription required
                </li>
              </ul>
              <Link
                href="/"
                className="block w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium text-center transition-colors"
              >
                Browse Prompts
              </Link>
            </div>

            {/* Subscription Plan */}
            <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl p-8 border-4 border-purple-500 shadow-2xl relative">
              <div className="absolute top-0 right-0 bg-purple-500 text-white px-4 py-1 rounded-bl-lg font-medium text-sm">
                MOST POPULAR
              </div>
              <h2 className="text-2xl font-bold mb-4">Unlimited Access</h2>
              <p className="text-gray-200 mb-6">
                Get unlimited access to all premium prompts with our subscription plan.
              </p>
              <div className="text-3xl font-extrabold text-white mb-2">
                {selectedPlan === 'monthly' ? (
                  <>$9.99 <span className="text-sm font-medium text-gray-300">/ month</span></>
                ) : (
                  <>$99.99 <span className="text-sm font-medium text-gray-300">/ year</span></>
                )}
              </div>
              <ul className="text-gray-200 text-sm mb-6 space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-purple-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Unlimited access to all prompts
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-purple-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Access to new prompts as they're added
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-purple-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Priority support
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-purple-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Cancel anytime
                </li>
                {selectedPlan === 'yearly' && (
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-purple-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <strong>Save 16% compared to monthly</strong>
                  </li>
                )}
              </ul>
              <button
                onClick={() => handleSubscribe(selectedPlan)}
                className="block w-full py-3 bg-white text-purple-900 hover:bg-gray-100 rounded-lg font-medium text-center transition-colors"
              >
                Subscribe Now
              </button>
            </div>
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-800/60 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-medium mb-2">How does the subscription work?</h3>
                <p className="text-gray-300">
                  Our subscription gives you unlimited access to all premium prompts for the duration of your subscription.
                  You can cancel anytime, and your subscription will remain active until the end of the billing period.
                </p>
              </div>
              <div className="bg-gray-800/60 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-300">
                  We accept various cryptocurrencies including Bitcoin, Ethereum, and many others through our secure
                  payment processor, NOWPayments. This ensures your transactions are secure and private.
                </p>
              </div>
              <div className="bg-gray-800/60 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-medium mb-2">Can I cancel my subscription?</h3>
                <p className="text-gray-300">
                  Yes, you can cancel your subscription at any time from your dashboard. Your subscription will remain
                  active until the end of the current billing period, and you won't be charged again.
                </p>
              </div>
              <div className="bg-gray-800/60 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-medium mb-2">What happens to my purchased prompts if I cancel?</h3>
                <p className="text-gray-300">
                  Individual prompts you've purchased will remain accessible even if you cancel your subscription.
                  Subscription-only prompts will no longer be accessible after your subscription ends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}