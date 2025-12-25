"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { KeyboardEvent, useState } from "react";
import ImagePopup from "@/modals/ImagePopup";

import Pasted_tmp_jpg from "@/assets/images/projects/Pasted image.tmp.png";
import Pasted_tmp2_jpg from "@/assets/images/projects/Pasted_tmp2_jpg.png";
import Pasted_image_4 from "@/assets/images/projects/Pasted image (4).png";
import Pasted_image_3 from "@/assets/images/projects/Pasted image (3).png";
import Pasted_image_2 from "@/assets/images/projects/Pasted image (2).png";
import gg1 from "@/assets/images/projects/gg1.png"
import gg2 from "@/assets/images/projects/gg2.png"
import gg3 from "@/assets/images/projects/gg3.png"


interface DataType {
  id: number;
  col: string;
  image: StaticImageData;
  gallery?: StaticImageData[];
  title: string;
  category: string;
  link?: string;
  linkLabel?: string;
}

const portfolio_data: DataType[] = [
  {
    id: 1,
    col: "6",
    image: Pasted_tmp_jpg,
    gallery: [Pasted_tmp_jpg, Pasted_tmp2_jpg],
    title: "Real Time Chat Application",
    category: "MERN",
    link: "https://mern-chat-app-hmny.onrender.com/",
    linkLabel: "View Project",
  },
  {
    id: 2,
    col: "6",
    image: Pasted_image_4,
    gallery: [Pasted_tmp_jpg, Pasted_tmp2_jpg],
    title: "Task Manager Application",
    category: "MERN",
    link: "https://taskmanager-1-nna7.onrender.com/",
    linkLabel: "View Project",
  },
  {
    id: 3,
    col: "6",
    image: Pasted_image_3,
    gallery: [Pasted_image_2],
    title: "Job Importer Application",
    category: "MERN",
    link: "https://job-importer-system-front.onrender.com/",
    linkLabel: "View Project",
  },
  {
    id: 4,
    col: "6",
    image: gg1,
    gallery: [gg2, gg3],
    title: "Grocery Ecommerce Application",
    category: "React Laravel",
    link: "https://ghargrocer.com/",
    linkLabel: "View Project",
  },
];

export default function PortfolioArea() {
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const handleImagePopup = (index: number) => {
    const project = portfolio_data[index];
    if (!project) return;

    const combinedImages = [
      project.image,
      ...(project.gallery ?? []),
    ].map((img) => img.src);

    const seen = new Set<string>();
    const uniqueImages = combinedImages.filter((src) => {
      if (seen.has(src)) return false;
      seen.add(src);
      return true;
    });

    if (!uniqueImages.length) return;

    setGalleryImages(uniqueImages);
    setPhotoIndex(0);
    setIsOpen(true);
  };

  const handleKeydown = (
    event: KeyboardEvent<HTMLDivElement>,
    callback: () => void
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      callback();
    }
  };

  return (
    <>
      <div className="projects-area" id="portfolio">
        <div className="custom-icon">
          <img src="assets/images/custom/work-scribble.svg" alt="custom" />
        </div>

        <div className="container-fluid">
          <div className="row g-4 portfolio-grid">
            {portfolio_data.map((item, i) => (
              <div
                key={item.id}
                className={`col-md-6 col-xl-${item.col} portfolio-item category-1`}
              >
                <div
                  role="button"
                  tabIndex={0}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleImagePopup(i)}
                  onKeyDown={(event) =>
                    handleKeydown(event, () => handleImagePopup(i))
                  }
                  className="work-popup"
                >
                  <div className="portfolio-box">
                    <Image
                      src={item.image}
                      alt={item.title}
                      style={{ height: "auto" }}
                      data-rjs="2"
                    />
                    <span className="portfolio-category">{item.category}</span>

                    <div className="portfolio-caption">
                      <h1>{item.title}</h1>

                      {item.link && (
                        <Link
                          href={item.link}
                          className="portfolio-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {item.linkLabel ?? "View Project"}
                          <i className="ri-arrow-right-up-line" aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isOpen && photoIndex !== null && (
        <ImagePopup
          images={galleryImages}
          setIsOpen={setIsOpen}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
        />
      )}
    </>
  );
}
