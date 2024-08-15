import { useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";
import Dashboad from "./components/Dashboard";

export default function App() {
  const { isLoggedIn, account } = useAuth();

  return (
    <div className="App">
      <Header account={account} />

      {isLoggedIn ? <LoggedInText /> : <LoggedOutText />}
    </div>
  );
}

const LoggedInText = () => {
  const { account } = useAuth();

  return (
    <>
      {/* <MyDetails /> */}
      <Dashboad />
    </>
  );
};

const LoggedOutText = () => (
  <p>Don't forget to start your backend server, then authenticate yourself.</p>
);
