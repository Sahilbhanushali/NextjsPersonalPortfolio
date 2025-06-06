import Contact from "@/components/contact";
import Wrapper from "@/layouts/Wrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Contact Sahil - MERN Stack Developer",
  keywords: ["Sahil", "MERN Stack Developer", "Portfolio", "Contact"],
  description:
    "Get in touch with Sahil, a MERN Stack Developer. Reach out for collaborations, inquiries, or just to say hello!",
};

export default function index() {
  return (
    <Wrapper>
      <Contact />
    </Wrapper>
  );
}
