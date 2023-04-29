import "./Home.css";
import Row from "../row/Row";
import requests from "../api/requests";
import Nav from "../nav/Nav";
import Banner from "../banner/Banner";
function Home() {
  return (
    <div className="homepage">
      <Nav />
      <Banner />
      <Row
        title="Netflix Originals"
        url={requests.getNetflixOriginals}
        isLarge
      />
      <Row title="Trending" url={requests.getTrending} />
      <Row title="Top Rated" url={requests.getTopRated} />
      <Row title="Action Movies" url={requests.getActionMovies} />
      <Row title="Comedy Movies" url={requests.getComedyMovies} />
      <Row title="Horror Movies" url={requests.getHorrorMovies} />
      <Row title="Romance Movies" url={requests.getRomanceMovies} />
      <Row title="Documentaries" url={requests.getDocumentaries} />
    </div>
  );
}

export default Home;
