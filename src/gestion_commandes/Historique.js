export default function Historique({ recherche }) {
  const donnees = [
    "Client: Jean Dupont",
    "Commande: 2x Souris - 40€",
    "Fournisseur: InfoTech SARL",
    "Commande: 1x Clavier - 30€"
  ];

  const filtre = recherche ? donnees.filter(e => e.includes(recherche)) : donnees;

  return (
    <div>
      <h3>Historique</h3>
      <ul>
        {filtre.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}