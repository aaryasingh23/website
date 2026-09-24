"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { navItems, type NavItem } from "@/lib/nav";
import { contact } from "@/lib/content";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<number | null>(null);

  /* On the homepage the hero carries its own navigation — the floating dock.
     Two navigations on screen at once is one too many, so this bar stands down
     until the hero has been scrolled past and the dock has gone with it. Every
     other route has no dock, so the bar behaves as it always did. */
  const isHome = pathname === "/";
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setPastHero(window.scrollY > window.innerHeight * 0.82);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function enter(label: string) {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(label);
  }
  function leave() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 140);
  }

  const isActive = (item: NavItem) =>
    item.href
      ? pathname === item.href
      : (item.children ?? []).some((c) => pathname === c.href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled || open
            ? "border-b border-white/[0.07] bg-ink-950/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
          /* aria-hidden as well as invisible: a bar that is only translated
             off-screen still hands a screen reader a second copy of the nav */
          isHome && !pastHero && "pointer-events-none -translate-y-full opacity-0",
        )}
        aria-hidden={isHome && !pastHero}
        onMouseLeave={leave}
      >
        {/* scroll progress hairline */}
        <ScrollProgress />

        <nav className="container-x flex h-[var(--nav-h)] items-center justify-between gap-6">
          <Link href="/" aria-label="AAMPL — home" className="shrink-0">
            <Logo />
          </Link>

          {/* ---------- desktop nav ---------- */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = isActive(item);
              if (item.href) {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onMouseEnter={() => enter("")}
                      className={cn(
                        "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                        active ? "text-white" : "text-steel-400 hover:text-white",
                      )}
                    >
                      {item.label}
                      {active && <ActivePip />}
                    </Link>
                  </li>
                );
              }
              return (
                <li key={item.label} onMouseEnter={() => enter(item.label)}>
                  <button
                    type="button"
                    aria-expanded={open === item.label}
                    onClick={() => setOpen(open === item.label ? null : item.label)}
                    className={cn(
                      "relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                      active || open === item.label ? "text-white" : "text-steel-400 hover:text-white",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-300",
                        open === item.label && "rotate-180",
                      )}
                      strokeWidth={2.2}
                    />
                    {active && <ActivePip />}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${contact.mobile.replace(/[^+\d]/g, "")}`}
              className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-steel-500 transition-colors hover:text-brand-300"
            >
              {contact.mobile}
            </a>
            <Button href="/contact" size="sm" arrow={false}>
              Start a program
            </Button>
          </div>

          {/* ---------- mobile trigger ---------- */}
          <button
            type="button"
            onClick={() => setMobile((m) => !m)}
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-white lg:hidden"
          >
            {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* ---------- mega menu ---------- */}
        <AnimatePresence>
          {open &&
            navItems
              .filter((i) => i.label === open && i.children)
              .map((item) => (
                <motion.div
                  key={item.label}
                  initial={reduce ? false : { opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-x-0 top-full hidden border-b border-white/[0.07] bg-ink-950 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] lg:block"
                  onMouseEnter={() => enter(item.label)}
                >
                  <div className="container-x grid grid-cols-12 gap-10 py-10">
                    <div className="col-span-7 grid gap-2">
                      {item.children!.map((c, i) => (
                        <motion.div
                          key={c.href}
                          initial={reduce ? false : { opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.04 * i, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <Link
                            href={c.href}
                            className="group flex items-start justify-between gap-6 rounded-2xl border border-transparent px-5 py-4 transition-all duration-300 hover:border-brand-300/15 hover:bg-white/[0.03]"
                          >
                            <div>
                              <span className="flex items-center gap-2 text-[0.9375rem] font-medium text-white">
                                {c.label}
                                <ArrowUpRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                              </span>
                              <p className="mt-1.5 text-sm text-steel-500">{c.desc}</p>
                            </div>
                            <span className="mt-1 shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-signal-500/80">
                              {c.meta}
                            </span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {item.feature && (
                      <motion.div
                        initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="col-span-5"
                      >
                        <Link
                          href={item.feature.href}
                          className="group relative block h-full min-h-[13rem] overflow-hidden rounded-2xl border border-white/[0.08]"
                        >
                          <Image
                            src={item.feature.image}
                            alt=""
                            fill
                            sizes="440px"
                            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-transparent" />
                          <div className="absolute inset-x-0 bottom-0 p-5">
                            <span className="eyebrow text-signal-400">{item.feature.eyebrow}</span>
                            <p className="mt-2 text-sm font-medium leading-snug text-white">
                              {item.feature.title}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
        </AnimatePresence>
      </header>

      {/* ---------- mobile drawer ---------- */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-40 bg-ink-950 pt-[var(--nav-h)] lg:hidden"
          >
            <div className="h-full overflow-y-auto overscroll-contain">
              <div className="container-x py-8">
                {navItems.map((item, gi) => (
                  <motion.div
                    key={item.label}
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 + gi * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-white/[0.07] py-6 first:pt-0"
                  >
                    {item.href ? (
                      <Link href={item.href} className="flex items-center justify-between">
                        <span className="text-2xl font-medium tracking-tight text-white">{item.label}</span>
                        <ArrowUpRight className="h-5 w-5 text-steel-500" />
                      </Link>
                    ) : (
                      <>
                        <span className="eyebrow text-steel-600">{item.label}</span>
                        <ul className="mt-4 grid gap-3">
                          {item.children!.map((c) => (
                            <li key={c.href}>
                              <Link href={c.href} className="flex items-baseline justify-between gap-4">
                                <span className="text-xl font-medium tracking-tight text-white">
                                  {c.label}
                                </span>
                                <span className="shrink-0 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-signal-500/80">
                                  {c.meta}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </motion.div>
                ))}

                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-8 flex flex-col gap-4"
                >
                  <Button href="/contact" size="lg" className="w-full">
                    Start a program
                  </Button>
                  <div className="flex flex-col gap-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-steel-500">
                    <a href={`tel:${contact.mobile.replace(/[^+\d]/g, "")}`}>{contact.mobile}</a>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ActivePip() {
  return (
    <motion.span
      layoutId="nav-active"
      className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-signal-500 to-transparent"
      transition={{ type: "spring", stiffness: 380, damping: 34 }}
    />
  );
}

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <span
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-signal-600 via-brand-500 to-brand-300"
      style={{ transform: `scaleX(${p})` }}
    />
  );
}
