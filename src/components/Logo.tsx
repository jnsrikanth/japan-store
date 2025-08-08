import Image from 'next/image';

const Logo = ({ size = 64 }: { size?: number }) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className="rounded-full bg-sakura-200 flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <span className="text-sakura-700 text-2xl">🌸</span>
      </div>
      <div>
        <p className="text-xl font-extrabold tracking-wide">Nippon Finds</p>
        <p className="text-xs text-gray-500 -mt-1">Curated from Japan</p>
      </div>
    </div>
  );
};

export default Logo;

