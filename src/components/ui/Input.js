export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900 ${className}`}
      {...props}
    />
  );
}
