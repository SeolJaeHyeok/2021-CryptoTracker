import { HashRouter, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <HashRouter>
      <Route path="/:coinId">
        <Coin />
      </Route>
      <Route exact path="/">
        <Coins />
      </Route>
    </HashRouter>
  );
}
export default Router;
