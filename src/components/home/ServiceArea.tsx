"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion"; // Import Variants type

export default function ServiceArea() {
  const sectionTitleRef = useRef(null);
  const serviceItemsRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  const titleControls = useAnimation();
  const itemsControls = useAnimation();

  const titleInView = useInView(sectionTitleRef, {
    once: false,
    margin: "-20% 0px",
  });
  const itemsInView = useInView(serviceItemsRef, {
    once: false,
    margin: "-20% 0px",
  });

  // Explicitly type titleVariants as Variants
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut", // Valid Framer Motion easing
      },
    },
  };

  // Explicitly type itemVariants as Variants
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut", // Valid Framer Motion easing
        delay: i * 0.2,
      },
    }),
  };

  useEffect(() => {
    if (titleInView) titleControls.start("visible");
    else titleControls.start("hidden");
  }, [titleInView, titleControls]);

  useEffect(() => {
    if (itemsInView) itemsControls.start("visible");
    else itemsControls.start("hidden");
  }, [itemsInView, itemsControls]);

  useEffect(() => {
    setIsMounted(true);
    const timeout = setTimeout(() => {
      titleControls.start("visible");
      itemsControls.start("visible");
    }, 100);
    return () => clearTimeout(timeout);
  }, [titleControls, itemsControls]);

  const serviceItems = [
    {
      id: 1,
      number: "01",
      title: "Web Development",
      description:
        'Oh, you want a website? I\'ll whip up a shiny digital masterpiece faster than you can say "404 error." Fully responsive, SEO optimized, and guaranteed to make your competitors cry into their outdated HTML.',
    },
    {
      id: 2,
      number: "02",
      title: "App Development",
      description:
        "Need an app? I'll craft one so slick it'll make your users forget how to blink. Cross-platform, bug-free (mostly), and ready to dominate the app stores before you finish your coffee.",
    },
    {
      id: 3,
      number: "03",
      title: "Customized Software",
      description:
        "Generic software? Please. I'll build you a bespoke solution so tailored it fits your business like a glove—except it won't get lost in the laundry. Efficiency, scalability, and a touch of swagger included.",
    },
    {
      id: 4,
      number: "04",
      title: "CRM / Enterprise Solutions",
      description:
        "Big company, bigger problems? I'll deliver enterprise-grade systems so robust they could probably run your company for you. Streamlined workflows, automation, and zero tolerance for corporate nonsense.",
    },
    {
      id: 5,
      number: "05",
      title: "PowerBI Dashboards",
      description:
        "Data boring you? My PowerBI dashboards will turn your numbers into visual eye candy so stunning you'll actually enjoy your Monday reports. Interactive, insightful, and way too pretty for a spreadsheet.",
    },
    {
      id: 6,
      number: "06",
      title: "AI Models",
      description:
        "Want AI that’s smarter than your average intern? I’ll build models that predict, optimize, and maybe even roast your competitors.",
    },
  ];

  return (
    <section id="services" className="services-area">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <motion.div
              ref={sectionTitleRef}
              className="section-title section-black-title"
              variants={titleVariants}
              initial="hidden"
              animate={titleControls}
            >
              <h2>Services</h2>
            </motion.div>
          </div>
        </div>
        <div className="row" ref={serviceItemsRef}>
          {serviceItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="col-lg-4 col-md-6"
              custom={index}
              variants={itemVariants}
              initial="hidden"
              animate={itemsControls}
            >
              <div className="service-item">
                <h5>{item.number}</h5>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
