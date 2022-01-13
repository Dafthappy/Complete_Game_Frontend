import { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './context/UserContext'
import  axios  from 'axios';
import env from 'react-dotenv'
import './App.css';

import Startingpage from './pages/Startingpage';
import Gamepage from './pages/Gamepage'
import GameOver from './pages/GameOver';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Highscores from './pages/Highscores';

function App() {

  const value = useContext(UserContext)
  const { userState } = useContext(UserContext)
  const [userId, setUserId ] = userState

  const [gameState, setGameState] = useState(true)
  const [playerScore, setPlayerScore] = useState(0)

  const fetchUser = () => {
    const userId = localStorage.getItem('userId')
    if (userId) {
      axios.get(`${env.BACKEND_URL}/user/verify`, {
        headers: {
          Authorization: userId
        }
      })
      .then((response) => {
        // setUser(response.data.user)
        console.log(response)
      })
    }
  }

  useEffect(fetchUser, [])

  return (
    <div className="App">
      <Routes>
        <Route path ='/' element= {<Startingpage />} />
        <Route path ='/gamepage' element= 
        { userId === [] || !userId 
        ?
        <Navigate to='/' />
        :
        <Gamepage setGameState={setGameState} setPlayerScore={setPlayerScore}/>
        } />
        <Route path ='signup' element = 
        { userId != []
        ?
        <Navigate to='/gamepage' />
        :
        <Signup />
        }
        />
        <Route path='/login' element=
        { userId != []
        ?
        <Navigate to='/gamepage' />
        :
        <Login /> 
        } />
        <Route path ='/highscores' element={<Highscores />} />

      </Routes>
    </div>
  );
}

export default App;


