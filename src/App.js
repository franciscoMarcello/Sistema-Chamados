import { BrowserRouter} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';
import AuthProvider from './contexts/auth'
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <ToastContainer position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'/>
          <Routes/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
