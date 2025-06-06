"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export default function FooterOne() {
  const footerRef = useRef(null);
  const letsWorkRef = useRef(null);
  const canvasRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  // Animation controls
  const letsWorkControls = useAnimation();

  // Detect when "let's work" link is in view
  const letsWorkInView = useInView(letsWorkRef, {
    once: false,
    margin: "-20% 0px",
  });

  // Animation variants
  const linkVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  // Trigger animation on in-view change
  useEffect(() => {
    if (letsWorkInView) letsWorkControls.start("visible");
    else letsWorkControls.start("hidden");
  }, [letsWorkInView, letsWorkControls]);

  // Fallback to ensure visibility on mount
  useEffect(() => {
    setIsMounted(true);
    const timeout = setTimeout(() => {
      letsWorkControls.start("visible");
    }, 100);
    return () => clearTimeout(timeout);
  }, [letsWorkControls]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match footer
    const resizeCanvas = () => {
      const footer = footerRef.current;
      if (footer) {
        canvas.width = footer.offsetWidth;
        canvas.height = footer.offsetHeight;
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.pointerEvents = "none"; // Allow clicks to pass through
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Messages for mouse trail
    const messages = [
      "Email me, ugh",
      "Ping me, now!",
      "Text me, bored",
      "Call? Maybe.",
      "DMs, no spam",
      "Don't ghost me",
      "I'm fun, chat!",
      "Send help!",
      "Slide in inbox",
      "I might reply",
    ];

    // Mouse trail data
    const boxes = [];
    let mouseX = null;
    let mouseY = null;
    let isHovering = false;

    const colors = ["#FF6B00", "#4ECDC4", "#45B7D", "#96CEB4", "#FFEEAD"];

    // Throttle helper
    function throttle(func, limit) {
      let lastFunc;
      let lastRan;
      return function (...args) {
        if (!lastRan) {
          func.apply(this, args);
          lastRan = Date.now();
        } else {
          clearTimeout(lastFunc);
          lastFunc = setTimeout(() => {
            if (Date.now() - lastRan >= limit) {
              func.apply(this, args);
              lastRan = Date.now();
            }
          }, limit - (Date.now() - lastRan));
        }
      };
    }

    // Check for mobile to disable mouse trail
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Handle mouse move — throttled to 50ms
    const handleMouseMove = throttle((e) => {
      if (!footerRef.current || !canvas || isMobile) return;

      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      if (
        mouseX >= 0 &&
        mouseX <= rect.width &&
        mouseY >= 0 &&
        mouseY <= rect.height
      ) {
        isHovering = true;
        boxes.push({
          x: mouseX,
          y: mouseY,
          size: Math.random() * 20 + 20,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          text: messages[Math.floor(Math.random() * messages.length)],
        });
      } else {
        isHovering = false;
      }
    }, 50);

    // Wrap text in box
    const wrapText = (ctx, text, maxWidth) => {
      const words = text.split(" ");
      const lines = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const testLine = currentLine + " " + words[i];
        const metrics = ctx.measureText(testLine);
        if (metrics.width < maxWidth) {
          currentLine = testLine;
        } else {
          lines.push(currentLine);
          currentLine = words[i];
        }
      }
      lines.push(currentLine);
      return lines;
    };

    // Animate boxes and text
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = boxes.length - 1; i >= 0; i--) {
        const box = boxes[i];
        box.alpha -= 0.015;
        box.size *= 0.98;
        box.y -= 1;

        ctx.fillStyle = box.color;
        ctx.globalAlpha = box.alpha;
        ctx.fillRect(
          box.x - box.size / 2,
          box.y - box.size / 2,
          box.size,
          box.size
        );

        ctx.font = `bold ${box.size * 0.7}px Helvetica`;
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const lines = wrapText(ctx, box.text, box.size * 0.8);
        const lineHeight = box.size * 0.7;
        const totalHeight = lines.length * lineHeight;
        const startY = box.y - totalHeight / 2 + lineHeight / 2;

        lines.forEach((line, index) => {
          ctx.strokeText(line, box.x, startY + index * lineHeight);
          ctx.fillText(line, box.x, startY + index * lineHeight);
        });

        if (box.alpha <= 0) {
          boxes.splice(i, 1);
        }
      }
      ctx.globalAlpha = 1;

      if (isHovering || boxes.length > 0) {
        requestAnimationFrame(animate);
      }
    };

    const startAnimation = () => {
      if (!isHovering && boxes.length === 0) {
        requestAnimationFrame(animate);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    footerRef.current?.addEventListener("mouseenter", startAnimation);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      footerRef.current?.removeEventListener("mouseenter", startAnimation);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <footer
      className="main-footer"
      ref={footerRef}
      style={{ position: "relative" }}
    >
      <canvas ref={canvasRef} />
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="footer-top">
              <p>Have a project in mind?</p>
              <motion.h2
                ref={letsWorkRef}
                variants={linkVariants}
                initial="hidden"
                animate={letsWorkControls}
              >
                <a href="mailto:bhanushalisahil.dev@gmail.com">lets work</a>
              </motion.h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-7 col-sm-7">
            <p className="copy-right-text">
              © Copyright by Sahil Bhanushali {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
