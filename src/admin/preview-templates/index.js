import Home from '/admin/preview-templates/home.js';
import About from '/admin/preview-templates/about.js';

// Register preview templates
CMS.registerPreviewTemplate('home', Home);
CMS.registerPreviewTemplate('about', About);

// Register CSS
fetch('/')
  .then((response) => response.text())
  .then((html) => {
    const f = document.createElement('html');
    f.innerHTML = html;
    Array.from(f.getElementsByTagName('link')).forEach((tag) => {
      if (tag.rel == 'stylesheet' && !tag.media) {
        CMS.registerPreviewStyle(tag.href);
      }
    });
  });
