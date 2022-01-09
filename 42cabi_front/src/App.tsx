// ./src/App.tsx

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Main from './routes/Main'
import Lent from './routes/Lent'
import Return from './routes/Return'

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path='/'><Main></Main></Route>
          <Route path='/lent'><Lent></Lent></Route>
          <Route path='/return'><Return></Return></Route>
        </Switch>
    </BrowserRouter>
  )
}

export default App
