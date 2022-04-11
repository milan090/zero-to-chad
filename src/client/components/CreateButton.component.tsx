import { Box, Button, Modal, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DocumentIcon from "public/images/dashboard/carbon_document.svg";
import CollectionIcon from "public/images/dashboard/fluent_collections-20-regular.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90vh",
  bgcolor: "background.default",
  p: 4,
};

export const CreateButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="contained"
        color="info"
        sx={{
          fontWeight: "500",
          borderRadius: "0.5rem",
          fontSize: "1.1rem",
          py: "0.25rem",
        }}
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Create
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              gap: "5rem",
              justifyContent: "center",
              marginTop: "7rem",
              flexWrap: "wrap",
            }}
          >
            <Paper
              sx={{
                p: "3rem 2rem 3rem 2rem",
                maxWidth: "20rem",
                minWidth: "10rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "1rem",
                position: "relative",
              }}
            >
              <Box sx={{ position: "absolute", top: "-3rem" }}>
                <DocumentIcon />
              </Box>
              <Typography fontWeight="600" variant="h5">
                Post
              </Typography>
              <Typography
                textAlign="center"
                sx={{ marginTop: "0.25rem", marginBottom: "1rem" }}
              >
                Lorem ipsum some stuff like that goes here lorem ipsum okay, I
                am too lazy to find lorem ipsum so ill just type some shitz here
              </Typography>
              <Button
                variant="contained"
                color="info"
                sx={{ borderRadius: "0.5rem" }}
              >
                Create
              </Button>
            </Paper>

            <Paper
              sx={{
                p: "3rem 2rem 3rem 2rem",
                maxWidth: "20rem",
                minWidth: "10rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "1rem",
                position: "relative",
              }}
            >
              <Box sx={{ position: "absolute", top: "-3rem" }}>
                <CollectionIcon />
              </Box>
              <Typography fontWeight="600" variant="h5">
                Collection
              </Typography>
              <Typography
                textAlign="center"
                sx={{ marginTop: "0.25rem", marginBottom: "1rem" }}
              >
                Lorem ipsum some stuff like that goes here lorem ipsum okay, I
                am too lazy to find lorem ipsum so ill just type some shitz here
              </Typography>
              <Button
                variant="contained"
                color="info"
                sx={{ borderRadius: "0.5rem" }}
              >
                Create
              </Button>
            </Paper>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
