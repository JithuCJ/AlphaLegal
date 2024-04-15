import React from "react";

// import { Helmet } from "react-helmet";

import "./desktop1.css";

const Desktop1 = (props) => {
  return (
    <div className="desktop1-container">
      {/* <Helmet> */}
        <title>exported project</title>
      {/* </Helmet> */}
      <div className="desktop1-desktop1">
        <img
          src="/external/bg632-cgs-900h.png"
          alt="bg632"
          className="desktop1-bg"
        />
        <img
          src="/external/rectangle26344-uoxk-1500w.png"
          alt="Rectangle26344"
          className="desktop1-rectangle26"
        />
        <img
          src="/external/rectangle274023-kbyx1-1500w.png"
          alt="Rectangle274023"
          className="desktop1-rectangle27"
        />
        <div className="desktop1-loginbox">
          <div className="desktop1-group2">
            <div className="desktop1-group1">
              <span className="desktop1-text">
                <span>Log in</span>
              </span>
              <img
                src="/external/rectangle1039-ejl-200h.png"
                alt="Rectangle1039"
                className="desktop1-rectangle10"
              />
              <img
                src="/external/rectangle11310-3j38-200h.png"
                alt="Rectangle11310"
                className="desktop1-rectangle11"
              />
              <span className="desktop1-text02">
                <span>Show</span>
              </span>
              <span className="desktop1-text04">
                <span>Password</span>
              </span>
              <img
                src="/external/rectangle12311-r4gq-200h.png"
                alt="Rectangle12311"
                className="desktop1-rectangle12"
              />
              <span className="desktop1-text06">
                <span>Forgot password?</span>
              </span>
              <span className="desktop1-text08">
                <span>*********</span>
              </span>
              <span className="desktop1-text10">
                <span>Log in</span>
              </span>
              <span className="desktop1-text12">
                <span>
                  Enter email address
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
              </span>
            </div>
            <span className="desktop1-text14">
              <span>OR</span>
            </span>
            <img
              src="/external/rectangle13312-qgkq-200h.png"
              alt="Rectangle13312"
              className="desktop1-rectangle13"
            />
            <span className="desktop1-text16">
              <span>Sign up</span>
            </span>
          </div>
          <span className="desktop1-text18">
            <span>Email</span>
          </span>
        </div>
        <img
          src="/external/navbar345-szjv.svg"
          alt="navbar345"
          className="desktop1-navbar"
        />
        <div className="desktop1-search">
          <div className="desktop1-iconandroid24search">
            <img
              src="/external/svgcolor349-53oe.svg"
              alt="SVGColor349"
              className="desktop1-svg-color"
            />
          </div>
        </div>
        <img
          src="/external/logo3412-fy4-200h.png"
          alt="logo3412"
          className="desktop1-logo"
        />
        <span className="desktop1-text20">
          <span>Services</span>
        </span>
        <span className="desktop1-text22">
          <span>Blog</span>
        </span>
        <span className="desktop1-text24">
          <span>About us</span>
        </span>
        <span className="desktop1-text26">
          <span>Industries</span>
        </span>
        <span className="desktop1-text28">
          <span>Career</span>
        </span>
        <span className="desktop1-text30">
          <span>Sign up</span>
        </span>
      </div>
    </div>
  );
};

export default Desktop1;
