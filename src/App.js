import Header from './component/Header';
import Router from './routes';
import { ToastContainer } from 'react-toastify';
import { UserContext } from "./context/userContext";
import { useContext } from "react";

function App() {
  const {user} = useContext(UserContext);
  return (
    <div className="App">
      <Header />
      {!user.isLoading?<Router />:''}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <ToastContainer />
    </div>
  );
}

export default App;
