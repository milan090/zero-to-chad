import { Box, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import { RegularPost } from "src/types/post.types";

export const MyRegularPostCard: React.FC<RegularPost> = ({
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
          <Box sx={{ height: 200, position: "relative", width: "100%" }}>
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
