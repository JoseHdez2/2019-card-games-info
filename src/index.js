import React from "react";
import ReactDOM from "react-dom";
import { StyleSheet, Text, View } from "react-native";
import { Link, NativeRouter, Route } from "react-router-native";

import "./styles.css";
import Spire from "./slay-the-spire";
import Dungeoneering from "./guild-of-dungeoneering";

// function App() {
//   return (
//     <div className="App">
//       <Spire />
//     </div>
//   );
// }

const App = () => (
  <NativeRouter>
    <View>
      <View>
        <Link to="/" className="my-link">
          <Text>Home</Text>
        </Link>
        <Link to="/dungeoneering" className="my-link">
          <Text>Guild of Dungeoneering</Text>
        </Link>
        <Link to="/spire" className="my-link">
          <Text>Slay The Spire</Text>
        </Link>
        <Link to="/about" className="my-link">
          <Text>About</Text>
        </Link>
      </View>

      <Route exact path="/" component={Home} />
      <Route path="/dungeoneering" component={Dungeoneering} />
      <Route path="/spire" component={Spire} />
      <Route path="/about" component={About} />
    </View>
  </NativeRouter>
);

const Home = () => (
  <span>
    <h2>Card Games Info</h2>
    <p>Click a link.</p>
  </span>
);

const About = () => (
  <p>
    This app shows info about card-based games: Slay the Spire and Guild of
    Dungeoneering
  </p>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
