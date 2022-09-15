import React from "react";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillMediumCircle,
} from "react-icons/ai";
import { FaPatreon } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer d-flex justify-content-center align-items-center w-100 mt-5 py-2 text-light">
      <p className="fs-5 mb-0">
        Halit Uzan &#169; 2022
        <a href="https://github.com/halituzan" target="_blank" rel="noreferrer">
          <AiFillGithub className="github text-dark fs-3" />
        </a>
        <a href="https://medium.com/@halituzan" target="_blank" rel="noreferrer">
          <AiFillMediumCircle className="medium text-dark fs-3" />
        </a>
        <a href="https://linkedin.com/in/halituzan/" target="_blank" rel="noreferrer">
          <AiFillLinkedin className="linkedin text-dark fs-3" />
        </a>
        <a href="https://patreon.com/uzanhalit" target="_blank" rel="noreferrer">
          <FaPatreon className="patreon text-dark fs-4" />
        </a>
      </p>
    </div>
  );
};

export default Footer;
