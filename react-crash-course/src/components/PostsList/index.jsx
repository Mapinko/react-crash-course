import React, { useState } from 'react';
import Modal from '../Modal';
import NewPost from '../NewPost';
import Post from '../Post';
import classes from './PostsList.module.css';

function PostsList({isPosting, onModalHandler}) {
   const [enteredBody, setEnteredBody] = useState('');
   const [enteredAuthor, setEnteredAuthor] = useState('');



   function bodyChangeHandler(event) {
      setEnteredBody(event.target.value);
   }
   function authorChangeHandler(event) {
      setEnteredAuthor(event.target.value);
   }

   let modalContent

   if (isPosting) {
      modalContent = (
         <Modal onClose={onModalHandler}>
            <NewPost
               onBodyChange={bodyChangeHandler}
               onAuthorChange={authorChangeHandler}
            />
         </Modal>
      )

   }
   return (
      <>
         {modalContent}

         <ul className={classes.posts}>
            <Post author={enteredAuthor} body={enteredBody}/>
         </ul>`
      </>
   );
}

export default PostsList;
