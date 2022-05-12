import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/Layout/Navbar';

function App() {
  return (
    <Router>
      <div className='flex flex-col justify-between h-screen'>
        <Navbar/>
        <main>Content</main>
      </div>
    </Router>
  );
}

export default App;
