import About from "@/components/about";
import Wrapper from "@/layouts/Wrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sahil Bhanushali - MERN Stack Developer Portfolio",
  description:
    "I'm Sahil Bhanushali, a passionate MERN Stack Developer with expertise in JavaScript, React, Node.js, and PHP. My portfolio showcases my projects in web development, CRM customizations, and innovative solutions. I specialize in building responsive, user-friendly applications with modern technologies.",
};

export default function index() {
  return (
    <Wrapper>
      <About />
    </Wrapper>
  );
}
