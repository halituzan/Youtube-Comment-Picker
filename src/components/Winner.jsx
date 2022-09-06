import React from "react";
import { Button, Card } from "react-bootstrap";
import { AiOutlineSelect, AiOutlineLink } from "react-icons/ai";

const Winner = ({
  comments,
  video,
  sameFilter,
  wordFilter,
  videoId,
  pickWin,
  pick,
  setPick,
}) => {
  let sameFilterComments = [...comments];

  const filterSameUser = sameFilterComments.reduce((unique, o) => {
    if (!unique.some((obj) => obj.authorChannelUrl === o.authorChannelUrl)) {
      unique.push(o);
    }
    return unique;
  }, []);
  const pickWinner = (arr) => {
    const randomNumber = () => Math.floor(Math.random() * arr.length);
    const random = randomNumber();
    setPick(arr[random]);
  };
  return (
    <Card className={!video.status ? "d-none mt-5" : "d-block mt-5"}>
      <Card.Title>
        <div className="px-5 py-1 text-center">
          {!sameFilter && !wordFilter.status ? (
            <p>
              {comments.length < 1
                ? ""
                : ` There are ${comments.length} comments in total`}
            </p>
          ) : (
            <p>
              {filterSameUser.length < 1
                ? ""
                : ` There are different ${filterSameUser.length} comments in total`}
            </p>
          )}
        </div>
      </Card.Title>
      {!comments.length < 1 ? (
        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
          <Button
            variant="success"
            disabled={comments.length < 1 ? true : false}
            onClick={() => {
              if (sameFilter === false) {
                return pickWinner(comments);
              } else {
                return pickWinner(filterSameUser);
              }
            }}
          >
            <AiOutlineSelect className="fs-1" /> Pick Winner
          </Button>
          {pick ? (
            <div className="winner mt-5 d-flex flex-column justify-content-center align-items-center w-100">
              <img
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = `https://via.placeholder.com/80/BA202E/0000FF?text=${pick?.authorDisplayName[0]}`;
                }}
                src={pick?.authorProfileImageUrl}
                alt="Profile"
                style={{ width: "5rem" }}
                className="position-relative"
              />

              <p className="w-50 bg-warning text-dark p-2 d-flex flex-column justify-content-center align-items-center mt-2">
                <span className="fw-bold text-decoration-underline">Yorum</span>{" "}
                {pick?.textOriginal}
              </p>
              <div className="d-flex justify-content-center align-items-center ">
                <a
                  href={pick?.authorChannelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="d-flex justify-content-center align-items-center "
                >
                  <h1>{pick?.authorDisplayName} </h1>

                  <AiOutlineLink className="fs-2" />
                </a>
              </div>
              <div className="comment"></div>
            </div>
          ) : (
            ""
          )}
        </Card.Body>
      ) : (
        <Card.Body>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h3> Comments Ready to Take</h3>
            <Button
              variant="success"
              onClick={() => pickWin()}
              className="col-3 mt-3 w-100"
              style={!videoId ? { pointerEvents: "none" } : {}}
              disabled={!videoId ? true : false}
            >
              Fetch Comments
            </Button>
          </div>
        </Card.Body>
      )}
    </Card>
  );
};

export default Winner;
