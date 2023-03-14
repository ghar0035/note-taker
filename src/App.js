
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Welcome to note app</h1>
      <Link to="/auth/register">register</Link>
    </div>
  );
}

export default App;
