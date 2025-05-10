export default function Imprimer({ commande }) {
  const imprimer = () => {
    if (!commande) {
      alert("Aucune commande à imprimer !");
      return;
    }

    const win = window.open("", "Impression");
    win.document.write(`
      <h1>Commande</h1>
      <p>Produit : ${commande.produit}</p>
      <p>Catégorie : ${commande.categorie}</p>
      <p>Quantité : ${commande.quantite}</p>
      <p>Prix unitaire : ${commande.prix} €</p>
      <p><strong>Total : ${commande.total} €</strong></p>
    `);
    win.print();
    win.close();
  };

  return (
    <div className="btn-container">
      <h3>Imprimer la commande</h3>
      <button onClick={imprimer}>Imprimer en PDF</button>
    </div>
  );
}