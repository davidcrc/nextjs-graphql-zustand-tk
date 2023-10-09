"use client";

import React, { useCallback, useEffect } from "react";
import { useGetPostsQuery } from "@/graphql/generated/graphql";
import { PostFeed } from "@/components";

function Feed() {
  const loadMoreRef = React.useRef<HTMLDivElement>(null);

  const { data, loading, fetchMore } = useGetPostsQuery({
    variables: { skip: 0, take: 2 },
  });

  const loadMorePosts = useCallback(async () => {
    try {
      await fetchMore({
        variables: {
          skip: data?.getPosts.length || 0,
          take: 2,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          const newPosts = fetchMoreResult.getPosts.filter(
            (newPost) => !prev.getPosts.some((post) => post.id === newPost.id)
          );
          return {
            getPosts: [...prev.getPosts, ...newPosts],
          };
        },
      });
      // console.log(data);
    } catch (error) {
      console.error("Error fetching more posts:", error);
    }
  }, [data, fetchMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("Observer triggered");
          loadMorePosts();
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMorePosts]);

  // console.log(data?.getPosts);

  return (
    <div className="pt-[80px] sm:w-[calc(100%-90px)] max-w-[690px] ">
      {data?.getPosts.map((post, index: number) => (
        <PostFeed key={index} post={post} />
      ))}
      <div className="h-20" ref={loadMoreRef}></div>
    </div>
  );
}

export default Feed;
