import {
  Box,
  Button,
  Card,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/material";
import { db } from "config/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Rectangle3 } from "src/icons";
import { collectionConverter } from "src/services/collection.service";
import { CollectionData } from "src/types/collection.types";
import { useUserStore } from "../store/user.store";

export const LastReadCollection: React.FC = () => {
  const [lastReadCollectionId, loading] = useUserStore((state) => [
    state.lastReadCollectionId,
    state.loading,
  ]);
  const [collectionData, setCollectionData] = useState<CollectionData>();
  const [collectionLoading, setCollectionLoading] = useState(false);

  useEffect(() => {
    if (lastReadCollectionId) {
      setCollectionLoading(true);
      getDoc(
        doc(db, "collection", lastReadCollectionId).withConverter(
          collectionConverter
        )
      )
        .then((snapshot) => {
          const data = snapshot.data();
          setCollectionData(data);
        })
        .finally(() => {
          setCollectionLoading(false);
        });
    }
  }, [lastReadCollectionId]);

  if (loading || collectionLoading) {
    return <Skeleton variant="rectangular" width="70%" height={80} />;
  }
  if (!collectionData) {
    return <></>;
  }
  return (
    <>
      <Typography variant="h4" fontWeight="600" sx={{ paddingTop: 3 }}>
        You were reading
      </Typography>

      <Card
        sx={{
          position: "relative",
          width: 671,
          height: 146,
          marginTop: 3,
          borderRadius: 4,
        }}
      >
        <Box sx={{ display: "flex" }}>
          {collectionData?.imageUrl ? (
            <Box
              sx={{
                height: 146,
                width: "100%",
                maxWidth: 120,
                position: "relative",
              }}
            >
              <Image
                src={collectionData?.imageUrl}
                alt={collectionData?.name}
                layout="fill"
                objectFit="cover"
              />
            </Box>
          ) : (
            <Rectangle3 />
          )}

          <CardContent sx={{ right: 100, bottom: 50 }}>
            <Typography variant="h6" fontWeight="600">
              {collectionData?.name}
            </Typography>
            <Typography paragraph sx={{ width: 477 }}>
              {collectionData?.description}
            </Typography>
            <Link
              passHref
              href={`/dashboard/explore/collection/${lastReadCollectionId}`}
            >
              <Button
                sx={{
                  width: 120,
                  height: 31,
                  float: "right",
                  left: 10,
                  marginTop: -1,
                }}
                variant="contained"
              >
                Continue...
              </Button>
            </Link>
          </CardContent>
        </Box>
      </Card>
    </>
  );
};
