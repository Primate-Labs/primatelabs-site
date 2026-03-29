"use client";

import { useEffect, useState, useRef } from "react";

const sessions = [
  {
    prompt: "inference-mesh --route auto",
    lines: [
      "→ scanning 12 providers",
      "✓ anthropic   340ms   online",
      "✓ openai      521ms   online",
      "✓ groq         89ms   online",
      "routing to groq  (lowest latency)",
    ],
  },
  {
    prompt: "cortex run pipeline.yaml",
    lines: [
      "→ building prompt graph",
      "✓ 4 nodes resolved",
      "✓ golden dataset  120 cases",
      "pass rate  94.2%",
    ],
  },
  {
    prompt: "logprobe tail --filter ERROR",
    lines: [
      "→ streaming  /prod/api",
      "[14:22:01] ERROR  timeout 5000ms",
      "[14:22:04] ERROR  upstream 503",
      "2 events matched",
    ],
  },
  {
    prompt: "printbed generate --part mount",
    lines: [
      "→ resolving parametric tree",
      "✓ board-mount  v2.1  ready",
      "✓ no supports required",
      "exported  mount_m3_25mm.stl",
    ],
  },
];

const CHAR_DELAY = 28;
const LINE_DELAY = 380;
const SESSION_PAUSE = 2200;
const CLEAR_DELAY = 900;

export default function HeroTerminal() {
  const [sessionIdx, setSessionIdx] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [lines, setLines] = useState<string[]>([]);
  const [fading, setFading] = useState(false);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  };

  const schedule = (fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timeouts.current.push(id);
  };

  useEffect(() => {
    const session = sessions[sessionIdx];
    let t = 0;

    // Type prompt character by character
    for (let i = 0; i <= session.prompt.length; i++) {
      const chars = session.prompt.slice(0, i);
      schedule(() => setPrompt(chars), t);
      t += CHAR_DELAY;
    }

    // Add output lines one by one
    for (let i = 0; i < session.lines.length; i++) {
      const capturedLines = session.lines.slice(0, i + 1);
      schedule(() => setLines(capturedLines), t);
      t += LINE_DELAY;
    }

    // Pause then fade out
    schedule(() => setFading(true), t + SESSION_PAUSE);

    // Clear and move to next session
    schedule(() => {
      setFading(false);
      setPrompt("");
      setLines([]);
      setSessionIdx((prev) => (prev + 1) % sessions.length);
    }, t + SESSION_PAUSE + CLEAR_DELAY);

    return clear;
  }, [sessionIdx]);

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      aria-hidden="true"
    >
      <div
        className="w-full max-w-sm font-mono text-xs leading-relaxed"
        style={{
          opacity: fading ? 0 : 1,
          transition: `opacity ${CLEAR_DELAY}ms ease`,
        }}
      >
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]" />
          <span className="ml-2 text-[#3a3a3a] text-[10px] tracking-wide">
            ~/primate-labs
          </span>
        </div>

        {/* Terminal body */}
        <div className="border border-[#1a1a1a] bg-[#0d0d0d] p-4 space-y-1.5">
          {/* Prompt line */}
          <div className="flex items-center gap-2">
            <span className="text-[#f97316] select-none">$</span>
            <span className="text-[#d4d4d4]">{prompt}</span>
            <span
              className="inline-block w-[7px] h-[13px] bg-[#f97316]"
              style={{ animation: "blink 1s step-end infinite" }}
            />
          </div>

          {/* Output lines */}
          {lines.map((line, i) => (
            <div
              key={i}
              className={
                line.startsWith("✓")
                  ? "text-[#34d399]"
                  : line.startsWith("→")
                  ? "text-[#525252]"
                  : line.includes("ERROR")
                  ? "text-[#f97316]"
                  : "text-[#737373]"
              }
            >
              {line}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
