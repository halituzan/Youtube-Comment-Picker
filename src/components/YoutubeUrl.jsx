import React from "react";
import {
  Button,
  Form,
  InputGroup,
  FloatingLabel,
  Ratio,
} from "react-bootstrap";
import { checkLink } from "../helpers/checklink";
const YoutubeUrl = ({ video, setVideo, setComments }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Enter youtube url "
          aria-label="Youtube Url"
          aria-describedby="basic-addon2"
          value={video.link}
          onChange={(e) => setVideo({ ...video, link: e.target.value })}
        />
        <Button
          variant="secondary"
          id="button-addon2"
          onClick={() => checkLink(video, setVideo, setComments)}
        >
          Select Video
        </Button>
      </InputGroup>
      <div className="options d-flex justify-content-start align-items-start">
        <Form className="d-flex row">
          <div
            className={video?.wordFilter?.status ? "col-12 col-lg-6" : "col-12"}
          >
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Filter Same Comments"
              className="mx-5"
              onChange={(e) => {
                if (e.target.checked) {
                  setVideo({ ...video, sameFilter: true });
                } else setVideo({ ...video, sameFilter: false });
              }}
            />
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Filter Words [ If you are going to use more than one word, please use commas(,) ]"
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
            label="Words"
            className={
              video?.wordFilter?.status ? "d-block col-12 col-lg-6" : "d-none"
            }
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a words here"
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
      <div style={{ width: "400px" }} className="my-2">
        {video.videoId ? (
          <Ratio aspectRatio="16x9">
            <iframe
              title="Video"
              src={`https://www.youtube.com/embed/${video.videoId}`}
            />
          </Ratio>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default YoutubeUrl;
