import "./App.css";
import NavBar from "./components/NavBar";
import LinkList from "./components/LinkList";
import SearchField from "./components/SearchField";

function App() {
  return (
    <>
      <NavBar
        backgroundColor="hsl(161, 20%, 25%)"
        homeIcon={{ altTitle: "Movies Catalog Home", url: "/favicon.ico" }}
      >
        <SearchField
          placeholder="Search your next favorite movie"
          onConfirm={function (input) {
            alert(input);
          }}
        />
      </NavBar>
    </>
  );
}

export default App;
