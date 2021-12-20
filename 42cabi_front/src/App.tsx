// ./src/App.tsx

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Lent from './routes/lent'
import Return from './routes/return'

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path='/'>Main</Route>
          <Route path='/lent' component={Lent}></Route>
          <Route path='/return' component={Return}></Route>
        </Switch>
    </BrowserRouter>
  )
}

export default App
