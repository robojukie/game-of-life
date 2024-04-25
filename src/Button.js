import React, { useState, useEffect } from "react";
import "./styles.css";

const Button = ({ onClick, label }) => {
  return (
    <button className="btn btn-default" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
