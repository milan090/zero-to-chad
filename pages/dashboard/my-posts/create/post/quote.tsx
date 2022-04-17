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
import { QuotePostInputs } from "src/types/post.types";
import { TopicsSelector } from "src/client/components/TopicsSelector.component";
import { CollectionSelector } from "src/client/components/CollectionSelector.component";

type Inputs = {
  author: string;
  content: string;
};

const CreateQuotePage: NextPage = () => {
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

  const handlePost: SubmitHandler<Inputs> = ({ author, content }) => {
    if (tags.length === 0) {
      return toast.error("Select atleast one tag");
    } else if (tags.length > 3) {
      return toast.error("You can select only 3 tags at maximum");
    }
    const data: QuotePostInputs = {
      type: "quote",
      author,
      content,
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
      success: <b>Posted succesfully!</b>,
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

      <Typography color="text.primary">Quote</Typography>
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
            Create Quote
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
            }}
          >
            <textarea
              id="content"
              cols={40}
              rows={10}
              placeholder="Content goes here"
              style={{
                border: "none",
                outline: "none",
                fontFamily: "Inter",
                marginLeft: "0.25rem",
                fontSize: "1.1rem",
                width: "100%",
                // height: "25rem",
                resize: "none",
              }}
              {...register("content", {
                minLength: {
                  value: 10,
                  message: "Content should be atleast 50 characters long",
                },
                maxLength: {
                  value: 200,
                  message: "Content shouldn't be longer than 500 characters",
                },
              })}
            />
            <input
              type="text"
              placeholder="Author"
              style={{
                fontSize: "2rem",
                fontWeight: "500",
                border: "none",
                fontFamily: "Inter",
                outline: "none",
                textAlign: "center",
              }}
              {...register("author")}
            />
            <Typography color="error" variant="caption">
              {errors.content?.message}
            </Typography>
            <Box sx={{ marginTop: "2rem" }}>
              <TopicsSelector
                label="Tags"
                handleChange={(newTags) =>
                  setTags(newTags.map((tag) => tag.id))
                }
              />
            </Box>
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
                {thumpnail?.name || "Upload Image (of Author)"}
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

export default CreateQuotePage;
