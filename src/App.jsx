import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar
        backgroundColor="hsl(161, 20%, 25%)"
        homeIcon={{ altTitle: "Movies Catalog Home", url: "/favicon.ico" }}
        options={[
          {
            title: "Movies Search App",
            url: null,
          },
        ]}
      />
    </>
  );
}

export default App;
