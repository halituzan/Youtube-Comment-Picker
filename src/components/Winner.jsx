import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import {
  AiOutlineSelect,
  AiOutlineLink,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import { en, tr } from "../lang/language";
const Winner = ({ video, pickWin, setVideo, comments }) => {
  const plus = () => {
    if (video.seconds >= 1 && video.seconds < 17) {
      setVideo({ ...video, seconds: video.seconds + 1 });
    } else {
    }
  };

  const minus = () => {
    if (video.seconds > 1) {
      setVideo({ ...video, seconds: video.seconds - 1 });
    } else {
    }
  };

  let sameFilterComments = [...comments];
  const filterSameUser = sameFilterComments?.reduce((unique, o) => {
    // Sadece aynı kullanıcıları filtreliyor
    if (!unique.some((obj) => obj.authorChannelUrl === o.authorChannelUrl)) {
      unique.push(o);
    }
    return unique;
  }, []);

  const filterSameUserAndWords = filterSameUser.filter(
    // kelimeye ve kullanıcıya göre filtreliyor
    (i) =>
      i.textOriginal
        .toLowerCase()
        .includes(video.wordFilter.words.toLowerCase()) ||
      i.textOriginal
        .toUpperCase()
        .includes(video.wordFilter.words.toUpperCase())
  );
  const filterOnlyWords = comments.filter(
    // tüm yorumlarda kelimeye göre filtreliyor
    (i) =>
      i.textOriginal
        .toLowerCase()
        .includes(video.wordFilter.words.toLowerCase()) ||
      i.textOriginal
        .toUpperCase()
        .includes(video.wordFilter.words.toUpperCase())
  );

  const pickWinner = (arr) => {
    let count = 0;

    const repeat = setInterval(function () {
      if (count < video.seconds * 10) {
        count = count + 1;
        const randomNumber = () => Math.floor(Math.random() * arr.length);
        const random = randomNumber();
        setVideo({ ...video, pick: arr[random] });
      } else {
        clearInterval(repeat);
      }
    }, 100);
  };

  const beforeResult = () => {
    if (!video.sameFilter && !video.wordFilter.status) {
      // Tüm yorumların olduğu bölüm
      return (
        <div className="d-flex flex-column justify-content-center align-items-center">
          {comments.length < 1
            ? ""
            : localStorage.getItem("Lang") === "English"
            ? ` There are ${comments.length} comments in total`
            : `Toplamda ${comments.length} yorum var`}
          <Button
            variant="success"
            disabled={comments.length < 1 ? true : false}
            onClick={() => pickWinner(comments)}
            className="mt-5"
          >
            <AiOutlineSelect className="fs-1" />
            {localStorage.getItem("Lang") === "English"
              ? en.pickWinner
              : tr.pickWinner}
          </Button>
          {comments.length > 0 ? (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="d-flex justify-content-center mt-2 align-items-center ">
                <AiOutlineMinusCircle
                  onClick={() => minus()}
                  className="fs-2 cursor-pointer"
                />
                <Form.Control
                  type="number"
                  placeholder="Seconds"
                  className="w-50 mx-2 text-center"
                  value={video.seconds}
                  readOnly
                />
                <AiOutlinePlusCircle
                  onClick={() => plus()}
                  className="fs-2 cursor-pointer"
                />
              </div>
              <div className="fs-5 fw-lighter pt-3">
                {localStorage.getItem("Lang") === "English"
                  ? en.howManyTime
                  : tr.howManyTime}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      );
    } else if (video.sameFilter && !video.wordFilter.status) {
      // Aynı kullanıcıların elendiği kelime seçilmemiş durum
      return (
        <div className="d-flex flex-column justify-content-center align-items-center">
          {filterSameUser.length < 1
            ? ""
            : localStorage.getItem("Lang") === "English"
            ? ` There are ${filterSameUser.length} comments in total`
            : `Toplamda ${filterSameUser.length} yorum var`}
          <Button
            variant="success"
            disabled={filterSameUser.length < 1 ? true : false}
            onClick={() => pickWinner(filterSameUser)}
            className="mt-5 "
          >
            <AiOutlineSelect className="fs-1" />{" "}
            {localStorage.getItem("Lang") === "English"
              ? en.pickWinner
              : tr.pickWinner}
          </Button>
          {comments.length > 0 ? (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="d-flex justify-content-center mt-2 align-items-center ">
                <AiOutlineMinusCircle
                  onClick={() => minus()}
                  className="fs-2 cursor-pointer"
                />
                <Form.Control
                  type="number"
                  placeholder="Seconds"
                  className="w-50 mx-2 text-center"
                  value={video.seconds}
                  readOnly
                />
                <AiOutlinePlusCircle
                  onClick={() => plus()}
                  className="fs-2 cursor-pointer"
                />
              </div>
              <div className="fs-5 fw-lighter pt-3">
                {localStorage.getItem("Lang") === "English"
                  ? en.howManyTime
                  : tr.howManyTime}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      );
    } else if (!video.sameFilter && video.wordFilter.status) {
      // Bütün kullanıcıların olduğu kelime seçilmiş durum
      return (
        <div className="d-flex flex-column justify-content-center align-items-center">
          {filterOnlyWords.length < 1
            ? ""
            : localStorage.getItem("Lang") === "English"
            ? ` There are ${filterOnlyWords.length} comments in total`
            : `Toplamda ${filterOnlyWords.length} yorum var`}
          <Button
            variant="success"
            disabled={filterOnlyWords.length < 1 ? true : false}
            onClick={() => pickWinner(filterOnlyWords)}
            className="mt-5"
          >
            <AiOutlineSelect className="fs-1" />{" "}
            {localStorage.getItem("Lang") === "English"
              ? en.pickWinner
              : tr.pickWinner}
          </Button>
          {comments.length > 0 ? (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="d-flex justify-content-center mt-2 align-items-center ">
                <AiOutlineMinusCircle
                  onClick={() => minus()}
                  className="fs-2 cursor-pointer"
                />
                <Form.Control
                  type="number"
                  placeholder="Seconds"
                  className="w-50 mx-2 text-center"
                  value={video.seconds}
                  readOnly
                />
                <AiOutlinePlusCircle
                  onClick={() => plus()}
                  className="fs-2 cursor-pointer"
                />
              </div>
              <div className="fs-5 fw-lighter pt-3">
                {localStorage.getItem("Lang") === "English"
                  ? en.howManyTime
                  : tr.howManyTime}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      );
    } else if (video.sameFilter && video.wordFilter.status) {
      // Aynı kullanıcıların elendiği kelime seçilmiş durum
      return (
        <div className="d-flex flex-column justify-content-center align-items-center">
          {filterSameUserAndWords.length < 1
            ? ""
            : localStorage.getItem("Lang") === "English"
            ? ` There are ${filterSameUserAndWords.length} comments in total`
            : `Toplamda ${filterSameUserAndWords.length} yorum var`}
          <Button
            variant="success"
            disabled={filterSameUserAndWords.length < 1 ? true : false}
            onClick={() => pickWinner(filterSameUserAndWords)}
            className="mt-5"
          >
            <AiOutlineSelect className="fs-1" />{" "}
            {localStorage.getItem("Lang") === "English"
              ? en.pickWinner
              : tr.pickWinner}
          </Button>
          {comments.length > 0 ? (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="d-flex justify-content-center mt-2 align-items-center ">
                <AiOutlineMinusCircle
                  onClick={() => minus()}
                  className="fs-2 cursor-pointer"
                />
                <Form.Control
                  type="number"
                  placeholder="Seconds"
                  className="w-50 mx-2 text-center"
                  value={video.seconds}
                  readOnly
                />
                <AiOutlinePlusCircle
                  onClick={() => plus()}
                  className="fs-2 cursor-pointer"
                />
              </div>
              <div className="fs-5 fw-lighter pt-3">
                {localStorage.getItem("Lang") === "English"
                  ? en.howManyTime
                  : tr.howManyTime}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      );
    }
  };

  return (
    <Card
      className={
        !video.status
          ? "d-none"
          : "d-block mb-5 pb-5 bg-dark text-light rounded-0 w-75 rounded-bottom"
      }
    >
      <Card.Title>
        <div className="px-5 py-1 text-center">{beforeResult()}</div>
      </Card.Title>
      {!comments.length < 1 ? (
        <Card.Body className="d-flex pt-0 flex-column justify-content-center align-items-center">
          {video.pick ? (
            <div className="winner mt-1 d-flex flex-column justify-content-center align-items-center w-100">
              <p className="winner-text mb-5">
                {localStorage.getItem("Lang") === "English"
                  ? en.winner
                  : tr.winner}
              </p>
              <img
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = `https://via.placeholder.com/80/BA202E/0000FF?text=${video.pick?.authorDisplayName[0]}`;
                }}
                src={video.pick?.authorProfileImageUrl}
                alt="Profile"
                className="position-relative winner-img"
              />
              <img
                src="../assets/tac.png"
                alt="winner"
                className="winner-tac"
              />
              <div className="d-flex flex-column justify-content-center align-items-center ">
                <a
                  href={video.pick?.authorChannelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="d-flex justify-content-center align-items-center winner-link"
                >
                  <h1 className="winner-name">
                    {video.pick?.authorDisplayName}{" "}
                  </h1>

                  {/* <AiOutlineLink className="fs-2" /> */}
                </a>
              </div>
              <div className="w-50 comments text-dark p-2 d-flex flex-column justify-content-center align-items-center mt-2">
                <span className="fw-bold text-decoration-underline">
                  {localStorage.getItem("Lang") === "English"
                    ? en.comments
                    : tr.comments}
                </span>{" "}
                {video.pick?.textOriginal}
              </div>
            </div>
          ) : (
            ""
          )}
        </Card.Body>
      ) : (
        <Card.Body>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h3>
              {localStorage.getItem("Lang") === "English"
                ? en.readyComments
                : tr.readyComments}
            </h3>
            <Button
              variant="success"
              onClick={() => pickWin()}
              className="col-3 mt-3 w-100"
              style={!video.reVideoId ? { pointerEvents: "none" } : {}}
              disabled={!video.videoId ? true : false}
            >
              {localStorage.getItem("Lang") === "English"
                ? en.fetchComments
                : tr.fetchComments}
            </Button>
          </div>
        </Card.Body>
      )}
    </Card>
  );
};

export default Winner;
