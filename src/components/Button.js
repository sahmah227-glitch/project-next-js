export default function Button({ children, loading, fullWidth, variant = 'primary', className = '', ...props }) {
  const base = "inline-flex justify-center items-center gap-2 font-bold rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed text-sm px-6 py-3";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm focus:ring-blue-500",
    secondary: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-200",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-sm focus:ring-red-500",
    ghost: "text-blue-600 hover:bg-blue-50 focus:ring-blue-300",
  };

  return (
    <button
      className={`${base} ${variants[variant] ?? variants.primary} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : null}
      {children}
    </button>
  );
}
