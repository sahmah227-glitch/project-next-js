export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-full border-4 border-gray-100" />
          <div className="absolute inset-0 w-14 h-14 rounded-full border-4 border-transparent border-t-gray-600 animate-spin" />
        </div>
        <p className="text-sm text-gray-400 font-medium tracking-wide">Loading...</p>
      </div>
    </div>
  );
}
