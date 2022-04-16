import { Box, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchUserCollections } from "src/services/collection.service";
import { CollectionData } from "src/types/collection.types";
import { CollectionCard } from "../components/CollectionCard.component";
import { useUserStore } from "../store/user.store";

export const MyCollections: React.FC = () => {
  const [userUid] = useUserStore(({ uid }) => [uid]);

  const [collections, setCollections] = useState<CollectionData[]>([]);
  const [collectionsLoading, setCollectionsLoading] = useState(true);

  useEffect(() => {
    if (userUid) {
      fetchUserCollections(userUid)
        .then((res) => {
          setCollections(res);
          setCollectionsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [userUid]);

  return (
    <Box display="flex" columnGap={4}>
      {collectionsLoading &&
        [1, 2, 3].map((i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            width={250}
            height={350}
            sx={{ borderRadius: "1rem" }}
          />
        ))}
      {collections &&
        collections.map((collection) => (
          <CollectionCard key={collection.id} {...collection} />
        ))}
    </Box>
  );
};
