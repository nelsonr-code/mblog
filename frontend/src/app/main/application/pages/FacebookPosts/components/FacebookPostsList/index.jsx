import React from "react";
import { useTranslation } from "react-i18next";
import { CustomTable } from "app/main/shared/CustomTable";
import { CustomDate } from "app/main/shared/CustomDate";
import { ErrorFetchingPosts } from "../../../WordpressPosts/components/WordpressPostsList";
import { useFacebookHelper } from "app/hooks/useFacebookHelper";
import { Button, IconButton } from "@material-ui/core";
import { FacebookPostPreview } from "app/main/application/pages/FacebookPosts/components/FacebookPostPreview";
import { useDialog } from "app/hooks/useDialog";
export const FacebookPostsList = () => {
  const { loadPosts, loading, error, repostToWordpress, getPostById } = useFacebookHelper();
  const { t } = useTranslation("main");

  const {open} = useDialog();

  const showFacebookPost = async (e, data) => {
    const post = await getPostById(data.id);
    console.log("la data", post);
    const a = await open({
      Component: FacebookPostPreview,
      props: {
        post
      }
    });

    console.log("desde el modal", a);
  }

  const configuration = {
    title: t("ondemand", {es: 'Posts de facebook', en: 'Facebook posts'}),
    options: {
      filtering: false,
      paginationType: 'stepped',
      showFirstLastPageButtons: false,
      pageSizeOptions: [25],
      padding: 'dense'
    },
    data: loadPosts,
    columns: [
      {
        field: "creation_date",
        title: t("ondemand", { es: "Fecha", en: "Date" }),
        render: ({ creation_date: date }) => <CustomDate {...{ date }} />,
        filtering: false,
      },
      {
        field: "message",
        title: t("ondemand", { es: "Mensaje", en: "Message" }),
      }
    ],
    actions: [
      {
        icon: "refresh",
        isFreeAction: true,
        onClick: console.log
      },
      {
        icon: 'visibility',
        onClick: showFacebookPost
      }
    ],
  };
  return (
    <>
      <ErrorFetchingPosts
        name="Facebook"
        visible={error}
      />
      <CustomTable configuration={configuration} />
    </>
  );
};