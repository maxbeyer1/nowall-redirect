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
  <style>
    :root {
      --primary-color: #3a86ff;
      --secondary-color: #8338ec;
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
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    p {
      font-size: 1.2rem;
      line-height: 1.6;
      margin-bottom: 2rem;
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
    
    .how-to {
      text-align: left;
      margin: 2rem auto;
      max-width: 90%;
    }
    
    .how-to h2 {
      color: var(--primary-color);
      margin-bottom: 1rem;
    }
    
    .how-to ol {
      padding-left: 1.5rem;
    }
    
    .how-to li {
      margin-bottom: 0.8rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>NoWall.cc</h1>
    <p>Bypass paywalls instantly with this simple URL format:</p>
    <div class="example">
      nowall.cc/nytimes.com/2023/05/01/article-title
    </div>
    
    <div class="how-to">
      <h2>How to use:</h2>
      <ol>
        <li>Start with <strong>nowall.cc/</strong></li>
        <li>Add the full URL of the article you want to read</li>
        <li>We'll redirect you to an archived version on archive.today</li>
      </ol>
    </div>
    
    <p>Bookmark this site for quick access whenever you encounter a paywall!</p>
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
