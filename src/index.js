export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;

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
      new URL(targetUrl);

      // Construct the archive.today URL
      const archiveUrl = `https://archive.today/submit/?url=${encodeURIComponent(targetUrl)}`;

      // Redirect to archive.today
      return Response.redirect(archiveUrl, 302);
    } catch (error) {
      return new Response(errorPageHTML, {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
      });
    }
  },
};

// Landing page HTML
const landingPageHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NoWall.cc - Bypass Paywalls Instantly</title>
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
      margin-bottom: 5rem;
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
    
    .example-container {
      position: relative;
      margin: 3rem 0;
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
    
    .example:hover {
      transform: translate(-2px, -2px);
      box-shadow: 10px 10px 0 rgba(17, 17, 17, 1);
    }
    
    .example-url {
      color: var(--accent-color);
      font-weight: bold;
    }
    
    .decoration {
      position: absolute;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: var(--rams-orange);
      opacity: 0.1;
      z-index: -1;
    }
    
    .decoration-1 {
      top: -20px;
      right: -40px;
    }
    
    .decoration-2 {
      bottom: -50px;
      left: 20%;
      background: var(--accent-color);
      width: 80px;
      height: 80px;
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
  <div class="container">
    <div class="hero">
      <h1>NoWall.cc <span class="badge">beta</span></h1>
      <p class="hero-text">A <strong>ridiculously simple</strong> tool that helps you bypass paywalls and read articles without limits.</p>
      
      <div class="example-container">
        <div class="decoration decoration-1"></div>
        <div class="decoration decoration-2"></div>
        
        <div class="example">
          <span>nowall.cc/</span><span class="example-url">nytimes.com/2023/05/01/article-title</span>
        </div>
      </div>
    </div>
    
    <div class="how-to">
      <h2>How it works</h2>
      <ol>
        <li>Find an article behind a paywall</li>
        <li>Add <strong>nowall.cc/</strong> in front of the article's URL</li>
        <li>We'll redirect you to archive.today which removes the paywall</li>
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
    NoWall.cc is a simple tool that helps you bypass paywalls.<br>
    We don't store any data or track your browsing.
  </div>
</body>
</html>`;

// Error page HTML
const errorPageHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NoWall.cc - Error</title>
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
