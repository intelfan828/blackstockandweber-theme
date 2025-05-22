document.addEventListener('DOMContentLoaded', function() {
  // Check if we have a stored scroll position in localStorage
  const scrollPosition = localStorage.getItem('scrollPosition');
  if (scrollPosition) {
    // Use setTimeout to ensure the scroll happens after the page layout is complete
    setTimeout(() => {
      window.scrollTo(0, parseInt(scrollPosition, 10));
      // Remove the stored position from localStorage
      localStorage.removeItem('scrollPosition');
    }, 0);
  }

  // Add event listeners to all "View All" links
  const viewAllLinks = document.querySelectorAll('.view-all');
  viewAllLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Store the current scroll position in localStorage
      localStorage.setItem('scrollPosition', window.scrollY);
    });
  });
});