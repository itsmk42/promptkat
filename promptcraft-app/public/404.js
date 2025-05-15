// This script handles client-side routing for GitHub Pages
// It's used to redirect all routes to the index.html file
// which then lets Next.js handle the routing

// Single Page Apps for GitHub Pages
// https://github.com/rafrex/spa-github-pages
(function(l) {
  if (l.search[1] === '/') {
    var decoded = l.search.slice(1).split('&').map(function(s) { 
      return s.replace(/~and~/g, '&')
    }).join('?');
    window.history.replaceState(null, null,
      l.pathname.slice(0, -1) + decoded + l.hash
    );
  }
}(window.location));
