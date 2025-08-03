import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home, Places } from './pages';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/places" 
          element={
            <ProtectedRoute>
              <Places />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App;
