import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink-950 pt-[var(--nav-h)]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-blueprint opacity-40" />
        <div className="absolute -left-[10%] top-[20%] h-[40vmax] w-[40vmax] rounded-full bg-[radial-gradient(circle,rgba(225,29,46,0.16),transparent_66%)] blur-[70px]" />
        <div className="absolute -right-[8%] bottom-0 h-[42vmax] w-[42vmax] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18),transparent_66%)] blur-[80px]" />
      </div>

      <div className="container-x relative">
        <p className="eyebrow text-signal-400">Error 404</p>
        <h1 className="mt-6 max-w-3xl text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-gradient-steel">
          This part isn&apos;t in the catalogue.
        </h1>
        <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-steel-400">
          The page you asked for doesn&apos;t exist — it may have moved, or the link may be out of
          date. Head back to the homepage, or tell us what you were looking for.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/" size="lg">
            Back to home
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Contact us
          </Button>
        </div>

        <nav className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/[0.07] pt-8">
          {[
            { href: "/manufacturing", label: "Manufacturing" },
            { href: "/products", label: "Products" },
            { href: "/quality", label: "Quality" },
            { href: "/development", label: "Development" },
            { href: "/faq", label: "Buyer FAQ" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-steel-500 transition-colors duration-300 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
