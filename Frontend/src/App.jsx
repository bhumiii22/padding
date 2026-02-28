import React from "react"
import { Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar"
import Home from "./components/Home"
import PlayerProfile from "./components/PlayerProfile"
import PlayerRanking from "./components/PlayerRanking"
import Tournaments from "./components/Tournaments"
import TournamentDetails from "./components/TournamentDetails"
import TournamentPlayers from "./components/TournamentPlayers"
import Contact from "./components/Contact"
import Gallery from "./components/Gallery"   
import PlayerRegister from "./components/PlayerRegister"
import PlayerLogin from "./components/PlayerLogin"

const App = () => {
  console.log('App component rendering')
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<PlayerProfile />} />
        <Route path="/ranking" element={<PlayerRanking />} />
        <Route path="/tournaments" element={<Tournaments />} />

        <Route path="/tournaments/:id" element={<TournamentDetails />} />

        <Route path="/tournaments/:id/players" element={<TournamentPlayers />} />

        <Route path="/gallery" element={<Gallery />} />
        <Route path="/player-register" element={<PlayerRegister />} />
        <Route path="/player-login" element={<PlayerLogin />} />

        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App
