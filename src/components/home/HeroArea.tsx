"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion"; // Import Variants type
import Link from "next/link";

export default function HeroArea() {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const clientReviewsRef = useRef(null);
  const heroImageRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  // Animation controls
  const headingControls = useAnimation();
  const paragraphControls = useAnimation();
  const imageControls = useAnimation();
  const clientReviewsControls = useAnimation();

  // In-view triggers
  const headingInView = useInView(headingRef, {
    once: false,
    margin: "-10% 0px",
  });
  const paragraphInView = useInView(paragraphRef, {
    once: false,
    margin: "-10% 0px",
  });
  const imageInView = useInView(heroImageRef, {
    once: false,
    margin: "-25% 0px",
  });
  const clientReviewsInView = useInView(clientReviewsRef, {
    once: false,
    margin: "-10% 0px",
  });

  // Text animation variant with explicit typing
  const textVariants: Variants = {
    hidden: { opacity: 0, y: "100%" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut", // Valid Framer Motion easing
        delay: i * 0.1,
      },
    }),
  };

  // Image animation variant with explicit typing
  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }, // Cubic bezier easing
    },
  };

  // Trigger animations
  useEffect(() => {
    headingControls.start(headingInView ? "visible" : "hidden");
  }, [headingInView, headingControls]);

  useEffect(() => {
    paragraphControls.start(paragraphInView ? "visible" : "hidden");
  }, [paragraphInView, paragraphControls]);

  useEffect(() => {
    imageControls.start(imageInView ? "visible" : "hidden");
  }, [imageInView, imageControls]);

  useEffect(() => {
    clientReviewsControls.start(clientReviewsInView ? "visible" : "hidden");
  }, [clientReviewsInView, clientReviewsControls]);

  // Fallback trigger on mount
  useEffect(() => {
    setIsMounted(true);
    const timeout = setTimeout(() => {
      headingControls.start("visible");
      paragraphControls.start("visible");
      imageControls.start("visible");
      clientReviewsControls.start("visible");
    }, 100);
    return () => clearTimeout(timeout);
  }, [
    headingControls,
    paragraphControls,
    imageControls,
    clientReviewsControls,
  ]);

  const headingText = "Sahil Bhanushali".split(" ");
  const paragraphText = [
    "Hi, I'm Sahil Bhanushali 👋",
    "Full Stack Developer",
    "I build scalable web and Enterprise solutions and automate business workflows using modern technologies.",
    "Let's work together to bring your ideas to life.",
  ];
  const clientReviewsText = [
    "Web Development",
    "Workflow Automation",
    "Enterprise Solutions",
  ];

  return (
    <section id="home" className="main-hero-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="hero-content text-center">
              <h2 ref={headingRef} className="split">
                {headingText.map((word, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={textVariants}
                    initial="hidden"
                    animate={headingControls}
                    style={{ display: "inline-block", whiteSpace: "pre" }}
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Left Column */}
          <div className="col-lg-3 pt-30">
            {/* Uncomment if you want to use the client reviews section */}
            {/* <div className="hero-content" ref={clientReviewsRef}>
              {clientReviewsText.map((line, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={textVariants}
                  initial="hidden"
                  animate={clientReviewsControls}
                  style={{ marginBottom: "10px" }}
                >
                  {line}
                </motion.div>
              ))}
            </div> */}
          </div>

          {/* Center Image */}
          <div className="col-lg-6">
            <motion.div
              ref={heroImageRef}
              className="hero-image"
              variants={imageVariants}
              initial="hidden"
              animate={imageControls}
            >
              <img
                src="/assets/images/about/profile-2.jpg"
                alt="personalimage"
              />
            </motion.div>
          </div>

          {/* Right Paragraph + Button */}
          <div className="col-lg-3 pt-30">
            <div className="hero-content">
              {paragraphText.map((line, index) => (
                <motion.p
                  key={index}
                  ref={index === 0 ? paragraphRef : null}
                  custom={index}
                  variants={textVariants}
                  initial="hidden"
                  animate={paragraphControls}
                  style={{ marginBottom: "10px" }}
                >
                  {line}
                </motion.p>
              ))}

              <div>
                <Link
                  href="/contact"
                  className="theme-btn"
                  style={{ borderRadius: "30px" }}
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
