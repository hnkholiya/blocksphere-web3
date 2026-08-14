# BlockSphere — Web3 Interactive Learning Platform

BlockSphere is a responsive four-page Web3 educational website created to demonstrate fundamental blockchain and Web3 concepts through interactive visual modules.

The project combines educational content with practical functionality such as live cryptocurrency data, CoinGecko market widgets, and an interactive blockchain block mining simulator.

The main goal of the project is to understand how Web3 concepts work by implementing them in a real, navigable web application.

---

## Project Overview

BlockSphere is organized into four connected pages:

1. **Home / Landing**
2. **Web3 Concepts**
3. **Live Crypto Prices**
4. **Blockchain Block Simulator**

All pages share a common navigation bar, visual design system, typography, colors, spacing, footer, and cryptocurrency market ticker.

The project is built using HTML, CSS, and JavaScript without requiring a frontend framework.

---

## Features

- Responsive Web3-themed user interface
- Shared navigation across all four pages
- Active page navigation indicator
- Global CoinGecko cryptocurrency marquee
- Web2 vs Web3 comparison
- Bitcoin vs Ethereum comparison
- Public Key vs Private Key comparison
- Blockchain vs Traditional Database comparison
- Live Bitcoin price from CoinGecko API
- Live Ethereum price from CoinGecko API
- 24-hour cryptocurrency price change
- Positive/negative price indicators
- Refresh prices functionality
- CoinGecko static price headline widget
- CoinGecko cryptocurrency heatmap
- SHA-256 hashing using Web Crypto API
- Simplified Proof-of-Work mining
- Nonce-based block mining
- Previous hash linking
- Blockchain chain validation
- Block tampering demonstration
- Chain immutability demonstration
- Loading and API error states
- Mobile-friendly responsive layout

---

# Pages

## 1. Home / Landing Page

The Home page introduces the Web3 and blockchain theme of BlockSphere.

### Main sections

- Header and navigation
- Web3 introduction
- Blockchain fundamentals
- Key Web3 features
- Blockchain-related visual elements
- Footer

The page provides visitors with a simple introduction before moving to the more technical parts of the website.

---

## 2. Web3 Concepts

The Concepts page is designed as an educational reference page.

Instead of using long paragraphs, the concepts are presented using visual side-by-side comparison cards.

### Concepts covered

#### Web2 vs Web3

Explains the differences between traditional centralized web applications and decentralized Web3 technologies.

#### Bitcoin vs Ethereum

Compares Bitcoin's focus on decentralized digital value transfer with Ethereum's programmable blockchain and smart contract ecosystem.

#### Public Key vs Private Key

Explains the difference between information that can be shared and the secret credential used to authorize blockchain transactions.

#### Blockchain vs Traditional Database

Compares distributed blockchain-based records with centrally managed traditional databases.

Each comparison also includes a short "Key Idea" section to make the concept easier to understand.

---

## 3. Live Crypto Prices

The Live Prices page demonstrates how a frontend application can communicate with an external Web3 API.

### CoinGecko API

The application uses the CoinGecko public API to retrieve live cryptocurrency information.

No API key is required for the public endpoint used in this project.

### Data displayed

- Bitcoin current USD price
- Ethereum current USD price
- Bitcoin 24-hour percentage change
- Ethereum 24-hour percentage change
- Positive/negative price direction
- Refresh functionality

### API endpoint

```text
https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=usd&include_24hr_change=true