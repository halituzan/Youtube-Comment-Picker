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

  const filterSameUser = sameFilterComments?.reduce((unique, o) => {
    if (!unique.some((obj) => obj.authorChannelUrl === o.authorChannelUrl)) {
      unique.push(o);
    }
    return unique;
  }, []);
  const filterSameUserAndWords = filterSameUser.filter(
    (i) =>
      i.textOriginal.toLowerCase().includes(wordFilter.words.toLowerCase()) ||
      i.textOriginal.toUpperCase().includes(wordFilter.words.toUpperCase())
  );
  const filterOnlyWords = comments.filter(
    (i) =>
      i.textOriginal.toLowerCase().includes(wordFilter.words.toLowerCase()) ||
      i.textOriginal.toUpperCase().includes(wordFilter.words.toUpperCase())
  );
  const pickWinner = (arr) => {
    const randomNumber = () => Math.floor(Math.random() * arr.length);
    const random = randomNumber();
    setPick(arr[random]);
  };

  const beforeResult = () => {
    if (!sameFilter && !wordFilter.status) {
      return (
        <p className="d-flex flex-column justify-content-center align-items-center">
          {comments.length < 1
            ? ""
            : ` There are ${comments.length} comments in total`}
          <Button
            variant="success"
            disabled={comments.length < 1 ? true : false}
            onClick={() => pickWinner(comments)}
            className="mt-5"
          >
            <AiOutlineSelect className="fs-1" /> Pick Winner
          </Button>
        </p>
      );
    } else if (sameFilter && !wordFilter.status) {
      return (
        <p className="d-flex flex-column justify-content-center align-items-center">
          {filterSameUser.length < 1
            ? ""
            : ` There are ${filterSameUser.length} comments in total`}
          <Button
            variant="success"
            disabled={comments.length < 1 ? true : false}
            onClick={() => pickWinner(filterSameUser)}
            className="mt-5"
          >
            <AiOutlineSelect className="fs-1" /> Pick Winner
          </Button>
        </p>
      );
    } else if (!sameFilter && wordFilter.status) {
      return (
        <p className="d-flex flex-column justify-content-center align-items-center">
          {filterOnlyWords.length < 1
            ? ""
            : ` There are ${filterOnlyWords.length} comments in total`}
          <Button
            variant="success"
            disabled={comments.length < 1 ? true : false}
            onClick={() => pickWinner(filterOnlyWords)}
            className="mt-5"
          >
            <AiOutlineSelect className="fs-1" /> Pick Winner
          </Button>
        </p>
      );
    } else if (sameFilter && wordFilter.status) {
      return (
        <p className="d-flex flex-column justify-content-center align-items-center">
          {filterSameUserAndWords.length < 1
            ? ""
            : ` There are ${filterSameUserAndWords.length} comments in total`}
          <Button
            variant="success"
            disabled={comments.length < 1 ? true : false}
            onClick={() => pickWinner(filterOnlyWords)}
            className="mt-5"
          >
            <AiOutlineSelect className="fs-1" /> Pick Winner
          </Button>
        </p>
      );
    }
  };

  return (
    <Card className={!video.status ? "d-none mt-5" : "d-block mt-5"}>
      <Card.Title>
        <div className="px-5 py-1 text-center">{beforeResult()}</div>
      </Card.Title>
      {!comments.length < 1 ? (
        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
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
              <p className="w-50 bg-warning text-dark p-2 d-flex flex-column justify-content-center align-items-center mt-2">
                <span className="fw-bold text-decoration-underline">
                  Comment
                </span>{" "}
                {pick?.textOriginal}
              </p>
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
