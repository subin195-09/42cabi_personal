// ./src/App.tsx

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Main from './routes/main'
import Lent from './routes/lent'
import Return from './routes/return'

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
