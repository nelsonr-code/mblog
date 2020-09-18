import React from "react";
import { useUser } from "./useUser";
import mainService from "app/services/mainService";
import { useIsMounted } from "./useIsMounted";

export const useFacebookHelper = () => {
  const user = useUser();
  const [posts, setPosts] = React.useState([]);
  const isMountedRef = useIsMounted();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const loadPosts = ({ dateFilter }) => {

    setLoading(true);
    setError(null);
    console.log("en loadPosts", dateFilter);
    const query = `?since=${ Math.floor(dateFilter.startDate.getTime()/1000) }&until=${ Math.floor(dateFilter.endDate.getTime()/1000) }`;
    console.log(query);
    return mainService
      .getFacebookPosts(user.id, query)
      .then(({ data }) => {
        setPosts(data);
      })
      .catch((err) => {
        console.log("error fetching posts", err);
        isMountedRef.current && setError(true);
        setPosts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getPostById = (postId) => {
    return mainService.getFacebookPostById(user.id, postId).then((r) => {
      console.log("el post by Id", r);
      return r;
    });
  };

  const repostToWordpress = (data) => {
    console.log("lo que tengo que repostear", data);
    mainService
      .postToWordpress(user.id, {
        wordpressConfig: {
          title: data.message,
          attachments: data.attachments,
        },
      })
      .then((r) => r.data)
      .then((r) => {
        console.log("respuesta de publicacion en wordpress", r);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return {
    loadPosts,
    getPostById,
    posts,
    error,
    loading,
    repostToWordpress,
  };
};
