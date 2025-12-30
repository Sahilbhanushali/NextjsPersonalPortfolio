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
      "Email me!",
      "Let's Talk",
      "Say Hi!",
      "Connect",
      "Chat Now",
      "Reach Out",
      "Get In Touch!",
      "Message Me",
      "Let's Work",
      "Contact!",
    ];

    const boxes: any[] = [];
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#A29BFE", "#FD79A8"];

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
        const text = messages[Math.floor(Math.random() * messages.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];


        ctx.font = "bold 16px Arial";
        const textWidth = ctx.measureText(text).width;
        const padding = 30;
        const boxWidth = textWidth + padding;
        const boxHeight = 45;

        boxes.push({
          x,
          y,
          width: boxWidth,
          height: boxHeight,
          color,
          alpha: 1,
          text,
          rotation: (Math.random() - 0.5) * 0.2,
          scale: 1,
        });
      }
    }, 80);

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = boxes.length - 1; i >= 0; i--) {
        const b = boxes[i];
        b.alpha -= 0.01;
        b.y -= 2;
        b.scale += 0.005;

        if (b.alpha <= 0) {
          boxes.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = b.alpha;
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rotation);
        ctx.scale(b.scale, b.scale);

        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 4;

        const cornerRadius = 12;
        const boxX = -b.width / 2;
        const boxY = -b.height / 2;

        ctx.beginPath();
        ctx.moveTo(boxX + cornerRadius, boxY);
        ctx.lineTo(boxX + b.width - cornerRadius, boxY);
        ctx.arcTo(boxX + b.width, boxY, boxX + b.width, boxY + cornerRadius, cornerRadius);
        ctx.lineTo(boxX + b.width, boxY + b.height - cornerRadius);
        ctx.arcTo(boxX + b.width, boxY + b.height, boxX + b.width - cornerRadius, boxY + b.height, cornerRadius);
        ctx.lineTo(boxX + cornerRadius, boxY + b.height);
        ctx.arcTo(boxX, boxY + b.height, boxX, boxY + b.height - cornerRadius, cornerRadius);
        ctx.lineTo(boxX, boxY + cornerRadius);
        ctx.arcTo(boxX, boxY, boxX + cornerRadius, boxY, cornerRadius);
        ctx.closePath();

        // Gradient fill
        const gradient = ctx.createLinearGradient(boxX, boxY, boxX + b.width, boxY + b.height);
        gradient.addColorStop(0, b.color);
        gradient.addColorStop(1, b.color + "DD");
        ctx.fillStyle = gradient;
        ctx.fill();

        // Reset shadow for text
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Draw text
        ctx.font = "bold 16px Arial";
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
        ctx.lineWidth = 3;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Text with subtle stroke
        ctx.strokeText(b.text, 0, 0);
        ctx.fillText(b.text, 0, 0);

        ctx.restore();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <footer className="main-footer" ref={footerRef} style={{ position: "relative", overflow: "hidden" }}>
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
            href="/Sahil_Bhanushali.pdf"
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