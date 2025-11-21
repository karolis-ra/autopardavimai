export default function Separator({ className = "" }) {
  return (
    <div
      className={`w-auto mx-auto  h-[2px] w-24 rounded-full bg-[var(--brand-accent)] ${className}`}
    />
  );
}
