import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import { HeartIcon, ViewsIcon } from "src/icons";
import { CollectionData } from "src/types/collection.types";

export const CollectionCard: React.FC<CollectionData> = ({
  imageUrl,
  name,
  views,
  likes,
}) => {
  return (
    <Box display="flex">
      <Card
        sx={{
          width: 256,
          height: 350,
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {imageUrl && (
          <Box sx={{ height: 130, position: "relative", width: "100%" }}>
            <Image src={imageUrl} alt={name} layout="fill" objectFit="cover" />
          </Box>
        )}
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <Typography fontWeight="600">Stress Management for Noobs</Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{ marginTop: "auto" }}
          >
            <Box>
              <Typography>
                <ViewsIcon /> {views}
              </Typography>
              <Typography>
                <HeartIcon /> {likes}
              </Typography>
            </Box>

            <Button
              variant="contained"
              sx={{
                bgcolor: "#79766E",
                color: "#FFFFFF",
                width: 72,
                height: 36,
                borderRadius: 2,
                marginTop: "auto",
              }}
            >
              View
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
