import React from "react";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import Breadcrumb from "../common/Breadcrumb";
import SingleProjectArea from "./SingleProjectArea";

export default function SingleProject() {
  return (
    <>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Breadcrumb title="Project Details" style_3 />
            <SingleProjectArea />
          </main>
          <FooterOne />
        </div>
      </div>
    </>
  );
}

