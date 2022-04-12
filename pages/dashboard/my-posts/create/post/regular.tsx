import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { SideBar } from "src/client/layouts/SideBar.layout";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { ChangeEvent, useState } from "react";
import { createRegularPost, RegularPostData } from "src/services/post.service";
import { useUserStore } from "src/client/store/user.store";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const collections = ["None", "Rick Astley", "Rick and Morty"];

type Inputs = {
  title: string;
  content: string;
};

const CreateRegularPostPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const user = useUserStore(({ uid, username }) => ({ uid, username }));
  const router = useRouter();

  const [collection, setCollection] = useState("");
  const handleCollectionChange = (event: SelectChangeEvent<string>) =>
    setCollection(event.target.value === "None" ? "" : event.target.value);

  const [thumpnail, setThumpnail] = useState<null | File>(null);

  const onThumbnailChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event === null) return;
    if (event.target.files !== null) {
      setThumpnail(event.target.files[0]);
    }
  };

  const handlePost: SubmitHandler<Inputs> = ({ title, content }) => {
    const data: RegularPostData = {
      type: "regular",
      title: title,
      content: content,
      authorUid: user.uid,
      authorUsername: user.username,
      image: thumpnail || null,
      collectionId: collection,
    };
    console.log(data);
    const post = createRegularPost(data)
      .then((id) => {
        console.log(id);
        router.push("/dashboard/my-posts");
      })
      .catch((err) => console.log(err));
    toast.promise(post, {
      loading: "Creating Post...",
      success: <b>Post created!</b>,
      error: <b>Failed to post.</b>,
    });
  };

  return (
    <SideBar>
      <form
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
        onSubmit={handleSubmit(handlePost)}
      >
        <Box>
          <Typography variant="h4" fontWeight="600">
            Create Post
          </Typography>

          {/* Input boxes go here */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "background.paper",
              p: "1.5rem 1.5rem 3rem 1.5rem",
              marginTop: "1rem",
              borderRadius: "1rem",
              maxWidth: "44rem",
            }}
          >
            <input
              type="text"
              placeholder="Title goes here"
              style={{
                fontSize: "2rem",
                fontWeight: "500",
                border: "none",
                fontFamily: "Inter",
                outline: "none",
              }}
              {...register("title")}
            />
            <textarea
              id="content"
              // cols={30}
              rows={10}
              placeholder="Content goes here"
              style={{
                border: "none",
                outline: "none",
                fontFamily: "Inter",
                marginTop: "1.5rem",
                marginLeft: "0.25rem",
                fontSize: "1rem",
                width: "100%",
                // height: "25rem",
                resize: "none",
              }}
              {...register("content", {
                minLength: {
                  value: 50,
                  message: "Content should be atleast 50 characters long",
                },
                maxLength: {
                  value: 500,
                  message: "Content shouldn't be longer than 500 characters",
                },
              })}
            />
            <Typography color="error" variant="caption">
              {errors.content?.message}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              marginBottom: "4rem",
            }}
          >
            <label htmlFor="upload-photo">
              <input
                accept="image/*"
                id="upload-photo"
                style={{ display: "none" }}
                type="file"
                onChange={onThumbnailChange}
              />
              <Button
                variant="contained"
                color="primary"
                endIcon={<AddPhotoAlternateOutlinedIcon />}
                sx={{ width: "100%" }}
                component="span"
              >
                {thumpnail?.name || "Upload Image"}
              </Button>
            </label>
            <br />
            <Typography
              variant="caption"
              fontStyle="italic"
              sx={{ float: "right" }}
            >
              Optional
            </Typography>
          </Box>
          <FormControl fullWidth sx={{ width: "15rem" }}>
            <InputLabel
              id="demo-simple-select-label"
              sx={{
                // color: "grey !important",
                backgroundColor: "background.default",

                "&.MuiInputLabel-shrink": {
                  color: "grey",

                  "&.Mui-focused": {
                    color: "black",
                  },
                },
              }}
            >
              Collection
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={collection}
              label="Age"
              onChange={handleCollectionChange}
              sx={{
                width: "100%",
                "	&.MuiOutlinedInput-notchedOutline": {
                  color: "black",
                },
              }}
            >
              {collections.map((collection) => (
                <MenuItem value={collection} key={collection}>
                  {collection}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: "auto", marginLeft: "auto", width: "10rem" }}
          >
            Post
          </Button>
        </Box>
      </form>
    </SideBar>
  );
};

export default CreateRegularPostPage;