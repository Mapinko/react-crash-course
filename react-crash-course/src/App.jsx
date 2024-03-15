import { useState } from 'react';
import MainHeader from './components/MainHeader';
import PostsList from './components/PostsList';

function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  
  function modalHandler() {
    setModalIsVisible(!modalIsVisible);
  }

  return (
    <>
    <MainHeader onCreatePost={modalHandler}/>
    <main>
      <PostsList  isPosting={modalIsVisible} onModalHandler={modalHandler}/>
    </main>
    </>
  )
}

export default App
