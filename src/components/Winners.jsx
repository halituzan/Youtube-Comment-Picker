import React from "react";
import { en, tr } from "../lang/language";

export default function Winners({ winners }) {
  return (
    <div
      className="winners position-sticky d-flex flex-column justify-content-center align-items-center p-4"
      id="winners"
    >
      <div className="winner1 d-flex flex-column justify-content-center align-items-center">
        <h3 className="text-center">
          {localStorage.getItem("Lang") === "English"
            ? en.winner + "S"
            : tr.winner + "LAR"}
        </h3>
        <p className="fs-1 text-dark">{winners[0]?.authorDisplayName}</p>
        <img
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = `https://via.placeholder.com/250/BA202E/0000FF?text=${winners[0]?.authorDisplayName[0]}`;
          }}
          src={winners[0]?.authorProfileImageUrl}
          alt="Profile"
          className="position-relative winner-img"
          style={{
            width: "150px",
            border: "4px solid #fbe217",
            borderRadius: "50%",
          }}
        />
      </div>
      <div className="d-flex justify-content-center flex-wrap mt-3">
        {winners.map((i, index) => (
          <div
          key={index}
            className={
              index === 0
                ? "d-none"
                : "d-flex justify-content-start flex-column alignitems-center mx-2 my-2 text-center"
            }
            style={{ maxWidth: "100px" }}
          >
            <h6 className={index === 0 ? "d-none" : "d-block text-center"}>
              {localStorage.getItem("Lang") === "English"
                ? en.backUp
                : tr.backUp}
              {index}
            </h6>
            <img
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = `https://via.placeholder.com/48/BA202E/0000FF?text=${i?.authorDisplayName[0]}`;
              }}
              src={i?.authorProfileImageUrl}
              alt="Profile"
              className="position-relative winner-img align-self-center"
              style={{ borderRadius: "50%", width: "48px" }}
            />
            <p className={index === 0 ? "d-none" : "d-block"}>
              {i?.authorDisplayName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
