# NoWall Redirect

A simple link redirection tool that makes it easier to bypass article paywalls through [archive.today]([url](https://archive.today/)).

![nowall-readme-banner](https://github.com/user-attachments/assets/b6e9ecd9-39fd-4c78-9e9b-d493967e27c9)

## What it does

NoWall allows you to quickly access paywall-free versions of web articles by using the format:

```
nowall.cc/example.com/article-path
```

## Why I built this

I found myself repeatedly copy-pasting URLs into archive.today to get around paywalls and access content. This tool streamlines that process into a simple, memorable URL pattern that's quicker to type and share.

## Technology

- **Cloudflare Workers**: Serverless functions that handle the URL parsing and redirection
- **GitHub Actions**: For continuous deployment
- **Wrangler CLI**: For local development and testing

## Setup Instructions

### Prerequisites

- Node.js and npm
- Cloudflare account
- GitHub account
- Domain name (optional for initial setup)

### Quick Start

1. Clone this repository

   ```bash
   git clone https://github.com/maxbeyer1/nowall-redirect.git
   cd nowall-redirect
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Install Wrangler CLI

   ```bash
   npm install -g wrangler
   ```

4. Login to Cloudflare

   ```bash
   wrangler login
   ```

5. Test locally

   ```bash
   wrangler dev
   ```

6. Deploy to Cloudflare (or make use of GitHub Actions for deployment)

   ```bash
   wrangler publish
   ```

7. Add a custom domain (optional)

   - Go to your Cloudflare dashboard and add the custom domain to the appropriate Worker
   - Update the `wrangler.toml` file with your custom domain

## Disclaimer

This tool is a simple redirect service that points to archive.today, which happens to remove paywalls from most articles. NoWall itself doesn't modify any content or bypass paywalls directly - it just makes it more efficient to use archive.today for this purpose. Users are responsible for ensuring their use complies with applicable laws.

## License

[MIT](LICENSE)
