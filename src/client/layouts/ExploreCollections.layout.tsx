import { Box, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchCollections } from "src/services/collection.service";
import { CollectionData } from "src/types/collection.types";
import { CollectionCard } from "../components/CollectionCard.component";
import { useUserStore } from "../store/user.store";

export const ExploreCollections: React.FC = () => {
  const [userUid, topics] = useUserStore(({ uid, topics }) => [uid, topics]);

  const [collections, setCollections] = useState<CollectionData[]>([]);
  const [collectionsLoading, setCollectionsLoading] = useState(true);

  useEffect(() => {
    if (userUid) {
      fetchCollections(topics)
        .then((res) => {
          console.log(res);
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
