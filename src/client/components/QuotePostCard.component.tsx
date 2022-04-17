import { Box, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import { QuotePost } from "src/types/post.types";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const MyQuotePostCard: React.FC<QuotePost> = ({
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
      <CardContent sx={{ display: "flex", width: "100%" }}>
        {imageUrl ? (
          <Box
            sx={{
              height: "120px",
              width: "100%",
              maxWidth: 120,
              position: "relative",
            }}
          >
            <Image
              src={imageUrl}
              alt={author}
              style={{ borderRadius: "50%" }}
              layout="fill"
              objectFit="cover"
            />
          </Box>
        ) : (
          <AccountCircleIcon width={120} height={120} />
        )}

        <Box
          sx={{
            textAlign: "center",
            float: "right",
            marginTop: "1rem",
            flexGrow: 1,
            paddingX: "1rem",
          }}
        >
          <Typography fontWeight="400" fontStyle="italic">
            {" "}
            “{content}”{" "}
          </Typography>
          <Typography fontWeight="600" variant="h5" sx={{ marginTop: 1 }}>
            {author}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
