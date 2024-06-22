import "./HomePage.css";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { ReactComponent as Bear } from "./bear.svg";

function HomePage() {
   
    return (
      <div className="homePage-main">
        <Logo />
        <div className="homePage">
          <p className="intro-text">Google like a Japanese, without using Japanese</p>
          <SearchBar />
          <Bear className="bear" />
        </div>
      </div>
    );
  }

  export default HomePage;