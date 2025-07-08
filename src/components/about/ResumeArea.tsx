import React from "react";

export default function ResumeArea() {
  return (
    <>
      <div className="resume-area no-padding" id="resume">
        <div className="container">
          <div className="row">
            {/* Experience Column */}
            <div className="col-xl-6 col-md-6">
              <div className="resume-wrapper wow fadeInUp delay-0-2s">
                <div className="resume-box">
                  <span className="resume-date">Jan 2025 - Jun 2025</span>
                  <h2>Web Developer</h2>
                  <span>@ itsmeDezino, Thane, Mumbai</span>
                  <p>
                    Developed custom dashboards, websites and various modules
                    for enhanced management. Participated in project planning
                    meetings and discuss changes.
                  </p>
                </div>

                <div className="resume-box">
                  <span className="resume-date">Sep 2023 - Jul 2024</span>
                  <h2>Junior Developer</h2>
                  <span>
                    @ Niket Communications and Security Systems, Gujarat
                  </span>
                  <p>
                    Customized SuiteCRM projects for client-specific needs,
                    automated AMC renewals, integrated barcode systems, and
                    implemented workflows for task management and reminders.
                  </p>
                </div>
              </div>
            </div>

            {/* Education Column */}
            <div className="col-xl-6 col-md-6">
              <div className="resume-wrapper wow fadeInUp delay-0-4s">
                <div className="resume-box">
                  <span className="resume-date">Mar 2025</span>
                  <h2>Bachelor's in Computer Science Engineering</h2>
                  <span>@ Laxmi Institute of Technology, Vapi</span>
                  <p>
                    Focused on building a strong foundation in computer science
                    and its Various applications, including software
                    development, data structures, and algorithms.
                  </p>
                </div>

                <div className="resume-box">
                  <span className="resume-date">Sep 2022</span>
                  <h2>Diploma in Computer Engineering</h2>
                  <span>@ Government Polytechnic, Daman</span>
                  <p>
                    Completed core courses in programming, web technologies, and
                    database management, laying the groundwork for practical
                    software development skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
