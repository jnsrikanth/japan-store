const Hero = () => {
  return (
    <section className="relative overflow-hidden kawaii-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Kawaii meets Craft — 日本から直送
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Curated gadgets, toys, snacks, and gifts directly from Japan. Modern design with a traditional soul.
            </p>
            <div className="flex gap-3">
              <a href="#products" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-sakura-600 text-white font-semibold shadow-md hover:bg-sakura-700 transition-colors">
                Shop Now
              </a>
              <a href="#about" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-white text-gray-900 font-semibold shadow hover:shadow-md transition">
                Learn More
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-sakura-200 rounded-full blur-2xl opacity-60 animate-float" />
            <img
              src="https://images.unsplash.com/photo-1608983885392-8e1a25b92203?q=80&w=1200&auto=format&fit=crop"
              alt="Japanese gifts"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

