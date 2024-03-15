import { useEffect, useState } from 'react';
import Modal from '../Modal';
import NewPost from '../NewPost';
import Post from '../Post';
import classes from './PostsList.module.css';
function PostsList({isPosting, onModalHandler, onStopPosting}) {

   const [posts, setPosts] = useState([]);
   const [isFetching, setIsFetching] = useState(false);

   useEffect(() => {
      async function fetchPosts() {
         setIsFetching(true);
         const response = await fetch('http://localhost:8080/posts');
         const resData = await response.json();
         setPosts(resData.posts);
         setIsFetching(false);
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
         {isFetching &&
            <div className={classes.loading}>
               <h2>Loading Posts...</h2>   
            </div>
         }
         {!isFetching && posts.length > 0 && (
               <ul className={classes.posts}>
                     {posts.map((post, index) => (
                        <Post key={index} author={post.author} body={post.body} />
                     ))}
               </ul>
            ) 
         }
         {!isFetching && posts.length === 0 &&
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
