import "./App.css";
import UnAuthorizedHome from "./pages/UnAuthorizedHome";
import AuthorizedHome from "./pages/AuthorizedHome";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isLoggedIn } = useAuth();
  return <>{isLoggedIn ? <AuthorizedHome /> : <UnAuthorizedHome />}</>;
}

export default App;
