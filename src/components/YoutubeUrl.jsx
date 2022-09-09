import React from "react";
import {
  Button,
  Form,
  InputGroup,
  FloatingLabel,
  Ratio,
} from "react-bootstrap";

import { checkLink } from "../helpers/checklink";
import { en, tr } from "../lang/language";
const YoutubeUrl = ({ video, setVideo, setComments }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-75">
      <InputGroup className="mb-3">
        <Form.Control
          placeholder={
            localStorage.getItem("Lang") === "English"
              ? en.enterUrl
              : tr.enterUrl
          }
          aria-label="Youtube Url"
          aria-describedby="basic-addon2"
          value={video.link}
          className="url-input"
          onChange={(e) => setVideo({ ...video, link: e.target.value })}
        />
        <Button
          variant="secondary"
          className="url-button"
          id="button-addon2"
          onClick={() => checkLink(video, setVideo, setComments)}
        >
          {localStorage.getItem("Lang") === "English"
            ? en.selectVideo
            : tr.selectVideo}
        </Button>
      </InputGroup>
      <div className="options d-flex justify-content-center align-items-center  w-100 bg-secondary py-2 rounded-top">
        <Form className="d-flex row w-100">
          <div
            className={
              video?.wordFilter?.status
                ? "col-12 col-lg-6 text-light"
                : "col-12 text-light"
            }
          >
            <Form.Check
              type="switch"
              id="same user"
              label={
                localStorage.getItem("Lang") === "English"
                  ? en.filterSameComments
                  : tr.filterSameComments
              }
              bg="success"
              className="mx-5"
              onChange={(e) => {
                if (e.target.checked) {
                  setVideo({ ...video, sameFilter: true });
                } else setVideo({ ...video, sameFilter: false });
              }}
            />
            <Form.Check
              type="switch"
              id="words"
              label={
                localStorage.getItem("Lang") === "English"
                  ? en.filterWords
                  : tr.filterWords
              }
              className="mx-5"
              onChange={(e) => {
                if (e.target.checked) {
                  setVideo({
                    ...video,
                    wordFilter: { ...video.wordFilter, status: true },
                  });
                } else
                  setVideo({
                    ...video,
                    wordFilter: {
                      ...video.wordFilter,
                      status: false,
                      words: "",
                    },
                  });
              }}
            />
          </div>
          <FloatingLabel
            controlId="floatingTextarea2"
            label={
              localStorage.getItem("Lang") === "English" ? "Word" : "Kelime"
            }
            className={
              video?.wordFilter?.status ? "d-block col-12 col-lg-6" : "d-none"
            }
          >
            <Form.Control
              as="textarea"
              placeholder={
                localStorage.getItem("Lang") === "English"
                  ? en.textAreaPlace
                  : tr.textAreaPlace
              }
              value={video?.wordFilter?.words}
              onChange={(e) =>
                setVideo({
                  ...video,
                  wordFilter: { ...video.wordFilter, words: e.target.value },
                })
              }
            />
          </FloatingLabel>
        </Form>
      </div>
      {video.videoId ? (
        <div style={{ width: "400px" }} className="w-100 bg-light">
          <Ratio aspectRatio="16x9">
            <iframe
              title="Video"
              src={`https://www.youtube.com/embed/${video.videoId}`}
            />
          </Ratio>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default YoutubeUrl;
