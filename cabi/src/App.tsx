import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

// Home.tsx, Login.tsx 파일에서 컴포넌트 가져오기!
import IndexRouter from "../server/routes/index";

function App() {
  const isLoggedIn = false;
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <IndexRouter />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
