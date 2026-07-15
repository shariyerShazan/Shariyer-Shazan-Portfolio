"use client";

import React from "react";

const FrameBorder = () => {
  return (
    <>
      {/* Edge mask strips: cover the 26px zone at each edge with background color.
          z-99 = above all content (z-10/z-60) but below border lines (z-100/101).
          This ensures NO text ever visually overlaps or bleeds through the border. */}
      <div className="fixed top-0 left-0 right-0 h-[26px] bg-[#0a0f1d] pointer-events-none z-[99]" />
      <div className="fixed bottom-0 left-0 right-0 h-[26px] bg-[#0a0f1d] pointer-events-none z-[99]" />
      <div className="fixed top-0 left-0 bottom-0 w-[26px] bg-[#0a0f1d] pointer-events-none z-[99]" />
      <div className="fixed top-0 right-0 bottom-0 w-[26px] bg-[#0a0f1d] pointer-events-none z-[99]" />

      {/* The 3 decorative border lines (z-100) sit on top of the masks */}
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
