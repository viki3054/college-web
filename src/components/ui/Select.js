export default function Select({ className = "", children, ...props }) {
  return (
    <select
      className={`w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
