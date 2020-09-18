import React from "react";
import { useTranslation } from "react-i18next";
import { CustomTable } from "app/main/shared/CustomTable";
import { CustomDate } from "app/main/shared/CustomDate";
import { ErrorFetchingPosts } from "../../../WordpressPosts/components/WordpressPostsList";
import { useFacebookHelper } from "app/hooks/useFacebookHelper";
import { FacebookPostPreview } from "app/main/application/pages/FacebookPosts/components/FacebookPostPreview";
import { useDialog } from "app/hooks/useDialog";
import { DateCustomFilter } from "app/main/shared/DateCustomFilter";
import moment from "moment";

export const FacebookPostsList = () => {
  const {
    posts,
    loadPosts,
    loading,
    error,
    repostToWordpress,
    getPostById,
  } = useFacebookHelper();
  const { t } = useTranslation("main");
  const tableRef = React.useRef();
  const { open } = useDialog();

  const defaultRange = {
    startDate: moment().subtract(1, "week").toDate(),
    endDate: moment().toDate(),
    key: "selection",
  };

  const [dateRange, setDateRange] = React.useState(defaultRange);

  const showFacebookPost = async (e, data) => {
    const post = await getPostById(data.id);
    console.log("la data", post);
    const a = await open({
      Component: FacebookPostPreview,
      props: {
        post,
      },
    });

    console.log("desde el modal", a);
  };

  React.useEffect(() => {
    loadPosts({
      dateFilter: defaultRange,
    });
  }, []);

  const handleRangeDateSelect = (data) => {
    console.log("el filtrico por aqui", data);
    setDateRange(data);
    loadPosts({
      dateFilter: {
        startDate: data.startDate,
        endDate: data.endDate,
      },
    });
  };

  const configuration = {
    title: t("ondemand", { es: "Posts de facebook", en: "Facebook posts" }),
    options: {
      filtering: true,
      pageSizeOptions: [25, 50, 100],
      padding: "dense",
    },
    loading,
    data: posts,
    columns: [
      {
        field: "created_time",
        title: t("ondemand", { es: "Fecha", en: "Date" }),
        render: ({ created_time: date }) => <CustomDate {...{ date }} />,
        filtering: true,
        filterComponent: (props) => (
          <DateCustomFilter
            {...props}
            onApplyFilter={handleRangeDateSelect}
            defaultRange={dateRange}
          />
        ),
      },
      {
        width: "85%",
        field: "message",
        title: t("ondemand", { es: "Mensaje", en: "Message" }),
      },
    ],
    actions: [
      {
        icon: "refresh",
        isFreeAction: true,
        onClick: () =>
          loadPosts({
            dateFilter: {
              startDate: dateRange.startDate,
              endDate: dateRange.endDate,
            },
          }),
      },
      {
        icon: "visibility",
        onClick: showFacebookPost,
      },
    ],
  };
  return (
    <>
      <ErrorFetchingPosts
        name="Facebook"
        visible={error}
        retryAction={() => loadPosts({ dateFilter: dateRange })}
      />
      <CustomTable configuration={configuration} ref={tableRef} />
    </>
  );
};
