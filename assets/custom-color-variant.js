document.addEventListener("DOMContentLoaded", function () {
  // Select all color swatch buttons
  document.querySelectorAll(".card .color-swatch__select-button").forEach((button) => {
    button.addEventListener("click", function (event) {
      // Prevent any default behavior to ensure custom code runs
      event.preventDefault();

      // Retrieve the URL and variant ID from the clicked button
      const colorUrl = button.getAttribute("data-url");
      const variantId = button.getAttribute("data-variant-id");

      // Find the product link within the same product card
      const productCard = button.closest(".card");
      const productLink = productCard.querySelector(".product__link");

      console.log("Color URL:", colorUrl);
console.log("Variant ID:", variantId);


      // Update the product link to include the variant ID in the URL
      if (colorUrl && variantId) {
        productLink.setAttribute("href", `${colorUrl}?variant=${variantId}`);
      } else {
        productLink.setAttribute("href", colorUrl);  // Fallback if variantId is missing
      }
    });
  });
});
