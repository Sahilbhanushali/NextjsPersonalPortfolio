"use client";

import React, { useState } from "react";
import Image from "next/image";
import ImagePopup from "@/modals/ImagePopup";

import heroImage from "@/assets/images/projects/Pasted image.tmp.png";
import galleryImage1 from "@/assets/images/projects/Pasted_tmp2_jpg.png";
import galleryImage2 from "@/assets/images/projects/Pasted image (2).png";
import galleryImage3 from "@/assets/images/projects/Pasted image (3).png";
import galleryImage4 from "@/assets/images/projects/Pasted image (4).png";

const projectFacts = [
  { label: "Year", value: "2024" },
  { label: "Client", value: "Bento Studio" },
  { label: "Services", value: "Web Design" },
  { label: "Project", value: "Creative" },
];

const galleryImages = [
  { id: 1, image: heroImage },
  { id: 2, image: galleryImage1 },
  { id: 3, image: galleryImage2 },
  { id: 4, image: galleryImage3 },
  { id: 5, image: galleryImage4 },
];

export default function SingleProjectArea() {
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleImagePopup = (index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const images = galleryImages.map((item) => item.image.src);

  return (
    <>
      <div className="single-project-page-design">
        <div className="single-project-image">
          <Image src={heroImage} alt="Project overview" priority style={{ width: "100%", height: "auto" }} />
        </div>
        <div className="container pt-60 pb-40">
          <div className="row">
            <div className="col-lg-4">
              <div className="single-project-page-left wow fadeInUp delay-0-2s">
                {projectFacts.map((fact) => (
                  <div className="single-info" key={fact.label}>
                    <p>{fact.label}</p>
                    <h3>{fact.value}</h3>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-8">
              <div className="single-project-page-right wow fadeInUp delay-0-4s">
                <h2>Description</h2>
                <p>
                  This case study walks through the design and engineering process we follow for bespoke client projects.
                  We focus on crafting flexible design systems, performant interfaces, and delightful interactions rooted in
                  real business goals.
                </p>
                <p>
                  Beyond the visuals, we document decisions, track KPIs after launch, and continuously iterate. The result is
                  a measurable uplift for the client and a reusable foundation for the next project.
                </p>
              </div>
            </div>
          </div>

          <div className="row pt-60">
            {galleryImages.map((item, index) => (
              <div className="col-lg-6" key={item.id}>
                <div
                  role="button"
                  tabIndex={0}
                  className="work-popup"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleImagePopup(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleImagePopup(index);
                    }
                  }}
                >
                  <div className="single-image wow fadeInUp delay-0-2s">
                    <Image src={item.image} alt={`Gallery image ${index + 1}`} style={{ height: "auto" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isOpen && photoIndex !== null && (
        <ImagePopup
          images={images}
          setIsOpen={setIsOpen}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
        />
      )}
    </>
  );
}

