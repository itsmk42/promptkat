import Layout from '@/components/Layout';

export default function Featured() {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Featured Prompts</h1>
        <p className="text-lg text-gray-300 mb-8 max-w-xl text-center">Discover our handpicked selection of top-performing AI prompts, curated for maximum impact and creativity.</p>
        <div className="w-full max-w-2xl bg-gray-800/60 rounded-xl p-8 border border-gray-700 shadow-lg">
          <p className="text-center text-gray-400">(Featured prompts will be displayed here soon.)</p>
        </div>
      </div>
    </Layout>
  );
}