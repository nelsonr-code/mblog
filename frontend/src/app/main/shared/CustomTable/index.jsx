import React from "react";
import MaterialTable from "material-table";

const defaultOptions = {
  showTitle: false,
  search: false,
  actionsColumnIndex: -1,
  pageSize: 25,
  pageSizeOptions: [25, 50, 100],
  maxBodyHeight: "350px",
  thirdSortClick: false,
  emptyRowsWhenPaging: false,
  loadingType: 'linear'
};

export const CustomTable = ({ configuration }) => {
  return (
    <MaterialTable
      data={configuration.data}
      columns={configuration.columns}
      actions={[ ...configuration.actions]}
      options={{ ...defaultOptions, ...(configuration.options || {}) }}
      isLoading={configuration.isLoading === true}
    />
  );
};
