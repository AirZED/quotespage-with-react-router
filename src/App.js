import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQoute = React.lazy(() => import("./pages/NewQoute"));
const QuoteDetail = React.lazy(() => import("./pages/QuoteDetail"));
const AllQuotes = React.lazy(() => import("./pages/AllQuotes"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path={"/"} exact>
            <Redirect to={"/quotes"} />
          </Route>
          <Route path={"/quotes"} exact>
            <AllQuotes />
          </Route>
          <Route path={"/quotes/:quotesId"}>
            <QuoteDetail />
          </Route>
          <Route path={"/new-quote"}>
            <NewQoute />
          </Route>
          <Route path={"*"}>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
