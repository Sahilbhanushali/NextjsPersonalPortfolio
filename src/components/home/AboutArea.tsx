"use client";
import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion"; // Import Variants type
import Count from "../common/Count";

const counter_data = [
  { id: 1, title: "Years Of Experience", count: 1.5, cls: "plus" },
  { id: 2, title: "Completed Projects", count: 20, cls: "plus" },
  { id: 3, title: "Client Satisfactions", count: 100, cls: "percent" },
];

export default function AboutArea() {
  const preTitleRef = useRef(null);
  const contentRef = useRef(null);
  const countersRef = useRef(null);

  const preTitleControls = useAnimation();
  const contentControls = useAnimation();
  const countersControls = useAnimation();

  const preTitleInView = useInView(preTitleRef, { margin: "-20% 0px" });
  const contentInView = useInView(contentRef, { margin: "-20% 0px" });
  const countersInView = useInView(countersRef, { margin: "-20% 0px" });

  const paragraphText = [
    "I'm a full stack developer from Gujarat with hands on experience in CRM and its automation and a growing proficiency in the MERN stack and Next.js (MongoDB, Express, React, Node.js).",
    "I thrive in solving real world problems and building custom web solutions as well as Enterprise Solutions.",
    "I recently completed my Bachelor's in Computer Science (March 2025) and have worked on impactful CRM and automation projects during my roles at Niket Communications and ItsmeDezino.",
    "I'm highly adaptable, love collaborating with teams, and constantly seek out new technologies to improve user and business outcomes.",
  ];

  // Explicitly type the variants as Variants from Framer Motion
  const textVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: i * 0.1 },
    }),
  };

  const counterVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut", delay: i * 0.2 },
    }),
  };

  // Handle in-view animations
  useEffect(() => {
    preTitleControls.start(preTitleInView ? "visible" : "hidden");
  }, [preTitleInView, preTitleControls]);

  useEffect(() => {
    contentControls.start(contentInView ? "visible" : "hidden");
  }, [contentInView, contentControls]);

  useEffect(() => {
    countersControls.start(countersInView ? "visible" : "hidden");
  }, [countersInView, countersControls]);

  // Fallback trigger after mount to ensure animations happen on navigation
  useEffect(() => {
    const timer = setTimeout(() => {
      preTitleControls.start("visible");
      contentControls.start("visible");
      countersControls.start("visible");
    }, 300);
    return () => clearTimeout(timer);
  }, [preTitleControls, contentControls, countersControls]);

  return (
    <section id="about" className="about-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-sm-3">
            <motion.h2
              ref={preTitleRef}
              className="about-pre-title"
              custom={0}
              initial="hidden"
              animate={preTitleControls}
              variants={textVariants}
            >
              About Me
            </motion.h2>
          </div>
          <div className="col-lg-9 col-sm-9">
            <div className="about-content-part" ref={contentRef}>
              <p>
                {paragraphText.map((line, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={textVariants}
                    initial="hidden"
                    animate={contentControls}
                    style={{ display: "block", marginBottom: "5px" }}
                  >
                    {line}
                  </motion.span>
                ))}
              </p>
            </div>

            <div
              className="hero-counter-area d-flex justify-content-between"
              ref={countersRef}
            >
              {counter_data.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="counter-item counter-text-wrap"
                  custom={index}
                  initial="hidden"
                  animate={countersControls}
                  variants={counterVariants}
                >
                  <span className={`count-text ${item.cls}`}>
                    <Count number={item.count} />
                  </span>
                  <span className="counter-title">{item.title}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
