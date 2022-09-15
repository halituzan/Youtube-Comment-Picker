import React from "react";
import { en, tr } from "../lang/language";

export default function Home() {
  return (
    <div className="home d-flex flex-column justify-content-center aling-items-center">
      <div className="header d-flex justify-content-center row">
        <div className="home-left d-flex flex-column text-light justify-content-start align-items-start col-12 col-sm-7">
          <p className="home-title">
            {localStorage.getItem("Lang") === "English"
              ? en.homeTitle
              : tr.homeTitle}
          </p>
          <p>
            {localStorage.getItem("Lang") === "English"
              ? en.homeMessage
              : tr.homeMessage}
          </p>
          <a href="#main">
            <div className="btn-grad cursor-pointer fw-bold text-dark">
              {localStorage.getItem("Lang") === "English"
                ? en.tryNow
                : tr.tryNow}
            </div>
          </a>
        </div>

        <div className="home-img col-12 col-sm-3 align-self-center">
          <img src="../assets/home-pc.png" alt="home" className="w-100" />
        </div>
      </div>

      <div
        className="main d-flex flex-column justify-content-center align-items-center py-5"
        id="main"
      >
        <h2 className="my-5 text-center">
          {localStorage.getItem("Lang") === "English"
            ? en.socialTitle
            : tr.socialTitle}
        </h2>
        <div className="container wrap-main d-flex justify-content-center align-items-center row">
          {/* <div className="main-facebook col-12 col-md-4 text-center">
            <img src="../assets/facebook.png" alt="social icons" />
          </div> */}
          <div className="main-youtube col-12 col-md-4 text-center">
            <a href="/youtube">
              <img src="../assets/youtube.png" alt="social icons" />
            </a>
          </div>
          {/* <div className="main-instagram col-12 col-md-4 text-center">
            <img src="../assets/instagram.png" alt="social icons" />
          </div>
          <div className="main-twitter col-12 col-md-4 text-center">
            <img src="../assets/twitter.png" alt="social icons" />
          </div>
          <div className="main-pinterest col-12 col-md-4 text-center">
            <img src="../assets/pinterest.png" alt="social icons" />
          </div> */}
        </div>
      </div>
      {/* <div className="centerh1 d-flex justify-content-center justify-content-center align-items-center p-3">
        {localStorage.getItem("Lang") === "English" ? (
          <p>
            {en.homeCenterMessage.one}
            <br /> {en.homeCenterMessage.two}
          </p>
        ) : (
          <p>
            {tr.homeCenterMessage.one}
            <br /> {tr.homeCenterMessage.two}
          </p>
        )}
      </div> */}
      {/* <div className="main d-flex justify-content-evenly row">
        
      </div> */}
    </div>
  );
}
