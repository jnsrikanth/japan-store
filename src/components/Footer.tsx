export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-sm text-gray-600">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p>© {new Date().getFullYear()} Nippon Finds — 日本の良いもの</p>
          <p className="text-xs">Modern kawaii • Traditional craft • Tokyo vibes</p>
        </div>
      </div>
    </footer>
  );
}

