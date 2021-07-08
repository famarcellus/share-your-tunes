import './App.scss';
import { Navbar } from "./components/navbar/Navbar";
import ProfilePage from "./pages/ProfilePage";


function App() {
  return (
    <div className="App">
      <Navbar />
      <ProfilePage />
    </div>
  );
}

export default App;
