let allProducts = [];

fetch("https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    console.log(data);
    displayProducts(allProducts);

  })
  .catch(err => console.log("Erreur:", err));

function displayProducts(list) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  list.forEach(p => {
    const imgSrc = p.image || "https://via.placeholder.com/220x180?text=No+Image";

    container.innerHTML += `
      <div class="product-card">
        <img src="${imgSrc}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${(p.priceCents/100).toFixed(2)} $</p>
        <p><em>${p.category}</em></p>
      </div>
    `;
  });
}


document.getElementById("search").addEventListener("input", function () {
    const text = this.value.toLowerCase();
    const filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(text) ||
      (p.category && p.category.toLowerCase().includes(text))
    );
    displayProducts(filtered);
  });

document.getElementById("filter").addEventListener("change", function () {
  const value = this.value;
  if (value === "all") {
    displayProducts(allProducts);
    return;
  }
  const filtered = allProducts.filter(p => p.category.toLowerCase() === value.toLowerCase());
  displayProducts(filtered);
});




  

