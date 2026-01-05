// Gigs page - expandable program functionality
document.addEventListener('DOMContentLoaded', function() {
  const gigsPage = document.querySelector('.gigs-page');
  if (!gigsPage) return;

  // Add click handlers to all toggle buttons
  const toggleButtons = document.querySelectorAll('.gig-toggle');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const gigArticle = this.closest('.gig-compact');
      const programDiv = gigArticle.querySelector('.gig-program');
      
      if (!programDiv) return;
      
      const isExpanded = gigArticle.classList.contains('expanded');
      
      if (isExpanded) {
        // Collapse
        gigArticle.classList.remove('expanded');
        programDiv.hidden = true;
        this.setAttribute('aria-label', 'Show program');
      } else {
        // Expand
        gigArticle.classList.add('expanded');
        programDiv.hidden = false;
        this.setAttribute('aria-label', 'Hide program');
      }
    });
  });
});
