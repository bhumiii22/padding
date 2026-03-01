import Hero from "./Hero";

import Tournaments from "./Tournaments";
import Contact from "./Contact";
import TournamentLive from "./TournamentLive";

const Home = () => {
  return (
    <>
      <Hero />
    <TournamentLive/>
      <Tournaments />
      <Contact />
    </>
  );
};

export default Home;