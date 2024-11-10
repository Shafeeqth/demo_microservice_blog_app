
import './App.css'
import PostCreation from './components/PostCreation'
import PostList from './components/PostList'

function App() {
 

  return (
    <div className='container'>
    <h1>Create Post</h1>
    <PostCreation/>
    <hr/>
    <h1>Post List</ h1>
    <PostList />
      
    </div>
  )
}

export default App
