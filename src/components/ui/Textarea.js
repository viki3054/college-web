export default function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-500 focus:border-zinc-900 ${className}`}
      {...props}
    />
  );
}
