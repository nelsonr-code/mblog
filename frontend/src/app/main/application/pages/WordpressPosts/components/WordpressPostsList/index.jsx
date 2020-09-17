import React from "react";
import { useWordpressHelper } from "app/hooks/useWordpressHelper";
import { useTranslation } from "react-i18next";
import { Box, Typography, IconButton, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { CustomTable } from "app/main/shared/CustomTable";
import { CustomDate } from "app/main/shared/CustomDate";
import { DatePicker } from "@material-ui/pickers";
import moment from "moment";
import { useDialog } from "app/hooks/useDialog";
import { WordpressPostPreview } from "../WordpressPostPreview";

const CustomFilter = ({ columnDef, onFilterChanged, ...props }) => {
  console.log("las demas", props);
  const [selected, setSelected] = React.useState(moment());
  const onChange = (date) => {
    onFilterChanged(columnDef.tableData.id, date.format("LLL"));
    setSelected(date);
  };

  return <DatePicker onChange={onChange} />;
};

export const WordpressPostsList = () => {
  const { posts, refreshPosts, loading, error } = useWordpressHelper();
  const { t } = useTranslation("main");

  const retryAction = () => {
    refreshPosts();
  };

  React.useEffect(() => {
    refreshPosts();
  }, []);

  const { open } = useDialog();

  const configuration = {
    options: {
      filtering: true,
      padding: 'dense'
    },
    data: posts,
    columns: [
      {
        field: "date",
        title: t("ondemand", { es: "Fecha", en: "Date" }),
        render: ({ date }) => <CustomDate {...{ date }} />,
        filtering: false,
      },
      {
        field: "title.rendered",
        title: t("ondemand", { es: "Título", en: "Title" }),
      },
      {
        field: "slug",
        title: t("ondemand", { es: "Slug", en: "Slug" }),
      },
      {
        field: "status",
        title: t("ondemand", { es: "Estatus", en: "Status" }),
      },
    ],
    isLoading: loading,
    actions: [
      {
        icon: "refresh",
        onClick: () => {
          refreshPosts();
        },
        isFreeAction: true,
      },
      {
        icon: "visibility",
        onClick: async (e, data) => {
          console.log("la data", data);

          const a = await open({
            Component: WordpressPostPreview,
            props: {
              post: data,
            },
          });

          console.log("desde el modal", a);
        },
        iconProps: {
          color: "primary",
        },
      },
    ],
  };
  return (
    <>
      <ErrorFetchingPosts
        name="Wordpress"
        visible={error}
        retryAction={retryAction}
      />
      <CustomTable configuration={configuration} />
    </>
  );
};

export const ErrorFetchingPosts = (props) => {
  const { t } = useTranslation("main");
  return (
    props.visible && (
      <Alert
        severity="error"
        action={
          props.retryAction && (
            <Button
              size="small"
              color="inherit"
              variant="text"
              onClick={props.retryAction}
            >
              {t("ondemand", { es: "reintentar", en: "retry" })}
            </Button>
          )
        }
      >
        <AlertTitle>
          {t("ondemand", {
            es: "No se pudieron obtener los posts de " + props.name,
            en: "Could not get posts from " + props.name,
          })}
        </AlertTitle>
        {props.errorMessage && (
          <>
            <Typography>
              {t("ondemand", {
                es: "Mensaje de error: ",
                en: "Error message: ",
              })}
              <strong>{props.errorMessage}</strong>
            </Typography>
          </>
        )}
      </Alert>
    )
  );
};
