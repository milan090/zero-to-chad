import { Grid, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchUserPosts } from "src/services/post.service";
import { QuotePost, RegularPost } from "src/types/post.types";
import { useUserStore } from "../store/user.store";

import { MyRegularPostCard } from "../components/RegularPostCard.component";
import { MyQuotePostCard } from "../components/QuotePostCard.component";

export const MyPosts: React.FC = () => {
  const [userUid] = useUserStore(({ uid }) => [uid]);
  const [regularPosts, setRegularPosts] = useState<RegularPost[]>([]);
  const [quotePosts, setQuotePosts] = useState<QuotePost[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);

  useEffect(() => {
    if (userUid) {
      fetchUserPosts(userUid).then(({ regularPosts, quotePosts }) => {
        setRegularPosts(regularPosts);
        setQuotePosts(quotePosts);
        setPostsLoading(false);
      });
    }
  }, [userUid]);

  return (
    <Grid
      container
      columnSpacing={5}
      sx={{ marginTop: "1rem", maxWidth: 1150 }}
    >
      <Grid
        item
        xs={6}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        {postsLoading && (
          <Skeleton
            variant="rectangular"
            height={300}
            sx={{ borderRadius: "!rem" }}
          />
        )}
        {!postsLoading &&
          !!regularPosts &&
          regularPosts.map((post) => (
            <MyRegularPostCard {...post} key={post.id} />
          ))}
      </Grid>
      <Grid
        item
        xs={6}
        sx={{ display: "flex", flexDirection: "column", gap: 5 }}
      >
        {!postsLoading &&
          !!quotePosts &&
          quotePosts.map((post) => <MyQuotePostCard {...post} key={post.id} />)}
      </Grid>
    </Grid>
  );
};
