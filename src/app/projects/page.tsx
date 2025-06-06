import Projects from "@/components/projects";
import Wrapper from "@/layouts/Wrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Projects Sahil - Personal Portfolio Next JS ",
  description:
    "Explore the projects of Sahil, a MERN Stack Developer. Discover innovative web applications and contributions to open-source projects.",
  keywords: [
    "Sahil",
    "MERN Stack Developer",
    "Portfolio",
    "Projects",
    "Web Development",
    "CRM",
    "E-commerce",
    "Next.js",
  ],
};

export default function index() {
  return (
    <Wrapper>
      <Projects />
    </Wrapper>
  );
}
