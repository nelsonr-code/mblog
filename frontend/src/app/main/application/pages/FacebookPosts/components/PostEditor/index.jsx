import React from "react";
import { TextField, FormGroup, Grid, TextareaAutosize } from "@material-ui/core";
import { useTranslation } from "react-i18next";

export const PostEditor = (props) => {
  const { t } = useTranslation("main");
  return (
    <Grid container>
      <Grid item xs={12}>
        <FormGroup>
          <TextareaAutosize
            label={t('ondemand', {es: 'Titulo', en: 'Title'})}
            value={props.title}
            onChange={(e) => props.onChangeTitle(e.target.value)}
            variant="outlined"
            rowsMin={5}
            rowsMax={5}
            style={{
              resize: 'none',
              border: 'solid 1px',
              padding: '10px'
            }}
            // InputProps={{
            //   inputComponent: "textarea",
            //   rowsMax: 50,
            //   rowsMin: 50,
            //   style: {
            //     resize: 'none'
            //   }
            // }}
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};
