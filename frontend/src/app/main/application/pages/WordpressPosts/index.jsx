import React from "react";
import { FusePageSimple } from "@fuse";
import { useTranslation } from "react-i18next";
import { WordpressPostsList } from "./components/WordpressPostsList";

export const WordpressPosts = () => {
  const { t } = useTranslation("main");

  return (
    <FusePageSimple
      header={
        <div className="p-24 text-center flex">
          <h1>{t("wordpressPosts")}</h1>
        </div>
      }
      content={
        <div className="p-24 flex flex-col flex-1 justify-center h-full">
          <WordpressPostsList />
        </div>
      }
    />
  );
};
