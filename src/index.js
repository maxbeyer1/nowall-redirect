export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;

    // Serve favicon directly
    if (
      pathname === '/favicon.ico' ||
      pathname === '/apple-touch-icon.png' ||
      pathname === '/favicon-32x32.png' ||
      pathname === '/favicon-16x16.png'
    ) {
      return env.ASSETS.fetch(request);
    }

    // Landing page for root path
    if (pathname === '/' || pathname === '') {
      return new Response(landingPageHTML, {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
      });
    }

    // Extract the target URL (removing the leading slash)
    let targetUrl = pathname.substring(1);

    // Check URL validity
    if (!targetUrl || !targetUrl.includes('.')) {
      return new Response(errorPageHTML, {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
      });
    }

    try {
      // Add https:// if not present
      if (
        !targetUrl.startsWith('http://') &&
        !targetUrl.startsWith('https://')
      ) {
        targetUrl = `https://${targetUrl}`;
      }

      // Validate the URL
      new URL(targetUrl); // Throws if invalid

      // Construct the archive.today URL
      const archiveUrl = `https://archive.today/submit/?url=${encodeURIComponent(targetUrl)}`;

      // Redirect to archive.today
      // Optimized redirect response with preconnect
      return new Response(null, {
        status: 307, // Temporary redirect that preserves method
        headers: {
          Location: archiveUrl,
          Link: '<https://archive.today>; rel=preconnect', // Early connection to destination
          'Cache-Control': 'public, max-age=60', // Cache redirects briefly
          'X-Content-Type-Options': 'nosniff',
          'Alt-Svc': 'h3=":443"; ma=86400', // Advertise HTTP/3 support if available
        },
      });
    } catch (error) {
      return new Response(errorPageHTML, {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
      });
    }
  },
};

// Landing page HTML
// Landing page HTML - removed example, kept only input with decorations
const landingPageHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NoWall.cc - Bypass Paywalls with Archives</title>
  <link rel="icon" href="/favicon.ico" type="image/x-icon">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --rams-orange: #ff5722;
      --text-color: #111111;
      --background-color: #ffffff;
      --subtle-bg: #f7f7f7;
      --accent-color: #4059ff;
      --radius: 12px;
      --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--background-color);
      color: var(--text-color);
      line-height: 1.5;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      padding: 0 1rem;
      position: relative;
    }
    
    .github-link {
      position: absolute;
      top: 1rem;
      right: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      transition: var(--transition);
      color: var(--text-color);
    }
    
    .github-link:hover {
      transform: translateY(-2px);
      opacity: 0.8;
    }
    
    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 5rem 1rem;
      width: 100%;
    }
    
    h1 {
      font-size: clamp(3rem, 10vw, 5rem);
      font-weight: 700;
      letter-spacing: -0.03em;
      margin-bottom: 1.5rem;
      position: relative;
      display: inline-block;
    }
    
    h1::after {
      content: "";
      position: absolute;
      width: 50%;
      height: 0.5rem;
      background: var(--rams-orange);
      bottom: 0.7rem;
      left: 0.5rem;
      z-index: -1;
      transform: rotate(-2deg);
    }
    
    .badge {
      display: inline-block;
      background: var(--rams-orange);
      color: white;
      font-family: 'Space Mono', monospace;
      font-size: 0.875rem;
      padding: 0.3rem 0.6rem;
      border-radius: 999px;
      margin-left: 1rem;
      transform: rotate(3deg);
      position: relative;
      top: -1rem;
    }
    
    .hero {
      margin-bottom: 3rem;
    }
    
    .hero-text {
      font-size: clamp(1.25rem, 5vw, 1.75rem);
      font-weight: 500;
      max-width: 38rem;
      margin-bottom: 3rem;
    }
    
    .hero-text strong {
      color: var(--rams-orange);
      font-weight: 700;
    }
    
    .url-input-container {
      margin: 3rem 0 4rem;
      position: relative;
    }
    
    .decoration {
      position: absolute;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      z-index: -1;
      opacity: 0.1;
    }
    
    .decoration-1 {
      top: -30px;
      right: -40px;
      background: var(--rams-orange);
    }
    
    .decoration-2 {
      bottom: -40px;
      left: 20%;
      background: var(--accent-color);
      width: 80px;
      height: 80px;
    }
    
    .url-input-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background: var(--subtle-bg);
      padding: 2rem;
      border-radius: var(--radius);
      border: 2px solid #111;
      box-shadow: 8px 8px 0 rgba(17, 17, 17, 1);
      transition: var(--transition);
      position: relative;
      z-index: 1;
    }
    
    .url-input-form:hover {
      transform: translate(-2px, -2px);
      box-shadow: 10px 10px 0 rgba(17, 17, 17, 1);
    }
    
    .form-header {
      font-weight: 700;
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }
    
    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      position: relative;
    }
    
    @media (min-width: 640px) {
      .input-group {
        flex-direction: row;
        align-items: stretch;
      }
    }
    
    .prefix {
      font-family: 'Space Mono', monospace;
      background: #e0e0e0;
      padding: 0 1rem;
      border-radius: var(--radius) 0 0 var(--radius);
      display: flex;
      align-items: center;
      font-size: 1rem;
      font-weight: 500;
      border: 2px solid #111;
      border-right: none;
    }
    
    .url-input {
      font-family: 'Space Mono', monospace;
      padding: 0.75rem 1rem;
      border-radius: var(--radius);
      border: 2px solid #111;
      font-size: 1rem;
      width: 100%;
      background-color: white;
      transition: var(--transition);
    }
    
    .prefix + .url-input {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    
    .url-input:focus {
      outline: none;
      border-color: var(--accent-color);
      box-shadow: 0 0 0 2px rgba(64, 89, 255, 0.2);
    }
    
    .submit-button {
      font-family: 'DM Sans', sans-serif;
      background: var(--rams-orange);
      color: white;
      border: 2px solid #111;
      border-radius: var(--radius);
      padding: 0.75rem 1.5rem;
      font-weight: 700;
      cursor: pointer;
      transition: var(--transition);
      font-size: 1rem;
    }
    
    .submit-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 0 rgba(17, 17, 17, 0.2);
    }
    
    .submit-button:active {
      transform: translateY(0);
      box-shadow: none;
    }
    
    .how-to {
      background: var(--subtle-bg);
      padding: 2.5rem;
      border-radius: var(--radius);
      margin: 4rem 0;
      position: relative;
    }
    
    .how-to h2 {
      font-size: 1.75rem;
      margin-bottom: 1.5rem;
      color: var(--text-color);
      display: inline-block;
      position: relative;
    }
    
    .how-to h2::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 0.3rem;
      background: var(--rams-orange);
      bottom: 0.2rem;
      left: 0.25rem;
      z-index: -1;
    }
    
    .how-to ol {
      list-style: none;
      counter-reset: steps;
      margin: 0;
      padding: 0;
    }
    
    .how-to li {
      margin-bottom: 1.5rem;
      position: relative;
      padding-left: 3rem;
      counter-increment: steps;
    }
    
    .how-to li::before {
      content: counter(steps);
      position: absolute;
      left: 0;
      top: -0.25rem;
      font-family: 'Space Mono', monospace;
      font-weight: bold;
      font-size: 1.5rem;
      color: var(--rams-orange);
      width: 2rem;
      height: 2rem;
      text-align: center;
      line-height: 2rem;
    }
    
    .footer {
      margin-top: auto;
      text-align: center;
      padding: 2rem 0;
      font-size: 0.9rem;
      color: #666;
    }
    
    .button {
      display: inline-block;
      background: var(--text-color);
      color: white;
      padding: 0.75rem 1.5rem;
      text-decoration: none;
      font-weight: 700;
      border-radius: var(--radius);
      font-family: 'DM Sans', sans-serif;
      transition: var(--transition);
      margin-top: 2rem;
      border: 2px solid var(--text-color);
    }
    
    .button:hover {
      background: white;
      color: var(--text-color);
    }
    
    .tip {
      padding: 1.5rem;
      background: rgba(255, 87, 34, 0.1);
      border-left: 4px solid var(--rams-orange);
      border-radius: 0 var(--radius) var(--radius) 0;
      margin: 2rem 0;
    }
    
    .tip h3 {
      font-size: 1.2rem;
      margin-bottom: 0.7rem;
      display: flex;
      align-items: center;
    }
    
    .tip-icon {
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.5rem;
      background: var(--rams-orange);
      color: white;
      border-radius: 50%;
      text-align: center;
      line-height: 1.5rem;
      font-weight: bold;
    }
    
    .example {
      font-family: 'Space Mono', monospace;
      background: var(--subtle-bg);
      padding: 1.5rem;
      border-radius: var(--radius);
      font-size: 1.1rem;
      position: relative;
      overflow: hidden;
      border: 2px solid #111;
      box-shadow: 8px 8px 0 rgba(17, 17, 17, 1);
      transition: var(--transition);
    }
    
    .bookmark-animation {
      display: inline-block;
      position: relative;
      animation: bookmark 2s infinite;
    }
    
    @keyframes bookmark {
      0% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
      100% { transform: translateY(0); }
    }
    
    @media (max-width: 768px) {
      .container {
        padding: 3rem 1rem;
      }
      
      .example {
        font-size: 0.9rem;
        padding: 1.2rem;
        word-break: break-all;
      }
      
      .how-to {
        padding: 1.5rem;
      }
    }
  </style>
</head>
<body>
  <a href="https://github.com/maxbeyer1/nowall-redirect" class="github-link" target="_blank" aria-label="View source code on GitHub">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
  </a>
  <div class="container">
    <div class="hero">
      <h1>NoWall.cc</h1>
      <p class="hero-text">A <strong>ridiculously simple</strong> tool that helps you bypass paywalls and read articles without limits.</p>
    </div>
    
    <!-- URL input form with decorations -->
    <div class="url-input-container">
      <div class="decoration decoration-1"></div>
      <div class="decoration decoration-2"></div>
      
      <div class="url-input-form">
        <div class="form-header">Enter a URL to bypass paywall</div>
        <div class="input-group">
          <div class="prefix">https://</div>
          <input 
            type="text" 
            id="url-input" 
            class="url-input" 
            placeholder="example.com/article-with-paywall" 
            aria-label="URL to bypass"
          >
          <button id="submit-url" class="submit-button">Go</button>
        </div>
      </div>
    </div>
    
    <div class="how-to">
      <h2>How it works</h2>
      <ol>
        <li>Find an article behind a paywall</li>
        <li>Enter the article URL above (or add <strong>nowall.cc/</strong> in front of it)</li>
        <li>We'll find archived versions without the paywall (or create a new one if none exist) and redirect you</li>
        <li>Enjoy reading without interruptions</li>
      </ol>
    </div>
    
    <div class="tip">
      <h3><span class="tip-icon">↑</span> Pro tip</h3>
      <p>Create a bookmark with the following JavaScript to quickly bypass paywalls with one click:</p>
      <div class="example" style="margin-top: 1rem; font-size: 0.9rem;">
        javascript:(function(){window.location='https://nowall.cc/'+window.location.href})()
      </div>
    </div>
    
    <p style="text-align: center; margin-top: 4rem;">
      <span class="bookmark-animation">⭐</span> Bookmark this site for quick access whenever you encounter a paywall!
    </p>
    
    <div style="text-align: center;">
      <a href="#" class="button" onclick="navigator.clipboard.writeText('javascript:(function(){window.location=\'https://nowall.cc/\'+window.location.href})()');alert('Bookmarklet copied! Create a new bookmark and paste this as the URL.'); return false;">
        Copy Bookmarklet
      </a>
    </div>
  </div>
  
  <div class="footer">
    We don't store any data or track your browsing.<br>
    Built by <a href="https://maxwbeyer.com/" target="_blank" style="color: var(--rams-orange);">Max Beyer</a>.
  </div>
  
  <script>
    // URL redirect functionality
    document.addEventListener('DOMContentLoaded', function() {
      const urlInput = document.getElementById('url-input');
      const submitButton = document.getElementById('submit-url');
      
      // Function to process and redirect
      function processUrl() {
        let url = urlInput.value.trim();
        
        if (!url) return;
        
        // Add https:// if not present
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          url = 'https://' + url;
        }
        
        // Check if it's a valid URL
        try {
          new URL(url);
          // Redirect to archive.today
          window.location.href = 'https://archive.today/submit/?url=' + encodeURIComponent(url);
        } catch (e) {
          alert('Please enter a valid URL');
        }
      }
      
      // Event listener for button click
      submitButton.addEventListener('click', processUrl);
      
      // Event listener for Enter key
      urlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          processUrl();
        }
      });
      
      // Auto-focus the input field when page loads
      urlInput.focus();
    });
  </script>
</body>
</html>`;

// Error page HTML
const errorPageHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NoWall.cc - Error</title>
  <link rel="icon" href="/favicon.ico" type="image/x-icon">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <style>
    :root {
      --error-color: #e63946;
      --primary-color: #3a86ff;
      --background-color: #f8f9fa;
      --text-color: #212529;
      --container-bg: #ffffff;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--background-color);
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      color: var(--text-color);
      position: relative;
    }
    
    .github-link {
      position: absolute;
      top: 1rem;
      right: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
      color: var(--text-color);
    }
    
    .github-link:hover {
      transform: translateY(-2px);
      opacity: 0.8;
    }
    
    .container {
      max-width: 800px;
      width: 90%;
      padding: 3rem;
      background: var(--container-bg);
      border-radius: 12px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    
    h1 {
      color: var(--error-color);
      margin-bottom: 1.5rem;
    }
    
    .example {
      background: var(--background-color);
      padding: 1.2rem;
      border-radius: 8px;
      font-family: monospace;
      margin: 1.5rem auto;
      max-width: 90%;
      word-break: break-all;
      font-size: 1.1rem;
      border-left: 4px solid var(--primary-color);
    }
    
    .button {
      display: inline-block;
      background: var(--primary-color);
      color: white;
      text-decoration: none;
      padding: 0.8rem 1.5rem;
      border-radius: 6px;
      transition: all 0.3s ease;
      font-weight: 500;
    }
    
    .button:hover {
      background: #2970d6;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  </style>
</head>
<body>
  <a href="https://github.com/maxbeyer1/nowall-redirect" class="github-link" target="_blank" aria-label="View source code on GitHub">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
  </a>
  <div class="container">
    <h1>Invalid URL</h1>
    <div class="example">
      nowall.cc/example.com/path/to/article
    </div>
    <p>Make sure you're including a valid domain name after nowall.cc/</p>
    <a href="/" class="button">Return to Home</a>
  </div>
</body>
</html>`;
