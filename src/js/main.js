window.addEventListener("load", async function () {
  const divProject = document.querySelector(".products-area-wrapper");

  try {
    const response = await fetch("/project", {
      method: "GET",
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      jsonResponse.forEach((item) => {
        const productRow = document.createElement("div");
        productRow.classList.add("products-row");
        productRow.classList.add("all");
        productRow.classList.add(item.type);

        // Create the product-cell for image
        const productImageCell = document.createElement("div");
        productImageCell.classList.add("product-cell", "image");
        const productImage = document.createElement("img");
        productImage.src = item.image; // Replace with the actual image URL
        productImage.alt = "product";
        const productName = document.createElement("span");
        productName.textContent = item.title; // Replace with the actual product name

        // Create the product-cell for category
        const productCategoryCell = document.createElement("div");
        productCategoryCell.classList.add("product-cell", "category");
        const categoryLabel = document.createElement("span");
        categoryLabel.classList.add("cell-label");
        categoryLabel.textContent = "Category:";
        const words = item.type.split('-');
        const formattedString = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
        const categoryText = document.createTextNode(formattedString); // Replace with the actual category

        // Create the product-cell for price
        const productPriceCell = document.createElement("div");
        productPriceCell.classList.add("product-cell", "price");
        const priceLabel = document.createElement("span");
        priceLabel.classList.add("cell-label");
        priceLabel.textContent = "Date:";
        const priceText = document.createTextNode(item.created_at); // Replace with the actual date

        // Append elements to their respective containers
        productImageCell.appendChild(productImage);
        productImageCell.appendChild(productName);
        productCategoryCell.appendChild(categoryLabel);
        productCategoryCell.appendChild(categoryText);
        productPriceCell.appendChild(priceLabel);
        productPriceCell.appendChild(priceText);

        // Append product cells to the product row
        productRow.appendChild(productImageCell);
        productRow.appendChild(productCategoryCell);
        productRow.appendChild(productPriceCell);

        // Append the product row to the messageContainer
        divProject.appendChild(productRow);
      });
    } else {
      console.log(
        "Failed to fetch data:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.log("An error occurred:", error);
  }
});

const typeFilter = document.querySelector("#filter-type");
const divProject = document.querySelector(".products-area-wrapper");

typeFilter.addEventListener("change", function () {
  const selectedOption = typeFilter.value;
  console.log(selectedOption);
  filterItems(selectedOption);
});

function filterItems(filter) {
  const items = document.querySelectorAll(".products-row");

  items.forEach((item) => {
    item.style.display = "none";
  });

  if (filter === "all") {
    items.forEach((item) => {
      item.style.display = "flex";
    });
  } else {
    const filteredItems = document.querySelectorAll("." + filter);
    if(filteredItems.length > 0){
      filteredItems.forEach((item) => {
        item.style.display = "flex";
      });
    }else{
      console.log("fff");
      const productPriceCell = document.createElement("div");
      productPriceCell.classList.add("no-project");
      productPriceCell.textContent = "No projects in this domain currently.";
      divProject.appendChild(productPriceCell);
    }

  }
}

document.querySelector(".jsFilter").addEventListener("click", function () {
  document.querySelector(".filter-menu").classList.toggle("active");
});

document.querySelector(".grid").addEventListener("click", function () {
  document.querySelector(".list").classList.remove("active");
  document.querySelector(".grid").classList.add("active");
  document.querySelector(".products-area-wrapper").classList.add("gridView");
  document
    .querySelector(".products-area-wrapper")
    .classList.remove("tableView");
});

document.querySelector(".list").addEventListener("click", function () {
  document.querySelector(".list").classList.add("active");
  document.querySelector(".grid").classList.remove("active");
  document.querySelector(".products-area-wrapper").classList.remove("gridView");
  document.querySelector(".products-area-wrapper").classList.add("tableView");
});

// var modeSwitch = document.querySelectorAll(".mode-switch");
// modeSwitch.forEach(function (element) {
//   element.addEventListener("click", function () {
//     document.documentElement.classList.toggle("light");
//     element.classList.toggle("active");
//   });
// });
