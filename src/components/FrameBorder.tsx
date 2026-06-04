"use client";

import React from "react";

const FrameBorder = () => {
  return (
    <>
      <div className="railway-border railway-outer" />
      <div className="railway-border railway-middle" />
      <div className="railway-border railway-inner" />
      <div className="railway-cross-topLeft" />
      <div className="railway-cross-topRight" />
      <div className="railway-cross-bottomLeft" />
      <div className="railway-cross-bottomRight" />
      <div className="bg-circuit" />
    </>
  );
};

export default FrameBorder;
