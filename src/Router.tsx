import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Route path="/:coinId">
        <Coin />
      </Route>
      <Route exact path="/">
        <Coins />
      </Route>
    </BrowserRouter>
  );
}
export default Router;
