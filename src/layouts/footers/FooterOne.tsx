"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, Variants } from "framer-motion";

export default function FooterOne() {
  const footerRef = useRef<HTMLElement | null>(null);
  const letsWorkControls = useAnimation();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const linkVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  useEffect(() => {
    letsWorkControls.start("visible");
  }, [letsWorkControls]);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const footer = footerRef.current;
    if (!canvas || !footer) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = footer.offsetWidth;
      canvas.height = footer.offsetHeight;
      canvas.style.position = "absolute";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.pointerEvents = "none";
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const messages = [
      "Email me, ugh", "Ping me, now!", "Text me, bored", "Call? Maybe.",
      "DMs, no spam", "Don't ghost me", "I'm fun, chat!", "Send help!",
      "Slide in inbox", "I might reply",
    ];

    const boxes: any[] = [];
    const colors = ["#FF6B00", "#4ECDC4", "#45B7D5", "#96CEB4", "#FFEEAD"];

    function throttle(func: any, limit: number) {
      let lastFunc: any, lastRan: number;
      return function (...args: any[]) {
        if (!lastRan) {
          func(...args);
          lastRan = Date.now();
        } else {
          clearTimeout(lastFunc);
          lastFunc = setTimeout(() => {
            if (Date.now() - lastRan >= limit) {
              func(...args);
              lastRan = Date.now();
            }
          }, limit - (Date.now() - lastRan));
        }
      };
    }

    const handleMouseMove = throttle((e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        boxes.push({
          x,
          y,
          size: Math.random() * 20 + 20,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          text: messages[Math.floor(Math.random() * messages.length)],
        });
      }
    }, 50);

    const wrapText = (ctx: any, text: string, maxWidth: number): string[] => {
      const words = text.split(" ");
      const lines: string[] = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const test = `${currentLine} ${words[i]}`;
        if (ctx.measureText(test).width < maxWidth) currentLine = test;
        else { lines.push(currentLine); currentLine = words[i]; }
      }
      lines.push(currentLine);
      return lines;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = boxes.length - 1; i >= 0; i--) {
        const b = boxes[i];
        b.alpha -= 0.015;
        b.size *= 0.98;
        b.y -= 1;

        ctx.globalAlpha = b.alpha;
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x - b.size / 2, b.y - b.size / 2, b.size, b.size);

        ctx.font = `bold ${b.size * 0.6}px Helvetica`;
        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.textAlign = "center";

        const lines = wrapText(ctx, b.text, b.size * 0.8);
        const lineHeight = b.size * 0.6;
        const startY = b.y - (lines.length * lineHeight) / 2 + lineHeight / 2;

        lines.forEach((line, idx) => {
          ctx.strokeText(line, b.x, startY + idx * lineHeight);
          ctx.fillText(line, b.x, startY + idx * lineHeight);
        });

        if (b.alpha <= 0) boxes.splice(i, 1);
      }

      requestAnimationFrame(animate);
    };

    footer.addEventListener("mouseenter", animate);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      footer.removeEventListener("mouseenter", animate);
    };
  }, []);

  return (
    <footer className="main-footer" ref={footerRef} style={{ position: "relative" }}>
      <canvas ref={canvasRef} />

      <div className="container">
        <div className="footer-top">
          <p>Don't be Late</p>

          <motion.h2
            initial="hidden"
            animate={letsWorkControls}
            variants={linkVariants}
          >
            <a href="mailto:bhanushalisahil.dev@gmail.com">Hire Me </a>
          </motion.h2>

          {/* Resume Button */}
          <motion.a
            href="/Sahil_bhanushali_2.pdf"
            target="_blank"
            rel="noopener noreferrer"
            initial="hidden"
            animate={letsWorkControls}
            variants={linkVariants}
            className="theme-btn"
            style={{
              display: "inline-block",
              marginTop: "18px",
              borderRadius: "30px",
              padding: "12px 28px",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            View Resume
          </motion.a>
        </div>

        <p className="copy-right-text">
          © Copyright by Sahil Bhanushali {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
