"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Download,
  ExternalLink,
  FileArchive,
  Menu,
  MonitorDown,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Terminal,
  X,
  Zap,
} from "lucide-react";

const navItems = [
  { label: "Recovery", href: "#recovery" },
  { label: "Firmware", href: "#firmware" },
  { label: "ROM", href: "#rom" },
  { label: "Update", href: "#update" },
  { label: "Help", href: "#help" },
];

const requirements = [
  "Unlocked bootloader",
  "Latest Android platform-tools",
  "USB cable and charged phone",
  "ROM zip for sunny/mojito",
  "Recovery zip",
  "Correct firmware package",
];

const downloads = [
  {
    title: "SourceForge",
    desc: "Download ROM and recovery",
    href: "https://sourceforge.net/projects/voltage-os/files/sunny/",
    icon: Download,
  },
  {
    title: "Firmware",
    desc: "Use only firmware recommended.",
    href: "https://drive.google.com/file/d/1y_V2SgRkpRSYnc1IhHqvfu4l5QELqgQ0/view",
    icon: FileArchive,
  },
  {
    title: "Android platform-tools",
    desc: "ADB and fastboot tools from Google.",
    href: "https://developer.android.com/tools/releases/platform-tools",
    icon: Terminal,
  },
];

const stepsRecovery = [
  {
    title: "Download files",
    body: "Download the latest VoltageOS ROM and recovery zip for sunny/mojito.",
  },
  {
    title: "Boot fastboot",
    body: "Power off the phone. Hold Volume Down + Power until bootloader / fastboot mode appears.",
  },
  {
    title: "Flash recovery",
    body: "Open terminal inside your platform-tools folder and run the command below.",
    command: "fastboot update --skip-reboot recovery-*.zip",
  },
];

const stepsRom = [
  {
    title: "Reboot recovery",
    body: "After flashing recovery and firmware, reboot directly to recovery.",
    command: "fastboot reboot recovery",
  },
  {
    title: "Start sideload",
    body: "In VoltageOS recovery, choose Apply update → Apply from ADB.",
  },
  {
    title: "Sideload ROM",
    body: "From your PC, sideload the VoltageOS ROM zip.",
    command: "adb sideload voltage-*.zip",
  },
  {
    title: "Format data",
    body: "After sideload completes, choose Factory reset → Format data/factory reset.",
  },
  {
    title: "Reboot system",
    body: "Reboot and wait. First boot can take several minutes.",
  },
];

const faqs = [
  {
    q: "Device is not detected in fastboot",
    a: "Install proper USB drivers, try another cable, use a USB 2.0 port, and confirm using fastboot devices.",
  },
  {
    q: "ADB sideload stops around 47%",
    a: "This can be normal on many Android recoveries. Check the recovery screen for the real success or failure message.",
  },
  {
    q: "Bootloop after flashing",
    a: "Return to recovery and format data. Also verify that the ROM, recovery, and firmware match sunny/mojito.",
  },
  {
    q: "Can I flash random kernels or recoveries?",
    a: "Avoid unsupported kernels, recoveries, DFE, or mods unless the ROM maintainer confirms compatibility.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

function copyText(text, setCopied) {
  navigator.clipboard.writeText(text).then(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  });
}

function CodeBlock({ label = "Command", code }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-voltage-gold/15 bg-voltage-bg/80">
      <div className="flex items-center justify-between gap-3 border-b border-voltage-gold/10 bg-voltage-gold/[0.06] px-4 py-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-voltage-gold-light">
          <Terminal size={14} />
          {label}
        </div>
        <button
          onClick={() => copyText(code, setCopied)}
          className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
            copied
              ? "bg-voltage-gold text-voltage-bg"
              : "border border-voltage-gold/25 bg-white/5 text-voltage-gold-light hover:bg-voltage-gold/10"
          }`}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="code-scroll overflow-x-auto p-4 font-mono text-sm leading-7 text-voltage-gold-bright/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function SectionTitle({ tag, title, icon: Icon }) {
  return (
    <div className="mb-8">
      <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-voltage-gold">
        {Icon && <Icon size={14} />}
        {tag}
      </p>
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
    </div>
  );
}

function StepCard({ index, title, body, command }) {
  return (
    <motion.div
      {...fadeUp}
      className="group rounded-2xl border border-voltage-gold/10 bg-voltage-surface/40 p-5 transition hover:border-voltage-gold/25 hover:bg-voltage-gold/[0.04]"
    >
      <div className="flex gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-gradient font-display text-base font-extrabold text-voltage-bg shadow-glow-sm">
          {index}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-bold text-white">{title}</h3>
          <p className="mt-1.5 text-voltage-muted leading-relaxed">{body}</p>
          {command && <CodeBlock code={command} />}
        </div>
      </div>
    </motion.div>
  );
}

export default function Page() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <main className="relative">
      <div className="pointer-events-none fixed left-[-6rem] top-20 h-72 w-72 animate-pulse-glow rounded-full bg-voltage-gold/15 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 right-[-6rem] h-80 w-80 animate-pulse-glow rounded-full bg-voltage-amber/10 blur-3xl" />

      <header className="sticky top-0 z-50 border-b border-voltage-gold/10 bg-voltage-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="group flex items-center gap-3">
            <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-gold-gradient font-display text-lg font-extrabold text-voltage-bg shadow-glow-sm">
              <Zap size={18} className="absolute opacity-0 transition group-hover:opacity-100" />
              <span className="transition group-hover:opacity-0">V</span>
            </div>
            <div>
              <p className="font-display font-bold leading-tight text-white">Voltage Guide</p>
              <p className="text-xs text-voltage-muted">sunny / mojito</p>
            </div>
          </a>

          <nav className="hidden items-center gap-0.5 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-voltage-muted transition hover:bg-voltage-gold/10 hover:text-voltage-gold-light"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            className="rounded-xl border border-voltage-gold/15 bg-voltage-surface/50 p-2.5 text-voltage-gold-light md:hidden"
            onClick={() => setOpenMenu(!openMenu)}
            aria-label="Toggle menu"
          >
            {openMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {openMenu && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mb-4 rounded-2xl border border-voltage-gold/10 bg-voltage-panel p-2 md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpenMenu(false)}
                className="block rounded-xl px-4 py-3 font-medium text-voltage-muted hover:bg-voltage-gold/10 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </header>

      <section
        id="top"
        className="mx-auto grid max-w-6xl gap-6 px-5 pb-8 pt-14 md:grid-cols-[1.4fr_0.7fr] md:pt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-gold relative overflow-hidden rounded-3xl p-7 md:p-10"
        >
          <div className="pointer-events-none absolute inset-0 bg-gold-shine" />

          <div className="relative">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-voltage-gold/20 bg-voltage-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-voltage-gold-light">
              <Zap size={13} className="text-voltage-gold" />
              Redmi Note 10
            </div>

            <h1 className="font-display max-w-3xl text-4xl font-extrabold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
              VoltageOS{" "}
              <span className="text-gradient">Flashing</span> Guide
            </h1>

            <p className="mt-5 max-w-xl text-base text-voltage-muted md:text-lg">
              Everything you need to install VoltageOS on sunny/mojito — recovery,
              firmware, ROM, and updates in one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://www.voltageos.com/devices/download/sunny"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Official Website <ExternalLink size={16} />
              </a>
              <a href="#recovery" className="btn-ghost">
                Start Guide <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass rounded-3xl p-6"
        >
          <div className="mb-4 inline-flex rounded-full bg-gold-gradient px-3 py-1 text-xs font-bold text-voltage-bg">
            Android 16
          </div>
          <h2 className="font-display text-xl font-bold text-white">Device Info</h2>
          <dl className="mt-5 space-y-0">
            {[
              ["Device", "Redmi Note 10"],
              ["Codename", "sunny / mojito"],
              ["ROM", "VoltageOS"],
              ["Install", "Recovery + ADB sideload"],
            ].map(([k, v], i) => (
              <div
                key={k}
                className={`flex items-center justify-between gap-3 py-3.5 ${
                  i < 3 ? "border-b border-voltage-gold/10" : ""
                }`}
              >
                <dt className="text-sm text-voltage-muted">{k}</dt>
                <dd className="text-right text-sm font-semibold text-white">{v}</dd>
              </div>
            ))}
          </dl>
        </motion.aside>
      </section>

      <section className="mx-auto max-w-6xl px-5">
        <motion.div
          {...fadeUp}
          className="rounded-2xl border border-voltage-ember/25 bg-voltage-ember/10 p-5"
        >
          <div className="flex gap-4">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-voltage-ember/20">
              <AlertTriangle className="text-voltage-amber" size={20} />
            </div>
            <div>
              <h2 className="font-display font-bold text-white">Read before flashing</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-voltage-muted md:text-base">
                Unlocking and flashing can wipe your data. Back up everything first. Use only
                files made for your exact device. You are responsible for your device.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 md:grid-cols-2">
        <motion.div {...fadeUp} className="glass rounded-3xl p-6 md:p-7">
          <SectionTitle tag="Checklist" title="Requirements" icon={ShieldCheck} />
          <ul className="grid gap-2.5">
            {requirements.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-xl bg-voltage-surface/50 px-4 py-3"
              >
                <CheckCircle2 className="shrink-0 text-voltage-gold" size={18} />
                <span className="text-sm font-medium text-white/90">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div {...fadeUp} className="glass rounded-3xl p-6 md:p-7">
          <SectionTitle tag="Files" title="Downloads" icon={MonitorDown} />
          <ul className="grid gap-2.5">
            {downloads.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-4 rounded-xl border border-transparent bg-voltage-surface/50 p-4 transition hover:border-voltage-gold/20 hover:bg-voltage-gold/[0.06]"
                  >
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-voltage-gold/10">
                      <Icon className="text-voltage-gold" size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-voltage-gold-light">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-voltage-muted">{item.desc}</p>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </section>

      <section id="recovery" className="mx-auto max-w-6xl px-5 py-4">
        <motion.div {...fadeUp} className="glass rounded-3xl p-6 md:p-8">
          <SectionTitle tag="Step 1" title="Flashing Recovery" icon={Smartphone} />
          <div className="grid gap-3">
            {stepsRecovery.map((step, idx) => (
              <StepCard key={step.title} index={idx + 1} {...step} />
            ))}
          </div>
        </motion.div>
      </section>

      <section id="firmware" className="mx-auto max-w-6xl px-5 py-4">
        <motion.div {...fadeUp} className="glass rounded-3xl p-6 md:p-8">
          <SectionTitle
            tag="Step 2"
            title="Flashing Firmware"
            icon={Cpu}
          />
          <p className="-mt-4 mb-6 text-sm text-voltage-muted">
            Skip this step if firmware is already installed.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-voltage-gold/10 bg-voltage-surface/40 p-5">
              <h3 className="font-display font-bold text-white">Fastboot method</h3>
              <p className="mt-1 text-sm text-voltage-muted">
                Use when your firmware zip is fastboot flashable.
              </p>
              <CodeBlock label="Fastboot" code="fastboot update --skip-reboot sunny-fw.zip" />
            </div>
            <div className="rounded-2xl border border-voltage-gold/10 bg-voltage-surface/40 p-5">
              <h3 className="font-display font-bold text-white">Recovery method</h3>
              <p className="mt-1 text-sm text-voltage-muted">
                Use when the firmware package is meant for recovery sideload.
              </p>
              <CodeBlock
                label="ADB"
                code={"fastboot reboot recovery\nadb sideload firmware.zip"}
              />
            </div>
          </div>
          <p className="mt-5 rounded-xl border border-voltage-gold/15 bg-voltage-gold/[0.06] p-4 text-sm leading-relaxed text-voltage-muted">
            Use the firmware recommended by the maintainer. Wrong firmware can cause boot,
            modem, recovery, or network issues.
          </p>
        </motion.div>
      </section>

      <section id="rom" className="mx-auto max-w-6xl px-5 py-4">
        <motion.div {...fadeUp} className="glass rounded-3xl p-6 md:p-8">
          <SectionTitle tag="Step 3" title="Flashing ROM" icon={Zap} />
          <div className="grid gap-3">
            {stepsRom.map((step, idx) => (
              <StepCard key={step.title} index={idx + 1} {...step} />
            ))}
          </div>
        </motion.div>
      </section>

      <section id="update" className="mx-auto max-w-6xl px-5 py-4">
        <motion.div {...fadeUp} className="glass rounded-3xl p-6 md:p-8">
          <SectionTitle tag="Maintenance" title="Updating VoltageOS" icon={RefreshCw} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-voltage-gold/10 bg-voltage-surface/40 p-5">
              <h3 className="font-display font-bold text-white">OTA update</h3>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-voltage-muted">
                <li>Open Settings.</li>
                <li>Go to About Phone.</li>
                <li>Check for updates and download.</li>
                <li>Reboot when asked.</li>
              </ol>
            </div>
            <div className="rounded-2xl border border-voltage-gold/10 bg-voltage-surface/40 p-5">
              <h3 className="font-display font-bold text-white">Manual dirty flash</h3>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-voltage-muted">
                <li>Boot to VoltageOS recovery.</li>
                <li>Choose Apply update from ADB.</li>
                <li>Run adb sideload with the new VoltageOS zip.</li>
                <li>Reboot system.</li>
              </ol>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="help" className="mx-auto max-w-6xl px-5 py-4 pb-16">
        <motion.div {...fadeUp} className="glass rounded-3xl p-6 md:p-8">
          <SectionTitle tag="Support" title="Troubleshooting" icon={AlertTriangle} />
          <div className="grid gap-2.5">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="rounded-xl border border-voltage-gold/10 bg-voltage-surface/40 p-4 transition open:border-voltage-gold/25 open:bg-voltage-gold/[0.04]"
              >
                <summary className="cursor-pointer pr-8 font-semibold text-white">
                  {faq.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-voltage-muted">{faq.a}</p>
              </details>
            ))}
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-voltage-gold/10 py-8 text-center">
        <p className="font-display text-sm font-semibold tracking-widest text-voltage-muted">
          ZNAIV
        </p>
      </footer>
    </main>
  );
}
