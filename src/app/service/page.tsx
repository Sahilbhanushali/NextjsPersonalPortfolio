import Service from "@/components/service";
import Wrapper from "@/layouts/Wrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Service Sahil - Personal Portfolio Next JS",
  description:
    "Explore the services offered by Sahil, a MERN Stack Developer. From web development to consulting, discover how Sahil can help you achieve your digital goals.",
  keywords: [
    "Sahil",
    "MERN Stack Developer",
    "Portfolio",
    "Services",
    "Web Development",
    "Consulting",
    "Next.js",
  ],
};

export default function index() {
  return (
    <Wrapper>
      <Service />
    </Wrapper>
  );
}
