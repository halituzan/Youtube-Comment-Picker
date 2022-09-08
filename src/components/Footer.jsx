import React from "react";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillMediumCircle,
} from "react-icons/ai";
import { FaPatreon } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer d-flex justify-content-center align-items-center w-100 p-2 bg-secondary text-light">
      <p className="fs-5 mb-0">
        Halit Uzan &#169; 2022{" "}
        <AiFillGithub className="github text-dark fs-3" />
        <AiFillMediumCircle className="medium text-dark fs-3" />
        <AiFillLinkedin className="linkedin text-dark fs-3" />
        <FaPatreon className="patreon text-dark fs-4" />
      </p>
    </div>
  );
};

export default Footer;
