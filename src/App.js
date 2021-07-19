import './App.scss';
import { Navbar } from "./components/navbar/Navbar";
import ProfilePage from "./pages/ProfilePage";
import { Provider } from "react-redux";
import { store } from "./store/store";


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Navbar />
        <ProfilePage />
      </Provider>
    </div>
  );
}

export default App;
