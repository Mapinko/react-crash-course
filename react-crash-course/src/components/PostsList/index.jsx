import React, { useState } from 'react';
import Modal from '../Modal';
import NewPost from '../NewPost';
import Post from '../Post';
import classes from './PostsList.module.css';
function PostsList({isPosting, onModalHandler, onStopPosting}) {

   const [posts, setPosts] = useState([]);

   function addPostHandler(postData) {
      setPosts((existingPosts) => {
         return [postData, ...existingPosts];
      });
   }

   let modalContent

   if (isPosting) {
      modalContent = (
         <Modal onClose={onModalHandler}>
            <NewPost
               onCancel={onModalHandler}
               onAddPost={addPostHandler}
            />
         </Modal>
      )

   }
   return (
      <>
         {modalContent}

         <ul className={classes.posts}>
            {posts.map((post, index) => (
               <Post key={index}  author={post.author} body={post.body}/>
            ))}
         </ul>
      </>
   );
}

export default PostsList;
