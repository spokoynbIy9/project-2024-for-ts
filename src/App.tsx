import './App.css'
import {Route, Routes} from 'react-router-dom'
import StartedPage from './components/StartedPage/StartedPage'
import UserPage from './components/UserPage/UserPage'
const App = () => {
  
  return (
    <Routes>
      <Route path="/" element={<StartedPage></StartedPage>} />
      <Route path="/user/:userId" element={<UserPage></UserPage>}></Route>
    </Routes>
  )
}

export default App
