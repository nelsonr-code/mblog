import React from "react";
import { useUser } from "./useUser";
import mainService from "app/services/mainService";
import { useIsMounted } from "./useIsMounted";

export const useWordpressHelper = () => {
  const user = useUser();
  const [posts, setPosts] = React.useState([]);
  const isMountedRef = useIsMounted();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const loadPosts = () => {
    setLoading(true);
    return mainService
      .getWordpressPosts(user.id)
      .finally(() => isMountedRef.current && setLoading(false));
  };

  const refreshPosts = () => {
    setError(false);
    return loadPosts()
      .then((posts) => isMountedRef.current && setPosts(posts))
      .catch((err) => {
        console.log("error fetching posts", err);
        isMountedRef.current && setError(true);
      });
  };

  const register = (blogUrl, blogKey) => {
    return mainService.wordpressAuth(blogUrl, blogKey, user.id)
      .then(r => {
        console.log("respuesta del servicio", r);
        return r;
      });
  };

  return {
    refreshPosts,
    posts,
    error,
    loading,
    register
  };
};
