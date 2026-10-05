import Link from "next/link";

export default function Logo({ className = "" }) {
  return (
    <Link href="/" className={`brand-logo ${className}`} aria-label="Cinematic Flow home">
      <img src="/cinematic-flow-logo-light.png" alt="Cinematic Flow" className="brand-logo-light" />
      <img src="/cinematic-flow-logo-dark.png" alt="" aria-hidden="true" className="brand-logo-dark" />
    </Link>
  );
}
