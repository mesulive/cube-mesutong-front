import {BrowserRouter, Route} from "react-router-dom";
import Title from "./components/Title";
import Home from "./components/Home/Home";
import Guide from "./components/Guide/Guide";
import UpdateHistory from "./components/UpdateHistory/UpdateHistory";
import {positions, Provider as AlertProvider, transitions} from "react-alert"
import {composeWithDevTools} from "redux-devtools-extension/developmentOnly";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./modules";
import ReduxThunk from "redux-thunk";
import {Provider} from "react-redux";
import MyAlertTemplate from "./MyAlertTemplate";
import React from "react";
import Mesulive from "./components/Mesulive";
import Notice from "./components/Notice";
import {Stack} from "@mui/material";

const middleWare = composeWithDevTools(applyMiddleware(ReduxThunk))
const store = createStore(rootReducer, middleWare);

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 2000,
  offset: '40px',
  transition: transitions.FADE,
  type: "error"
};

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AlertProvider template={MyAlertTemplate} {...options}>
          <Title/>
          <Notice/>
          <Mesulive/>
          <Route path="/" component={Home} exact={true}/>
          <Route path="/guide" component={Guide}/>
          <Route path="/updateHistory" component={UpdateHistory}/>
          <footer>
            <Stack alignItems="center">
              <a href="https://www.buymeacoffee.com/vetan2" style={{marginBottom: '8px'}} target="_blank">
                <img
                  src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=vetan2&button_colour=FF5F5F&font_colour=ffffff&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00"/>
              </a>
              Copyright 2022. 큐브매수통 All rights reserved.<br/>
              큐브매수통 is not associated with NEXON Korea.<br/>
              문의: help@mesu.live
            </Stack>
          </footer>
        </AlertProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
