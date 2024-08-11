// import React from "react";
import TopBar from "../../components/loginHeader";
import NavBar from "../../components/Nav";
import LoggedInFAQs from "../../components/LoggedInAccordion";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedinIn,
  faXTwitter,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const FAQs = () => {
  const X = "https://twitter.com/Jan1Verse1";
  const IG = "https://www.instagram.com/Jan1Verse1/";
  const Github = "https://github.com/Jan1Verse1";
  const LinkedIn =
    "https://www.linkedin.com/in/adedotun-oluwaseyi-555710100?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app";

  return (
    <div className="flex flex-row  w-full min-h-screen ">
      <NavBar />
      <div className="flex flex-col  w-full min-h-screen">
        <TopBar />
        <div className="flex flex-col  p-6 w-full min-h-screen">
          <LoggedInFAQs />
          <div>
            <h4 className="text-2xl text-violet-900 mb-4 font-bold">
              Want to connect with us?
            </h4>
            <div className="contactt">
              <p className="text-xl text-grey mb-4 mt-0 list-none font-semibold">
                follow on Socials
              </p>
              <div className="socialmedia">
                <Link to={IG} target="_blank">
                  {" "}
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="w-6 h-6 text-violet-900 mr-8"
                  />
                </Link>
                <Link to={X} target="_blank">
                  {" "}
                  <FontAwesomeIcon
                    icon={faXTwitter}
                    className="w-6 h-6 text-violet-900 mr-8"
                  />
                </Link>

                <Link to={LinkedIn} target="_blank">
                  {" "}
                  <FontAwesomeIcon
                    icon={faLinkedinIn}
                    className="w-6 h-6 text-violet-900 mr-8"
                  />
                </Link>
                <Link to={Github} target="_blank">
                  {" "}
                  <FontAwesomeIcon
                    icon={faGithub}
                    className="w-6 h-6 text-violet-900  mr-8"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
