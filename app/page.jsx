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
  Github,
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

function copyText(text, setCopied) {
  navigator.clipboard.writeText(text).then(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  });
}

function CodeBlock({ label = "Command", code }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-cyan-200/15 bg-[#030712]/90">
      <div className="flex items-center justify-between gap-3 border-b border-cyan-200/10 bg-cyan-300/[0.06] px-4 py-3">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
          <Terminal size={15} />
          {label}
        </div>
        <button
          onClick={() => copyText(code, setCopied)}
          className={`rounded-full px-3 py-1.5 text-xs font-black transition ${
            copied
              ? "bg-cyan-200 text-slate-950"
              : "border border-cyan-200/20 bg-white/5 text-white hover:bg-cyan-200/10"
          }`}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="code-scroll overflow-x-auto p-4 text-sm leading-7 text-cyan-50">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function SectionTitle({ tag, title, icon: Icon }) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        <p className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.26em] text-cyan-300">
          {Icon && <Icon size={15} />}
          {tag}
        </p>
        <h2 className="text-3xl font-black tracking-[-0.05em] text-white md:text-5xl">
          {title}
        </h2>
      </div>
    </div>
  );
}

function StepCard({ index, title, body, command }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
      className="rounded-3xl border border-cyan-200/10 bg-white/[0.045] p-4 md:p-5"
    >
      <div className="flex gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cyan-200 via-cyan-300 to-blue-500 text-lg font-black text-slate-950 shadow-glow">
          {index}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-black text-white">{title}</h3>
          <p className="mt-1 text-slate-300">{body}</p>
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
      <div className="pointer-events-none fixed left-[-8rem] top-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none fixed bottom-10 right-[-8rem] h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />

      <header className="sticky top-0 z-50 border-b border-cyan-200/10 bg-[#050712]/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <a href="#top" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-200 via-blue-500 to-violet-500 text-xl font-black text-slate-950 shadow-glow">
              V
            </div>
            <div>
              <p className="font-black leading-5 text-white">Voltage Guide</p>
              <p className="text-xs font-semibold text-slate-400">sunny / mojito</p>
            </div>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-cyan-300/10 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            className="rounded-2xl border border-cyan-200/15 bg-white/5 p-2 md:hidden"
            onClick={() => setOpenMenu(!openMenu)}
            aria-label="Toggle menu"
          >
            {openMenu ? <X /> : <Menu />}
          </button>
        </div>

        {openMenu && (
          <div className="mx-4 mb-4 rounded-3xl border border-cyan-200/10 bg-[#080c18] p-3 md:hidden">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpenMenu(false)}
                className="block rounded-2xl px-4 py-3 font-bold text-slate-300 hover:bg-cyan-300/10 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <section id="top" className="mx-auto grid max-w-7xl gap-5 px-4 pb-6 pt-16 md:grid-cols-[1.5fr_.8fr] md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="glass overflow-hidden rounded-[2rem] p-6 md:p-10"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200/15 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
            <Zap size={15} />
            Redmi Note 10
          </div>

          <h1 className="max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.08em] md:text-8xl">
            VoltageOS <span className="text-gradient">Flashing</span> Guide
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Read instruction carefully.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://www.voltageos.com/devices/download/sunny"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-200 px-5 py-3 font-black text-slate-950 transition hover:bg-white"
            >
              Official VoltageOS Website <ExternalLink size={17} />
            </a>
            <a
              href="#recovery"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-200/15 bg-white/5 px-5 py-3 font-black text-white transition hover:bg-cyan-300/10"
            >
              Start Guide <ArrowRight size={17} />
            </a>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="glass rounded-[2rem] p-6"
        >
          <div className="mb-5 inline-flex rounded-full bg-cyan-200 px-3 py-1 text-xs font-black text-slate-950">
            Android 16
          </div>
          <h2 className="text-2xl font-black text-white">Device Card</h2>
          <div className="mt-5 space-y-4">
            {[
              ["Device", "Redmi Note 10"],
              ["Codename", "sunny / mojito"],
              ["ROM", "VoltageOS"],
              ["Install", "Recovery + ADB sideload"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                <span className="text-sm font-bold text-slate-400">{k}</span>
                <span className="text-right font-black text-white">{v}</span>
              </div>
            ))}
          </div>
        </motion.aside>
      </section>

      <section className="mx-auto max-w-7xl px-4">
        <div className="glass rounded-[2rem] border-pink-300/20 bg-pink-500/[0.06] p-5">
          <div className="flex gap-4">
            <AlertTriangle className="mt-1 shrink-0 text-pink-300" />
            <div>
              <h2 className="text-xl font-black text-white">Read before flashing</h2>
              <p className="mt-1 text-slate-300">
                Unlocking and flashing can wipe your data. Back up everything first. Use only files
                made for your exact device. You are responsible for your device.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-5 md:grid-cols-2">
        <div className="glass rounded-[2rem] p-6">
          <SectionTitle tag="Checklist" title="Requirements" icon={ShieldCheck} />
          <div className="grid gap-3">
            {requirements.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/[0.045] p-3">
                <CheckCircle2 className="shrink-0 text-cyan-300" size={19} />
                <span className="font-semibold text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-[2rem] p-6">
          <SectionTitle tag="Files" title="Downloads" icon={MonitorDown} />
          <div className="grid gap-3">
            {downloads.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  className="group flex gap-4 rounded-2xl border border-cyan-200/10 bg-white/[0.045] p-4 transition hover:border-cyan-200/30 hover:bg-cyan-300/[0.08]"
                >
                  <Icon className="shrink-0 text-cyan-300" />
                  <div>
                    <h3 className="font-black text-white group-hover:text-cyan-100">{item.title}</h3>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section id="recovery" className="mx-auto max-w-7xl px-4 py-5">
        <div className="glass rounded-[2rem] p-5 md:p-8">
          <SectionTitle tag="Step 1" title="Flashing Recovery" icon={Smartphone} />
          <div className="grid gap-4">
            {stepsRecovery.map((step, idx) => (
              <StepCard key={step.title} index={idx + 1} {...step} />
            ))}
          </div>
        </div>
      </section>

      <section id="firmware" className="mx-auto max-w-7xl px-4 py-5">
        <div className="glass rounded-[2rem] p-5 md:p-8">
          <SectionTitle tag="Step 2" title="Flashing Firmware (Skip if already installed)" icon={Cpu} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-cyan-200/10 bg-white/[0.045] p-5">
              <h3 className="text-xl font-black text-white">Fastboot method</h3>
              <p className="mt-1 text-slate-300">Use this when your firmware zip is fastboot flashable.</p>
              <CodeBlock label="Fastboot" code={"fastboot update --skip-reboot sunny-fw.zip"} />
            </div>
            <div className="rounded-3xl border border-cyan-200/10 bg-white/[0.045] p-5">
              <h3 className="text-xl font-black text-white">Recovery method</h3>
              <p className="mt-1 text-slate-300">Use this when the firmware package is meant for recovery sideload.</p>
              <CodeBlock label="ADB" code={"fastboot reboot recovery\nadb sideload firmware.zip"} />
            </div>
          </div>
          <p className="mt-5 rounded-2xl border border-cyan-200/15 bg-cyan-300/[0.06] p-4 font-semibold text-slate-300">
            Use the firmware recommended by the maintainer. Wrong firmware can cause boot, modem,
            recovery, or network issues.
          </p>
        </div>
      </section>

      <section id="rom" className="mx-auto max-w-7xl px-4 py-5">
        <div className="glass rounded-[2rem] p-5 md:p-8">
          <SectionTitle tag="Step 3" title="Flashing ROM" icon={Zap} />
          <div className="grid gap-4">
            {stepsRom.map((step, idx) => (
              <StepCard key={step.title} index={idx + 1} {...step} />
            ))}
          </div>
        </div>
      </section>

      <section id="update" className="mx-auto max-w-7xl px-4 py-5">
        <div className="glass rounded-[2rem] p-5 md:p-8">
          <SectionTitle tag="Maintenance" title="Updating VoltageOS" icon={RefreshCw} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-cyan-200/10 bg-white/[0.045] p-5">
              <h3 className="text-xl font-black text-white">OTA update</h3>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-300">
                <li>Open Settings.</li>
                <li>Go to About Phone.</li>
                <li>Check for updates and download.</li>
                <li>Reboot when asked.</li>
              </ol>
            </div>
            <div className="rounded-3xl border border-cyan-200/10 bg-white/[0.045] p-5">
              <h3 className="text-xl font-black text-white">Manual dirty flash</h3>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-300">
                <li>Boot to VoltageOS recovery.</li>
                <li>Choose Apply update from ADB.</li>
                <li>Run adb sideload with the new VoltageOS zip.</li>
                <li>Reboot system.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section id="help" className="mx-auto max-w-7xl px-4 py-5">
        <div className="glass rounded-[2rem] p-5 md:p-8">
          <SectionTitle tag="Support" title="Troubleshooting" icon={AlertTriangle} />
          <div className="grid gap-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="rounded-2xl border border-cyan-200/10 bg-white/[0.045] p-4">
                <summary className="cursor-pointer font-black text-white">{faq.q}</summary>
                <p className="mt-3 text-slate-300">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-4 py-10 text-center text-sm font-semibold text-slate-500">
        - ZNAIV -
      </footer>
    </main>
  );
}
