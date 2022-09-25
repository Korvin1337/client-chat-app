import logo from './logo.svg';
import './App.css';
import Chat from './pages/chat'

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/chat'
          element={<Chat username={username} room={room} socket={socket} />}
        />
      </Routes>
    </Router> 
  )
}

export default App;
