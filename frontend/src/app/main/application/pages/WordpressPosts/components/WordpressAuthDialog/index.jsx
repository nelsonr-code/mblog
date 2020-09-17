import React from "react";
import {
  FormGroup,
  Box,
  Button,
  Grid,
  TextField,
  DialogContent,
  DialogActions,
  Typography,
  DialogTitle,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import WordpressIcon from "app/main/shared/SocialIcons/WordpressIcon";
import { useWordpressHelper } from "app/hooks/useWordpressHelper";
import Alert from "@material-ui/lab/Alert";

export const WordpressAuthDialog = ({ userId, close }) => {
  const { t } = useTranslation("main");
  const { register } = useWordpressHelper();
  const [error, setError] = React.useState(false);

  const [blogCredentials, setBlogCredentials] = React.useState({
    blogUrl: "",
    blogKey: "",
  });

  const update = ({ name, value }) => {
    setError(false);
    setBlogCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(blogCredentials.blogUrl, blogCredentials.blogKey)
      .then(() => close("ok"))
      .catch((err) => {
        console.log("el error", err.message);
        setError(true);
      });
  };

  return (
    <React.Fragment>
      {error && (
        <Alert severity="error">
          {t("ondemand", {
            es: "Error al verificar credenciales",
            en: "Error checking credentials",
          })}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <WordpressIcon />
            <Box ml={1}>
              <Typography color="primary" variant="subtitle1">
                {t("ondemand", {
                  es: "Credenciales de acceso al blog de wordpress",
                  en: "Wordpress blog access credentials.",
                })}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormGroup>
                <TextField
                  autoComplete="new-password"
                  required
                  margin="dense"
                  variant="outlined"
                  value={blogCredentials.blogUrl}
                  label={t("ondemand", { es: "Url del blog", en: "Blog url" })}
                  onChange={(e) => update(e.target)}
                  name="blogUrl"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <TextField
                autoComplete="new-password"
                  required
                  margin="dense"
                  variant="outlined"
                  type="password"
                  value={blogCredentials.blogKey}
                  label={t("ondemand", {
                    es: "Llave del blog",
                    en: "Blog key",
                  })}
                  onChange={(e) => update(e.target)}
                  name="blogKey"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Grid container>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <Box mr={1}>
                  <Button size="small" color="primary" onClick={e => close()}>
                    {t("ondemand", { es: "Cancelar", en: "Cancel" })}
                  </Button>
                </Box>
                <Box>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    type="submit"
                  >
                    {t("ondemand", { es: "Conectar", en: "Connect" })}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </React.Fragment>
  );
};
