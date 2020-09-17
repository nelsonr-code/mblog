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
  const [paging, setPaging] = React.useState({
    previous: null,
    next: null,
    currentPage: 0,
  });
  const [lastUrlWithData, setLastUrlWithData] = React.useState(null);

  const loadPosts = (query) => {
    let dataSource = mainService.getFacebookPosts;
    let params = user.id;

    if (query.page < paging.currentPage) {
      dataSource = mainService.getFacebookPostsFromUrl;
      params = paging.previous || lastUrlWithData;
    } else if (query.page > paging.currentPage) {
      dataSource = mainService.getFacebookPostsFromUrl;
      params = paging.next;
    }

    return dataSource(params)
      .then(({ data, paging = { previous: "", next: "" } }) => {
        setPosts(data);
        if (data.length) {
          setLastUrlWithData(params);
        }
        setPaging((currentState) => ({
          ...currentState,
          previous: paging.previous,
          next: paging.next,
          currentPage: query.page,
        }));
        return {
          data,
          totalCount: paging.next
            ? query.pageSize * (query.page + 2)
            : query.pageSize * (query.page + 1),
          page: query.page,
        };
      })
      .catch((err) => {
        console.log("error fetching posts", err);
        isMountedRef.current && setError(true);
        return {
          data: [],
          totalCount: 0,
          page: query.page,
        };
      });
  };

  const getPostById = postId => {
    return mainService.getFacebookPostById(user.id, postId)
      .then(r => {
        console.log("el post by Id", r);
        return r;
      });
  }

  const repostToWordpress = (data) => {
    console.log("lo que tengo que repostear", data);
    mainService.postToWordpress(user.id, {
      wordpressConfig: {
        title: data.message,
        attachments: data.attachments
      }
    })
      .then(r => r.data)
      .then(r => {
        console.log("respuesta de publicacion en wordpress", r);
      })
      .catch(err => {
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
