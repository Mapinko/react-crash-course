import { useState } from 'react';
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

         {
            posts.length > 0 && (
               <ul className={classes.posts}>
                     {posts.map((post, index) => (
                        <Post key={index} author={post.author} body={post.body} />
                     ))}
               </ul>
            ) 
         }
         { posts.length === 0 &&
            (   <div className={classes.noPosts}>
                  <h2>There are no posts yet.</h2>
                  <p>Start adding some!</p>
               </div>)
         }
            
            )
      </>
   );
}

export default PostsList;
