import { useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";
import MyDetails from "./components/MyDetails";

export default function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="App">
      <Header />

      {isLoggedIn ? <LoggedInText /> : <LoggedOutText />}
    </div>
  );
}

const LoggedInText = () => {
  const { account } = useAuth();

  return (
    <>
      <p>
        Hey, {account.username}! I'm happy to let you know: you are
        authenticated!
      </p>
      <MyDetails />
    </>
  );
};

const LoggedOutText = () => (
  <p>Don't forget to start your backend server, then authenticate yourself.</p>
);
