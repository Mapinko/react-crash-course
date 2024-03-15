import { useEffect, useState } from 'react';
import Modal from '../Modal';
import NewPost from '../NewPost';
import Post from '../Post';
import classes from './PostsList.module.css';
function PostsList({isPosting, onModalHandler, onStopPosting}) {

   const [posts, setPosts] = useState([]);

   useEffect(() => {
      async function fetchPosts() {
         const response = await fetch('http://localhost:8080/posts');
         const resData = await response.json();
         setPosts(resData.posts);
      }

      fetchPosts();
   }, []);

   function addPostHandler(postData) {
      fetch(`http://localhost:8080/posts`, {
         method: 'POST',
         body: JSON.stringify(postData),
         headers: {
            'Content-Type': 'application/json'
         }
      })
      setPosts((existingPosts) => [postData, ...existingPosts]);
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
