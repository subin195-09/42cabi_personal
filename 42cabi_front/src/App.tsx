import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Lent from './routes/lent'
import Return from './routes/return'

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path='/'>Main</Route>
          <Route path='/lent'>Lent</Route>
          <Route path='/return'>Return</Route>
        </Switch>
    </BrowserRouter>
  )
}

export default App
