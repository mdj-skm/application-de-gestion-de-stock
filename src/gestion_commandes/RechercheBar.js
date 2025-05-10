import React, { useState } from "react";

export default function RechercheBar({ setRecherche }) {
  const [deb, setDeb] = useState("");
  const [fin, setFin] = useState("");

  return (
    <div className="recherche-bar">
      <input type="date" onChange={e => setDeb(e.target.value)} />
      <input type="date" onChange={e => setFin(e.target.value)} />
      <button onClick={() => setRecherche(`deb_{fin}`)}>Recherche</button>
      <button onClick={() => window.location.reload()}>Rafraîchir</button>
    </div>
  );
}