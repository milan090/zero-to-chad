import { Box, Breadcrumbs, Button, Link, Typography } from "@mui/material";
import { NextPage } from "next";
import { SideBar } from "src/client/layouts/SideBar.layout";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { ChangeEvent, useState } from "react";
import { createPost } from "src/services/post.service";
import { useUserStore } from "src/client/store/user.store";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { RegularPostInputs } from "src/types/post.types";
import { CollectionSelector } from "src/client/components/CollectionSelector.component";
import { TopicsSelector } from "src/client/components/TopicsSelector.component";

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

  const [tags, setTags] = useState<string[]>([]);

  const [collection, setCollection] = useState<null | string>(null);
  const handleCollectionChange = (value: string | null) => setCollection(value);

  const [thumpnail, setThumpnail] = useState<null | File>(null);

  const onThumbnailChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event === null) return;
    if (event.target.files !== null) {
      setThumpnail(event.target.files[0]);
    }
  };

  const handlePost: SubmitHandler<Inputs> = ({ title, content }) => {
    if (tags.length === 0) {
      return toast.error("Select atleast one tag");
    } else if (tags.length > 3) {
      return toast.error("You can select only 3 tags at maximum");
    }
    const data: RegularPostInputs = {
      type: "regular",
      title: title,
      content: content,
      authorUid: user.uid,
      authorUsername: user.username,
      image: thumpnail || null,
      collectionId: collection,
      tags,
    };
    console.log(data);
    const post = createPost(data)
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

  const appBarChildren = (
    <Breadcrumbs aria-label="breadcrumb">
      <NextLink href="/dashboard/my-posts" passHref>
        <Link underline="hover" color="inherit">
          My Posts
        </Link>
      </NextLink>
      <NextLink href="/dashboard/my-posts/create" passHref>
        <Link underline="hover" color="inherit">
          Create
        </Link>
      </NextLink>
      <NextLink href="/dashboard/my-posts/create/post" passHref>
        <Link underline="hover" color="inherit">
          Post
        </Link>
      </NextLink>

      <Typography color="text.primary">Regular</Typography>
    </Breadcrumbs>
  );

  return (
    <SideBar appBarChildren={appBarChildren}>
      <form
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "auto",
          maxWidth: 1364,
          padding: "0 2rem",
          marginTop: "2rem",
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
                  value: 100,
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
            <TopicsSelector
              label="Tags"
              handleChange={(newTags) => setTags(newTags.map((tag) => tag.id))}
            />
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
                sx={{ width: "15rem" }}
                component="span"
              >
                {thumpnail
                  ? thumpnail.name.slice(0, 25) +
                    (thumpnail?.name.length > 25 ? "..." : "")
                  : "Upload Image"}
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
          <CollectionSelector handleChange={handleCollectionChange} />
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
