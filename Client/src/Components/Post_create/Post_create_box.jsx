import { useEffect, useState } from "react";
import { styled } from "styled-components";
import {
  Avatar,
  Button,
  Input,
  LoadingOverlay,
  Modal,
  MultiSelect,
  Textarea,
} from "@mantine/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Content from "./Content";
import { setCreatePost } from "../../Redux/Slices/publicPostsSlice";
import {
  picUpdatingModal,
  resetChangedPicUrl,
} from "../../Redux/Slices/authSlice";
import Change_pic from "../Profile/Change_pic";

const Post_create_box = () => {
  const { isCreatingPost, postModelType, createPost } = useSelector(
    (state) => state.publicPosts
  );
  const { user, isChangingPicUrl, changedPicUrl } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetChangedPicUrl());
  }, []);

  useEffect(() => {
    if (changedPicUrl) {
      dispatch(setCreatePost({ ...createPost, bannerPic: changedPicUrl }));
    }
  }, [changedPicUrl]);

  const openUpdatingBannerPicModal = () => {
    dispatch(picUpdatingModal(true));
  };

  const closeUpdatingBannerPicModal = () => {
    dispatch(picUpdatingModal(false));
  };

  const [data, setData] = useState([
    "React",
    "Angular",
    "Vue",
    "Svelte",
    ...createPost.tags,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setCreatePost({ ...createPost, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postModelType === "CREATE_POST")
      dispatch({ type: "CREATE_POST", data: createPost });
    else if (postModelType === "EDIT_POST")
      dispatch({ type: "EDIT_POST", data: { _id: user._id, createPost } });
  };

  return (
    <Container>
      <Modal
        opened={isChangingPicUrl}
        onClose={closeUpdatingBannerPicModal}
        title='Change Banner Picture'
      >
        <Change_pic />
      </Modal>
      <Left>
        <LoadingOverlay
          visible={isCreatingPost}
          overlayBlur={2}
        />
        <BOX onSubmit={handleSubmit}>
          <label>Banner Picture</label>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Avatar
              color='blue'
              src={createPost.bannerPic}
              size={80}
            />
            <Button onClick={openUpdatingBannerPicModal}>Upload Banner</Button>
          </div>
          <label>Title</label>
          <Input
            className='title'
            placeholder='Title of the Your Post'
            type='text'
            value={createPost.title}
            name='title'
            onChange={handleChange}
            required
          />
          <label>Tags</label>
          <MultiSelect
            data={data}
            defaultValue={createPost.tags}
            placeholder='Select Tags'
            searchable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
              const item = { value: query, label: query };
              setData((current) => [...current, item]);
              return item;
            }}
            size='md'
            rightSectionWidth={1}
            maxDropdownHeight={160}
            onChange={(value) => {
              dispatch(setCreatePost({ ...createPost, tags: value }));
            }}
          />
          <label>Description <a href="https://github.com/pradeepkumar24rk/i-community/blob/main/CreateBlogHelp.md" target="_blank">How to write blog? </a></label>
          <Textarea
            value={createPost.content}
            onChange={(e) =>
              dispatch(setCreatePost({ ...createPost, content: e.target.value }))
            }
            placeholder="Write your post content here..."
          />
          <input
            className='submit'
            type='submit'
            value={postModelType === "EDIT_POST" ? "Edit Post" : "Publish"}
          />
        </BOX>
      </Left>
      <Right>
        <h1>Description Preview</h1>
        <Content {...createPost} />
      </Right>
    </Container>
  );
};

export default Post_create_box;

const Container = styled.div`
  display: flex;
  gap: 20px;
  height: calc(100vh - 12vh);
  padding: 10px;
  box-sizing: border-box;
`;

const Left = styled.div`
  flex: 1;
  height: 100%;
  overflow-y: auto;
  `;

const BOX = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  .mantine-Textarea-root {
    display: flex;
    flex: 1;
  }
  .mantine-Textarea-wrapper {
    display: flex;
    width: 100%;
  }
  
  .mantine-Textarea-input {
   
  }

  .submit {
    margin: 0px auto;
    background: var(--primary_color);
    border: 0px;
    border-radius: 5px;
    padding: 10px 20px;
    color: white;
    cursor: pointer;
    &:hover {
      background: var(--secondary_color);
    }
  }
`;

const Right = styled.div`
  flex: 1;
  height: 100%;
  overflow-y: auto;
`;
