import React from "react";
import { Form } from "react-bootstrap";

const LanguageSelect = () => {
  return (
    <div className="language">
      <Form.Select
        aria-label="English"
        size="sm"
        className="bg-dark text-light"
        defaultValue={localStorage.getItem("Lang")}
        onChange={(e) => {
          localStorage.setItem("Lang", e.target.value);
          window.location.reload();
          return false;
        }}
      >
        <option value="English">English</option>
        <option value="Turkish">Türkçe</option>
      </Form.Select>
    </div>
  );
};

export default LanguageSelect;
