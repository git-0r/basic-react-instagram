import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { appState } from "../routes/LoggedInRoutes";

export const useInfiniteScroll = () => {
  let bottomBoundryRef = useRef(null);
  const [count, setCount] = useState(0);
  const posts = useSelector((state: appState) => state.data.posts);

  const scrollObserver = useCallback(
    (node: HTMLElement) => {
      new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.intersectionRatio > 0) {
            setCount((prev) => {
              console.log(prev);
                if (posts.length - prev >= 3) {
                  console.log(posts.length - prev)
                return prev + 3;
              }
              return posts.length;
            });
          }
        });
      }).observe(node);
    },
    [posts.length]
  );

  useEffect(() => {
    if (bottomBoundryRef.current) {
      scrollObserver(bottomBoundryRef.current);
    }
  }, [scrollObserver, bottomBoundryRef]);

  return { bottomBoundryRef, count };
};
