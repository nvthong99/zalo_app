import * as React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Navigation from "./navigation";

const Main = () => {
  return (
    <Provider store={store()}>
      <Navigation />
    </Provider>
  );
};

export default Main;
