import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.scss';
import { SignUp } from './components/SignUpComponent';

function App() {
  // const [backendData, setBackendData] = useState([{}]);

  // useEffect(() => {
  //   fetch("/api")
  //     .then(
  //       response => response.json()
  //     ).then(
  //       data => setBackendData(data)
  //     )
  // }, [])


  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
