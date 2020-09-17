
import i18next from "i18next";
import en from "./i18n/en";
import es from "./i18n/es";
import WelcomePage from "./pages/WelcomePage";
import { WordpressPosts } from "./pages/WordpressPosts";
import { FacebookPosts } from "./pages/FacebookPosts";

i18next.addResourceBundle("en", "main", en);
i18next.addResourceBundle("es", "main", es);

export const ApplicationConfig = {
  settings: {
    layout: {
      style: 'layout1',
      config: {
        scroll: 'content',
        toolbar: {
          display: true
        },
        footer: {
          display: true
        },
        navbar: {
          display: true,
          folded: true
        }
      },
    },
  },
  auth: ['user'],
  routes: [
    {
      path: "/main",
      component: WelcomePage,
      exact: true
    },
    {
      path: "/main/preferences/",
      component: WelcomePage,
      exact: true
    },
    {
      path: "/main/wordpress/posts/",
      component: WordpressPosts,
    },
    {
      path: "/main/facebook/posts/",
      component: FacebookPosts,
    },
  ],
};

/**
 * Lazy load Example
 */
/*
import React from 'react';

export const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: React.lazy(() => import('./Example'))
        }
    ]
};
*/
