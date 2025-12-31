"use client"
import React, { useEffect, useState } from "react";

export default function ResumeArea() {
  const [aboutData, setAboutData] = useState(null);


  const fetchAboutData = async () => {
    await fetch("http://localhost:5000/api/about", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setAboutData(data))
      .catch(error => console.error("Error:", error));
  }

  useEffect(() => {
    fetchAboutData();
  }, []);

  console.log(aboutData?.education);



  return (
    <>
      <div className="resume-area no-padding" id="resume">
        <div className="container">
          <div className="row">
            {/* Experience Column */}
            <div className="col-xl-6 col-md-6">
              <div className="resume-wrapper wow fadeInUp delay-0-2s">
                {aboutData?.workExperiences?.map(exp => (
                  <div className="resume-box" key={exp.id}>
                    <span className="resume-date">
                      {exp.fromDate} - {exp.toDate}
                    </span>
                    <h2>{exp.title}</h2>
                    <span>@ {exp.company}</span>
                    <p>{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>


            {/* Education Column */}
            <div className="col-xl-6 col-md-6">
              <div className="resume-wrapper wow fadeInUp delay-0-2s">
                {aboutData?.education?.map(edu => (
                  <div className="resume-box" key={edu.id}>
                    <span className="resume-date">
                      {edu.fromDate} - {edu.toDate}
                    </span>
                    <h2>{edu.degree}</h2>
                    <span>{edu.university}</span>
                    <p>{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
