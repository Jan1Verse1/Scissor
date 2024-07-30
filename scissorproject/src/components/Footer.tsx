// import React from "react";
import FooterLogo from "../assets/logo.svg";
import { Link } from "react-router-dom";
// import "./TheFooter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedinIn,
  faXTwitter,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const X = "https://twitter.com/Jan1Verse1";
  const IG = "https://www.instagram.com/Jan1Verse1/";
  const Github = "https://github.com/Jan1Verse1";
  const LinkedIn =
    "https://www.linkedin.com/in/adedotun-oluwaseyi-555710100?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app";

  return (
    <div className="flex flex-col w-auto bg-violet-900 p-6">
      <div className="flex items-center justify-between gap-2.5  mb-8">
        <div className="w-10 h-10 cursor-pointer">
          <img src={FooterLogo} alt="BucksTrybe logo" />
        </div>

        <div className="contactt">
          <p className="text-xl text-white mb-4 mt-0 list-none font-semibold">
            follow on Socials
          </p>
          <div className="socialmedia">
            <Link to={IG} target="_blank">
              {" "}
              <FontAwesomeIcon
                icon={faInstagram}
                className="w-6 h-6 text-white mr-8"
              />
            </Link>
            <Link to={X} target="_blank">
              {" "}
              <FontAwesomeIcon
                icon={faXTwitter}
                className="w-6 h-6 text-white mr-8"
              />
            </Link>

            <Link to={LinkedIn} target="_blank">
              {" "}
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className="w-6 h-6 text-white mr-8"
              />
            </Link>
            <Link to={Github} target="_blank">
              {" "}
              <FontAwesomeIcon
                icon={faGithub}
                className="w-6 h-6 text-white mr-8"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between border-t-2 border-white pt-10">
        <p className="text-base text-white mb-4 mt-0 list-none font-normal">
          © 2024 AltSchool Capstone Project. - All Rights Reserved!
        </p>

        {/* <div className="terms">
          <p className="smallA">Terms of use </p>
          <p className="smallA">Privacy policy </p>
        </div> */}
      </div>
    </div>
  );
};

export default Footer;
