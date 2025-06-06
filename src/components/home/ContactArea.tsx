"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function ContactArea() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionTitleRef = useRef(null);
  const contactDetailsRef = useRef(null);
  const formRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  // Animation controls
  const titleControls = useAnimation();
  const detailsControls = useAnimation();
  const formControls = useAnimation();

  // Detect when elements are in view
  const titleInView = useInView(sectionTitleRef, {
    once: false,
    margin: "-20% 0px",
  });
  const detailsInView = useInView(contactDetailsRef, {
    once: false,
    margin: "-20% 0px",
  });
  const formInView = useInView(formRef, {
    once: false,
    margin: "-20% 0px",
  });

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: i * 0.2,
      },
    }),
  };

  // Trigger animations
  useEffect(() => {
    if (titleInView) titleControls.start("visible");
    else titleControls.start("hidden");
  }, [titleInView, titleControls]);

  useEffect(() => {
    if (detailsInView) detailsControls.start("visible");
    else detailsControls.start("hidden");
  }, [detailsInView, detailsControls]);

  useEffect(() => {
    if (formInView) formControls.start("visible");
    else formControls.start("hidden");
  }, [formInView, formControls]);

  // Fallback to ensure visibility
  useEffect(() => {
    setIsMounted(true);
    const timeout = setTimeout(() => {
      titleControls.start("visible");
      detailsControls.start("visible");
      formControls.start("visible");
    }, 100);
    return () => clearTimeout(timeout);
  }, [titleControls, detailsControls, formControls]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      const phoneNumber = "+917041872737";
      const whatsappMessage = `Name: ${encodeURIComponent(
        name
      )}\nEmail: ${encodeURIComponent(email)}\nSubject: ${encodeURIComponent(
        subject
      )}\nMessage: ${encodeURIComponent(message)}`;
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
      window.open(whatsappUrl, "_blank");

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      toast.success(
        "Message sent to WhatsApp and email! I'll reply faster than you can refresh your inbox.",
        {
          duration: 3000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          className: "custom-toast",
        }
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        "Oops, something broke! Try again, unless you're stress-testing my form.",
        {
          duration: 5000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-area">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <motion.div
              ref={sectionTitleRef}
              className="section-title section-black-title"
              variants={textVariants}
              initial="hidden"
              animate={titleControls}
              custom={0}
            >
              <h2>Contact Me</h2>
            </motion.div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="contact-content-part" ref={contactDetailsRef}>
              {[
                {
                  icon: "ri-headphone-line",
                  title: "Contact Number:",
                  content: (
                    <p>
                      <a href="tel:+917041872737">+91 7041872737</a>
                    </p>
                  ),
                },
                {
                  icon: "ri-mail-line",
                  title: "Email Me:",
                  content: (
                    <p>
                      <a href="mailto:bhanushalisahil.dev@gmail.com">
                        bhanushalisahil.dev@gmail.com
                      </a>
                    </p>
                  ),
                },
                {
                  title: "Socials",
                  content: (
                    <div className="about-social">
                      <ul>
                        <li>
                          <a target="_blank" href="https://wa.me/+917041872737">
                            <i className="ri-whatsapp-fill"></i>
                          </a>
                        </li>
                        <li>
                          <a target="_blank" href="https://twitter.com">
                            <i className="ri-twitter-x-line"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            href="https://www.linkedin.com/in/sahil-bhanushali-1a86ab254/"
                          >
                            <i className="ri-linkedin-fill"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            href="https://github.com/Sahilbhanushali"
                          >
                            <i className="ri-github-line"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  ),
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="single-contact"
                  custom={index}
                  variants={textVariants}
                  initial="hidden"
                  animate={detailsControls}
                >
                  {item.icon && (
                    <span className="circle-btn">
                      <i className={item.icon}></i>
                    </span>
                  )}
                  <h2>{item.title}</h2>
                  {item.content}
                </motion.div>
              ))}
            </div>
          </div>
          <div className="col-lg-8">
            <div className="contact-form contact-form-area" ref={formRef}>
              <form
                id="contactForm"
                className="contact-form"
                onSubmit={handleSubmit}
              >
                <div className="row">
                  {[
                    {
                      id: "name",
                      type: "text",
                      label: "Full Name",
                      placeholder: "Steve Milner",
                      value: name,
                      onChange: (e) => setName(e.target.value),
                      icon: "far fa-user",
                      error: "Please enter your Name",
                    },
                    {
                      id: "email",
                      type: "email",
                      label: "Email Address",
                      placeholder: "hello@websitename.com",
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                      icon: "far fa-envelope",
                      error: "Please enter your Email",
                    },
                    {
                      id: "subject",
                      type: "text",
                      label: "Subject",
                      placeholder: "Your Subject",
                      value: subject,
                      onChange: (e) => setSubject(e.target.value),
                      icon: "far fa-user",
                      error: "Please enter your Subject",
                    },
                  ].map((field, index) => (
                    <div key={field.id} className="col-md-6">
                      <motion.div
                        className="form-group"
                        custom={index}
                        variants={textVariants}
                        initial="hidden"
                        animate={formControls}
                      >
                        <label htmlFor={field.id}>{field.label}</label>
                        <input
                          type={field.type}
                          id={field.id}
                          className="form-control"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder={field.placeholder}
                          required
                          data-error={field.error}
                        />
                        <label htmlFor={field.id} className="for-icon">
                          <i className={field.icon}></i>
                        </label>
                        <div className="help-block with-errors"></div>
                      </motion.div>
                    </div>
                  ))}
                  <div className="col-md-12">
                    <motion.div
                      className="form-group"
                      custom={3}
                      variants={textVariants}
                      initial="hidden"
                      animate={formControls}
                    >
                      <label htmlFor="message">Your Message</label>
                      <textarea
                        name="message"
                        id="message"
                        className="form-control"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write Your message"
                        required
                        data-error="Please Write your Message"
                      ></textarea>
                      <div className="help-block with-errors"></div>
                    </motion.div>
                  </div>
                  <div className="col-md-12">
                    <motion.div
                      className="form-group mb-0"
                      custom={4}
                      variants={textVariants}
                      initial="hidden"
                      animate={formControls}
                    >
                      <button
                        type="submit"
                        className="theme-btn"
                        disabled={isSubmitting}
                        style={{
                          cursor: isSubmitting ? "not-allowed" : "pointer",
                          borderRadius: "30px",
                        }}
                      >
                        {isSubmitting ? "Sending..." : "Send Me Message"}{" "}
                        <i className="ri-mail-line"></i>
                      </button>
                      <div id="msgSubmit" className="hidden"></div>
                    </motion.div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
