
import './App.css'
import Login from './Components/AuthComponents/Login'
import { Routes , Route} from "react-router-dom"
function App() {

  return (
    <>
     <Routes>
      <Route path="login" element={<Login/>}></Route>
     </Routes>
    </>
  )
}

export default App
