document.addEventListener('DOMContentLoaded', function() {
  const collectionGrid = document.querySelector('.cards.products');
  if (!collectionGrid) return;

  let isLoading = false;
  let currentPage = 1;
  let hasMorePages = true;
  const baseUrl = window.location.pathname;
  const sectionId = document.querySelector('#collection-template')?.dataset.sectionId || 'collection-template';

  // Create loading indicator
  const loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'loading-indicator';
  loadingIndicator.innerHTML = '<div class="spinner"></div>';
  loadingIndicator.style.display = 'none';
  loadingIndicator.style.cssText = `
    width: 100%;
    text-align: center;
    padding: 20px;
  `;

  // Add styles for loading indicator
  const style = document.createElement('style');
  style.textContent = `
    .loading-indicator {
      width: 100%;
      text-align: center;
      padding: 20px;
    }
    .spinner {
      width: 40px;
      height: 40px;
      margin: 0 auto;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #684A26;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  // Hide pagination section
  const paginationSection = document.querySelector('.pagination-section');
  if (paginationSection) {
    paginationSection.style.display = 'none';
  }

  // Insert loading indicator after the products grid
  if (paginationSection) {
    paginationSection.parentNode.insertBefore(loadingIndicator, paginationSection);
  } else {
    collectionGrid.parentNode.appendChild(loadingIndicator);
  }

  function loadMoreProducts() {
    if (isLoading || !hasMorePages) return;
    isLoading = true;
    loadingIndicator.style.display = 'block';

    currentPage++;
    const url = `${baseUrl}?page=${currentPage}&section_id=${sectionId}`;

    fetch(url)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newProducts = doc.querySelector('.cards.products');
        
        if (newProducts && newProducts.children.length > 0) {
          Array.from(newProducts.children).forEach(product => {
            // Add classes to all picture elements
            const pictures = product.querySelectorAll('picture');
            pictures.forEach((picture, index) => {
              picture.classList.add('product__image--selected');
              if (index > 0) {
                picture.classList.add('product__image--sub');
              }
            });
            collectionGrid.appendChild(product);
          });
          // Check if there are more pages
          const nextPageLink = doc.querySelector('.pagination__next');
          hasMorePages = !!nextPageLink;
        } else {
          // No more products to load
          hasMorePages = false;
        }
      })
      .catch(error => {
        console.error('Error loading more products:', error);
      })
      .finally(() => {
        isLoading = false;
        loadingIndicator.style.display = 'none';
      });
  }

  // Add scroll event listener to trigger loading more products
  window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000) {
      loadMoreProducts();
    }
  });
}); 