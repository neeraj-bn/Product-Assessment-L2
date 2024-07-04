document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-button");
  const  tabImages = document.querySelectorAll(".tab-img");
  const productContainer = document.getElementById("product-container");

  tabs.forEach((tab,index) => {
    tab.addEventListener("click", () => {
      document.querySelector(".tab-button.active").classList.remove("active");
      document.querySelector(".tab-img.img-active").classList.remove("img-active");

      tabImages[index].classList.add("img-active");
      tab.classList.add("active");
      fetchAndDisplayProducts(tab.dataset.category);
    });
  });

  fetchAndDisplayProducts("Men");

  function fetchAndDisplayProducts(category) {
    fetch(
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const selectedCategory = data.categories.find(
          (cat) => cat.category_name === category
        );
        renderProducts(selectedCategory.category_products);
      })
      .catch((error) => console.error("Error fetching the products:", error));
  }

  function renderProducts(products) {
    productContainer.innerHTML = products
      .map(
        (product) => `
            <div class="product-card">
                ${
                  product.badge_text
                    ? `<div class="badge">${product.badge_text}</div>`
                    : ""
                }
                <img src="${product.image}" alt="${product.title}">
                <div class="details">
                  <div class="product-main">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-vendor">&#9679;${product.vendor}</p>
                  </div>
                   <div class="price-section">
                   <p class="discounted-price">Rs ${product.price} </p>
                    <p class="price">Rs ${product.compare_at_price}</p>
                    <p class="discounted-percent">${Math.round(
                      100 - (product.price * 100) / product.compare_at_price
                    )}% off</p>
                   </div>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            </div>
        `
      )
      .join("");
  }
});
