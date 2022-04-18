import { Box, Grid, Skeleton, Typography } from "@mui/material";
import { db } from "config/firebase.config";
import { collection, doc, query, updateDoc, where } from "firebase/firestore";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { MyQuotePostCard } from "src/client/components/QuotePostCard.component";
import { MyRegularPostCard } from "src/client/components/RegularPostCard.component";
import { SideBar } from "src/client/layouts/SideBar.layout";
import { useUserStore } from "src/client/store/user.store";
import { collectionConverter } from "src/services/collection.service";
import {
  quotePostConverter,
  regularPostConverter,
} from "src/services/post.service";

const CollectionPage: NextPage = () => {
  const router = useRouter();

  const id = router.query.id as string;
  console.log("Id", id);

  if (!router.isReady)
    return (
      <SideBar>
        <div></div>
      </SideBar>
    );

  return (
    <SideBar>
      <Box
        sx={{
          maxWidth: 1200,
          margin: "auto",
          paddingX: "2rem",
          boxSizing: "content-box",
        }}
      >
        <CollectionInfo id={id} />
        <Box sx={{ marginTop: 5 }}>
          <Posts id={id} />
        </Box>
      </Box>
    </SideBar>
  );
};

const CollectionInfo: React.FC<{ id: string }> = ({ id }) => {
  const [userUid] = useUserStore((state) => [state.uid]);

  const [collectionData, collectionLoading] = useDocumentData(
    doc(db, "collection", id).withConverter(collectionConverter)
  );

  useEffect(() => {
    if (userUid) {
      updateDoc(doc(db, "users", userUid), { lastReadCollectionId: id }).catch(
        (err) => console.log(err)
      );
    }
  }, [userUid, id]);

  useEffect(() => {
    if (collectionData) {
      console.log("View++");
      updateDoc(doc(db, "collection", id), {
        views: collectionData.views + 1,
      }).catch(console.log);
    }
  }, [collectionLoading, id]);

  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", gap: 5 }}>
      {collectionLoading && (
        <Skeleton variant="rectangular" width={250} height={200} />
      )}
      {collectionData?.imageUrl && (
        <Box
          sx={{
            height: 200,
            maxWidth: 200,
            width: "100%",
            position: "relative",
          }}
        >
          <Image
            src={collectionData?.imageUrl}
            alt={collectionData?.name}
            style={{ borderRadius: "0.5rem" }}
            layout="fill"
            objectFit="cover"
          />
        </Box>
      )}
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4" fontWeight="600" textTransform="capitalize">
          {collectionLoading ? (
            <Skeleton variant="text" width="80%" />
          ) : (
            collectionData?.name
          )}
        </Typography>
        <Typography>
          {collectionLoading ? (
            <>
              <Skeleton variant="text" width="50%" />
              <Skeleton variant="text" width="50%" />
            </>
          ) : (
            collectionData?.description
          )}
        </Typography>
      </Box>
    </Box>
  );
};

const Posts: React.FC<{ id: string }> = ({ id }) => {
  const [regularPosts, regularPostsLoading] = useCollectionData(
    query(
      collection(db, "posts").withConverter(regularPostConverter),
      where("collectionId", "==", id),
      where("type", "==", "regular")
    )
  );
  const [quotePosts, quotePostsLoading] = useCollectionData(
    query(
      collection(db, "posts").withConverter(quotePostConverter),
      where("collectionId", "==", id),
      where("type", "==", "quote")
    )
  );

  const postsLoading = regularPostsLoading || quotePostsLoading;

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
        {postsLoading && (
          <Skeleton
            variant="rectangular"
            height={300}
            sx={{ borderRadius: "!rem" }}
          />
        )}
        {!postsLoading &&
          !!quotePosts &&
          quotePosts.map((post) => <MyQuotePostCard {...post} key={post.id} />)}
      </Grid>
    </Grid>
  );
};

export default CollectionPage;
