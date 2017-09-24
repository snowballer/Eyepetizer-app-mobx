import React from 'react';
import Home from '../components/home/Home';
import Detail from '../components/detail/Detail';
import NotFound from '../components/common/notFound';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

const routeconfig =(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/detail/:id" component={Detail}></Route>
      <Route component={NotFound}></Route>
    </Switch>
  </BrowserRouter>
);

export default routeconfig;
