import i18next from "i18next";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";
import ar from "./navigation-i18n/ar";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);

const navigationConfig = [
  {
    id: "applications",
    title: "Applications",
    translate: "APPLICATIONS",
    type: "group",
    icon: "apps",
    children: [
      {
        id: "main-component",
        title: "Main",
        translate: "MAIN",
        type: "item",
        icon: "whatshot",
        url: "/main/",
        exact: true
      },
      {
        id: "preferences",
        title: "Preferences",
        translate: "PREFERENCES",
        type: "item",
        icon: "settings",
        url: "/main/preferences/",
      },
    ],
  },
];

export default navigationConfig;
