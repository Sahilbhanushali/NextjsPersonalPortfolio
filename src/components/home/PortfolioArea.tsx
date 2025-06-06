"use client";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import ImagePopup from "@/modals/ImagePopup";

import portfolio_img_1 from "@/assets/images/projects/project-1.png";
import portfolio_img_2 from "@/assets/images/projects/project-2.png";
import portfolio_img_3 from "@/assets/images/projects/project-3.png";
import portfolio_img_4 from "@/assets/images/projects/project-4.png";
import portfolio_img_5 from "@/assets/images/projects/project-5.png";

interface DataType {
  id: number;
  col: string;
  image: StaticImageData;
  title: string;
  category: string;
}

const portfolio_data: DataType[] = [
  {
    id: 1,
    col: "6",
    image: portfolio_img_1,
    title: "Admin Dashboard",
    category: "MERN",
  },
  {
    id: 2,
    col: "6",
    image: portfolio_img_2,
    title: "Chat Application",
    category: "MERN",
  },
  {
    id: 3,
    col: "4",
    image: portfolio_img_3,
    title: "Task Management",
    category: "NEXT js",
  },
  {
    id: 4,
    col: "4",
    image: portfolio_img_4,
    title: "Eccommerce Website",
    category: "Wordpress Elementor",
  },
  {
    id: 5,
    col: "4",
    image: portfolio_img_5,
    title: "CRM ",
    category: "php",
  },
];

export default function PortfolioArea() {
  // photoIndex
  const [photoIndex, setPhotoIndex] = useState(null);
  // image open state
  const [isOpen, setIsOpen] = useState(false);
  // handleImagePopup
  const handleImagePopup = (i: any) => {
    setPhotoIndex(i);
    setIsOpen(true);
  };
  //  images
  const image = portfolio_data.slice(0, 5).map((item) => item.image.src);

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
                key={i}
                className={`col-md-6 col-xl-${item.col} portfolio-item category-1`}
              >
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => handleImagePopup(i)}
                  className="work-popup"
                >
                  <div className="portfolio-box">
                    <Image
                      src={item.image}
                      alt=""
                      style={{ height: "auto" }}
                      data-rjs="2"
                    />
                    <span className="portfolio-category">{item.category}</span>
                    <div className="portfolio-caption">
                      <h1>{item.title}</h1>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* image light box start */}
      {isOpen && (
        <ImagePopup
          images={image}
          setIsOpen={setIsOpen}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
        />
      )}
      {/* image light box end */}
    </>
  );
}
