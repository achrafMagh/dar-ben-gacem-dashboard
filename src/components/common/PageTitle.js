import React from "react";
import { Helmet } from "react-helmet";

const PageTitle = ({ title, description }) => {
  return (
    <Helmet>
      <title>
        {" "}
        {title
          ? ` ${title} | Dar ben gacem dashboard`
          : "Dar ben gacem dashboard"}
      </title>
      <meta
        name="description"
        content={description ? ` ${description} ` : "Dar ben gacem dashboard"}
      />
    </Helmet>
  );
};

export default PageTitle;
