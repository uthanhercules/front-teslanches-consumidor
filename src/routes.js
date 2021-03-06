import {
  BrowserRouter as Router, Route, Switch, Redirect
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import useAuth from './hooks/useAuth';

import SingUp from './pages/signUp';
import SigIn from './pages/singIn';
import Restaurantes from './pages/restaurants';
import perfilRestaurante from './pages/restaurantProfile';

function RotasProtegidas(props) {
  const { token } = useAuth();

  return (
    <Route
      render={() => (token ? props.children : <Redirect to="/" />)}
    />
  );
}

export default function Routes() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path={['/', '/login']} exact component={SigIn} />
          <Route path="/cadastro" component={SingUp} />
          <RotasProtegidas>
            <Route path="/restaurantes/:id/perfil" component={perfilRestaurante} />
            <Route path="/restaurantes" exact component={Restaurantes} />
          </RotasProtegidas>
        </Switch>
      </Router>
    </AuthProvider>
  );
}
