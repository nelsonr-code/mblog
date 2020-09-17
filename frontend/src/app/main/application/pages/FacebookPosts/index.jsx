import React from "react";
import { FusePageSimple } from "@fuse";
import { useTranslation } from "react-i18next";
import { FacebookPostsList } from "./components/FacebookPostsList";

export const FacebookPosts = () => {
  const { t } = useTranslation("main");

  return (
    <FusePageSimple
      content={
        <div className="p-24 flex flex-col flex-1 justify-center h-full">
          <FacebookPostsList />
        </div>
      }
    />
  );
};
