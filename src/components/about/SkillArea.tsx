"use client"
import React, { useEffect, useState } from "react";

export default function SkillArea() {

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/skills`);
        const data = await res.json();
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);


  return (
    <>
      <section id="skills" className="skill-area">
        <div className="container">
          <div className="container-inner">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <div className="section-title section-black-title mb-40 wow fadeInUp delay-0-2s">
                  <h2>
                    Skills I Have (and no, they're not all copy pasted from
                    Stack Overflow)
                  </h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="skill-items-wrap">
                  <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6">
                      <div className="skill-item wow fadeInUp delay-0-2s">
                        <img
                          src="assets/images/skills/Next.js.png"
                          alt="Skill"
                        />
                        <h5>Next Js</h5>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6">
                      <div className="skill-item wow fadeInUp delay-0-3s">
                        <img src="assets/images/skills/React.png" alt="Skill" />
                        <h5>React Js</h5>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6">
                      <div className="skill-item wow fadeInUp delay-0-4s">
                        <img
                          src="assets/images/skills/MongoDB.png"
                          alt="Skill"
                        />
                        <h5>Mongo DB</h5>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6">
                      <div className="skill-item wow fadeInUp delay-0-5s">
                        <img
                          src="assets/images/skills/WordPress.png"
                          alt="Skill"
                        />
                        <h5>WordPress</h5>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6">
                      <div className="skill-item wow fadeInUp delay-0-2s">
                        <img
                          src="assets/images/skills/Express.png"
                          alt="Skill"
                        />
                        <h5>Express</h5>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6">
                      <div className="skill-item wow fadeInUp delay-0-3s">
                        <img
                          src="assets/images/skills/Node.js.png"
                          alt="Skill"
                        />
                        <h5>Node Js</h5>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6">
                      <div className="skill-item wow fadeInUp delay-0-4s">
                        <img src="assets/images/skills/PHP.png" alt="Skill" />
                        <h5>Php</h5>
                      </div>
                    </div>

                    <div className="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6">
                      <div className="skill-item wow fadeInUp delay-0-5s">
                        <img src="assets/images/skills/MySQL.png" alt="Skill" />
                        <h5>Sql</h5>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6">
                      <div className="skill-item wow fadeInUp delay-0-5s">
                        <img
                          src="assets/images/skills/JavaScript.png"
                          alt="Skill"
                        />
                        <h5>Javascript</h5>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6">
                      <div className="skill-item wow fadeInUp delay-0-5s">
                        <img src="assets/images/skills/HTML5.png" alt="Skill" />
                        <h5>Html</h5>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6">
                      <div className="skill-item wow fadeInUp delay-0-5s">
                        <img src="assets/images/skills/CSS3.png" alt="Skill" />
                        <h5>Css</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
