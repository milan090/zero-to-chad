import { Box, Skeleton, Typography } from "@mui/material";
import { db } from "config/firebase.config";
import { collection, orderBy, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { postConverter } from "src/services/post.service";
import { useUserStore } from "../store/user.store";
import { Post } from "src/types/post.types";
import { MyRegularPostCard } from "../components/RegularPostCard.component";
import { MyQuotePostCard } from "../components/QuotePostCard.component";
import { AccountCircle } from "@mui/icons-material";
import { PostLikeButton } from "../components/LikeButton.component";

export const RecommendedPosts: React.FC = () => {
  const [topics, userLoading] = useUserStore((state) => [
    state.topics,
    state.loading,
  ]);

  if (userLoading) {
    return <Skeleton variant="rectangular" width={500} height={300} />;
  }
  return <RecommendedPostsList topics={topics} />;
};

const RecommendedPostsList: React.FC<{ topics: string[] }> = ({ topics }) => {
  const [posts, loading, error] = useCollectionData(
    query(
      collection(db, "posts").withConverter(postConverter),
      where("tags", "array-contains-any", topics),
      orderBy("likes", "desc")
    )
  );

  if (loading) {
    console.log("loading posts");
    return <Skeleton variant="rectangular" width={500} height={300} />;
  }

  if (!posts) {
    console.log(error);
    return <Box>Error</Box>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "4rem" }}>
      {posts.map((post) => {
        return <PostCard {...post} key={post.id} />;
      })}
    </Box>
  );
};

const PostCard: React.FC<Post> = (post) => {
  return (
    <Box
      sx={{
        maxWidth: 850,
        width: "100%",
        display: "flex",
        alignItems: "stretch",
      }}
    >
      <Box sx={{ flexGrow: 1, maxWidth: "70%" }}>
        {post.type === "regular" ? (
          <MyRegularPostCard {...post} />
        ) : (
          <MyQuotePostCard {...post} />
        )}
      </Box>

      <Box
        sx={{
          width: "30%",
          marginY: "1rem",
          borderRadius: "0 0.5rem 0.5rem 0",
          backgroundColor: "secondary.500",
          padding: "1rem",
          boxSizing: "border-box",
        }}
      >
        <Box display="flex" gap={1} alignItems="center">
          <AccountCircle sx={{ color: "grey.600", width: 40, height: 40 }} />
          <Typography color="grey.700">@{post.authorUsername}</Typography>
        </Box>
        <Box display="flex" gap={3}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
            sx={{ marginLeft: "0.25rem", marginTop: "1rem" }}
          >
            {/* <HeartIcon sx={{ color: "red", width: 45, height: 45 }} /> */}
            <PostLikeButton id={post.id} />
            <Typography color="grey.700">{post.likes}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
