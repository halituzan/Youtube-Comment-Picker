import React from "react";
import {
  Button,
  Form,
  InputGroup,
  FloatingLabel,
} from "react-bootstrap";
const YoutubeUrl = ({
  link,
  setLink,
  checkLink,
  setSameFilter,
  wordFilter,
  setWordFilter,
}) => {
  return (
    <div>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Youtube Url"
          aria-label="Youtube Url"
          aria-describedby="basic-addon2"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <Button
          variant="secondary"
          id="button-addon2"
          onClick={() => checkLink(link)}
        >
          Select Video
        </Button>
      </InputGroup>
      <div className="options d-flex justify-content-start align-items-start">
        <Form className="d-flex row">
          <div className={wordFilter.status ? "col-12 col-lg-6" : "col-12"}>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Filter Same Comments"
              className="mx-5"
              onChange={(e) => {
                if (e.target.checked) {
                  setSameFilter(true);
                } else setSameFilter(false);
              }}
            />
            <Form.Check
              disabled
              type="switch"
              id="custom-switch"
              label="Filter Words [ If you are going to use more than one word, please use commas(,) ]"
              className="mx-5"
              onChange={(e) => {
                if (e.target.checked) {
                  setWordFilter({
                    ...wordFilter,
                    status: true,
                  });
                } else
                  setWordFilter({
                    ...wordFilter,
                    status: false,
                  });
              }}
            />
          </div>
          <FloatingLabel
            controlId="floatingTextarea2"
            label="Words"
            className={wordFilter.status ? "d-block col-12 col-lg-6" : "d-none"}
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a words here"
              value={wordFilter.words}
              onChange={(e) =>
                setWordFilter({
                  ...wordFilter,
                  words: e.target.value,
                })
              }
            />
          </FloatingLabel>
        </Form>
      </div>
    </div>
  );
};

export default YoutubeUrl;
