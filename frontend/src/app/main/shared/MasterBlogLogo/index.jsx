import React from "react";

export function MasterBlogLogo({className}) {
  return (
    <img
      className={ className || `w-128 mb-32`}
      src="assets/images/logos/masterblog/black_logo.svg"
      alt="logo"
    />
  );
}
