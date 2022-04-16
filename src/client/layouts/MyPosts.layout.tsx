import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

import { fetchUserPosts } from "src/services/post.service";
import { QuotePost, RegularPost } from "src/types/post.types";
import { useUserStore } from "../store/user.store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const MyRegularPostCard: React.FC<RegularPost> = ({
  title,
  content,
  imageUrl,
}) => {
  return (
    <Card
      sx={{
        borderRadius: "0.5rem",
        flexGrow: 2,
        boxShadow: "0px 5px 18px rgba(247, 147, 34, 0.32)",
      }}
    >
      <CardContent sx={{ padding: 0 }}>
        {imageUrl && (
          <Box sx={{ height: 130, position: "relative", width: "100%" }}>
            <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
          </Box>
        )}

        <Box sx={{ padding: "1rem" }}>
          <Typography fontWeight="600">{title}</Typography>
          <Typography paragraph sx={{ paddingTop: 1 }}>
            {content}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const MyQuotePostCard: React.FC<QuotePost> = ({
  author,
  imageUrl,
  content,
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        position: "relative",
        borderRadius: "0.5rem",
        boxShadow: "0px 5px 18px rgba(247, 147, 34, 0.32)",
      }}
    >
      <CardContent sx={{ display: "flex" }}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            width={120}
            height={120}
            alt={author}
            style={{ borderRadius: "50%" }}
          />
        ) : (
          <AccountCircleIcon width={120} height={120} />
        )}

        <Box
          sx={{
            textAlign: "center",
            float: "right",
            width: 250,
            marginLeft: 5,
            marginTop: 1,
          }}
        >
          <Typography fontWeight="400" fontStyle="italic">
            {" "}
            “{content}”{" "}
          </Typography>
          <Typography fontWeight="600" sx={{ marginTop: 1 }}>
            {author}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

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
    <Grid container columnSpacing={5} sx={{ marginTop: "1rem" }}>
      <Grid item xs={7} sx={{ display: "flex", flexDirection: "column" }}>
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
      <Grid item xs={5}>
        {!postsLoading &&
          !!quotePosts &&
          quotePosts.map((post) => <MyQuotePostCard {...post} key={post.id} />)}
      </Grid>
    </Grid>
  );
};
