# WorkEth: A Blockchain-Powered Employee Engagement Platform

**Ndou, M.** (University of Venda)  
**Aroua, B.E.** (Higher School of Digital Economy, University of Manouba)  
**Dove, J.** (University of Cape Town)  
**Dube, S.** (University of Johannesburg)  

**Summer School:** Deep Dive into Blockchain 2025  
**Date:** 17 July 2024  


## Abstract

Employee engagement is a critical driver of productivity, retention, and workplace culture. Yet, existing platforms often fall short for digitally native employees who demand transparency and real-time recognition. WorkEth addresses this by introducing a gamified, blockchain-powered engagement platform built on the UZH Ethereum testnet. With tokenisation, smart contracts, and decentralized governance, it enables transparent, auditable, and peer-driven rewards—bridging the gap between effort and recognition.


## 1. Introduction

Traditional performance review and recognition systems are often infrequent, top-down, and disconnected from employees’ daily contributions. This is especially problematic for younger employees accustomed to real-time, interactive feedback. WorkEth introduces a blockchain-based solution that uses ERC-20 tokens, smart contracts, and gamified elements to offer peer and manager-issued rewards in real time. The result is a workplace culture grounded in transparency, accountability, and continuous appreciation.


## 2. Technical Solution

### 2.1 Architecture and Technical Stack

- **Frontend:** HTML, CSS, TypeScript  
- **Frameworks:** React, MUI  
- **Blockchain:** UZH Ethereum PoW testnet  
- **Smart Contracts:** ERC-20 standard (developed in Remix)  
- **Wallet Integration:** MetaMask  
- **Logic:** Fully client-side with wallet connection, balance display, and token transfer  
- **Limitations:** No smart contract event tracking (no frontend transaction history)

### 2.2 Key Features

- Simple interface for connecting MetaMask wallets  
- View live token balances  
- Peer-to-peer and manager token distribution  
- Redeem tokens for real-world perks via a store interface  
- HR analytics: track historical token movement to assess engagement  
- Designed and deployed by a non-technical team within days


## 3. Business Analysis

### 3.1 Market Analysis

- The global employee engagement software market is projected to grow from **$1.05B (2024)** to **$2.6B (2030)**.  
- WorkEth targets remote-first, mid-to-large firms—especially in emerging digital economies.  
- Competitors like Bonusly, Achievers, and Motivosity offer centralized point-based systems.  
- WorkEth’s blockchain foundation allows transparency, smart contracts, and decentralized participation.

### 3.2 Competitor Comparison

| Feature           | WorkEth                          | Bonusly                 | Achievers              | Motivosity             |
|-------------------|----------------------------------|--------------------------|-------------------------|-------------------------|
| Technology        | Blockchain, decentralized        | Centralized, point-based| Centralized, point-based| Centralized, point-based|
| Transparency      | Fully on-chain, auditable        | Internal only            | Internal only           | Internal only           |
| Recognition       | Peer + Manager tokens            | Peer + Manager points    | Mostly manager-driven   | Peer + Manager points   |
| Customization     | Smart contracts, gamified quests | Basic                    | Basic                   | Moderate                |
| Innovation Edge   | Web3 governance, token economy   | Traditional SaaS         | Traditional SaaS        | Traditional SaaS        |


### 3.3 SWOT Analysis

#### Strengths
- Transparent, fair reward system using blockchain.
- Gamified features enhance engagement and motivation.
- Peer-to-peer recognition empowers employees and builds culture.
- Real-time analytics provide actionable HR insights.

#### Weaknesses
- Learning curve for employees unfamiliar with Web3 tools.
- Dependence on vendor partnerships for meaningful real-world perks.
- Potential skepticism if perceived as gimmicky or adding extra work.

#### Opportunities
- Expansion through HR software integrations and vendor networks.
- Rising demand for engagement and recognition solutions globally.
- Positioning as a pioneer in decentralized workplace innovation.

#### Threats
- Regulatory uncertainties (taxable benefits, labor laws across regions).
- Competition from established HR platforms adding Web3 features.
- Security vulnerabilities if smart contracts are not carefully audited.


### 3.4 Business Model

**WorkEth is a SaaS platform with the following revenue streams:**

- **Monthly subscription:** e.g. $5/user/month  
- **Premium add-ons:**  
  - Gamification packs (badges, quests)  
  - Wellness vendor integrations  
  - Advanced HR analytics API  
- **Token top-ups:** Additional WRKTH tokens purchasable by companies  
- **Redemption fees:** Small charge on tokens redeemed with third-party vendors

**Why companies will pay:**

- Boosts morale and retention, reducing hiring costs  
- Increases productivity via real-time peer recognition  
- Automates HR recognition workflows  
- Offers data-driven insights into employee engagement


### 3.5 Revenue Projections

For a company with 100 employees:

- **Base revenue:** $6,000/year  
- **Add-ons:**  
  - Gamification: $1,200/year  
  - Analytics: $1,000/year  
  - Vendor commissions: $500/year  
- **Total potential revenue per client:** $8,700/year

A 5% improvement in retention could save ~$50,000/year, resulting in 5–10x ROI for clients.


### 3.6 Tokenomics

**Token:** WRKTH  
**Type:** Non-tradable, internal utility token  
**Distribution per 1,000 WRKTH/month (for 50 users):**

- 60% for manager rewards  
- 30% for peer-to-peer recognition  
- 10% for team quests/milestones  

**Example Redemption Rates:**

- 10 WRKTH = Coffee voucher  
- 50 WRKTH = Extra day off  
- 100 WRKTH = Wellness activity  

Tokens are configurable by employer and remain internal to avoid speculation or legal risk.


### 3.7 Governance & Social Design

- DAO-style voting for token policies and reward rules  
- Gamified elements: leaderboards, quests, milestone NFTs  
- Low-code HR admin tools, onboarding sandbox  
- Custodial wallets by default, optional self-custody for advanced users  
- Privacy by design and consent-based linking between users and wallets


## 4. Legal & Ethical Considerations

- **Tax:** WRKTH may qualify as fringe benefits; subject to jurisdiction  
- **Privacy:** Compliant with GDPR and POPIA through consent protocols  
- **Security:** Smart contracts audited (MythX, Slither)  
- **Ethics:**  
  - Avoids peer pressure through UX safeguards  
  - Prevents bias/favouritism in recognition  
  - Ensures fair, transparent, and inclusive token distribution  
  - On-chain metadata for attribution of contributions


## 5. Summary

WorkEth offers a blockchain-based platform to make employee recognition transparent, equitable, and engaging. It leverages smart contracts and peer-based systems to foster real-time feedback and morale. With clear business value, customizable tokens, and compliance-by-design, WorkEth represents a sustainable innovation in the HR tech space.


## 6. Author Contributions

- **Aroua, B.E.** – Business model and revenue analysis  
- **Ndou, M.** – Regulatory and legal insights  
- **Dove, J.** – Technical development and smart contracts  
- **Dube, S.** – Editing, formatting, and quality review


## 7. References

- Daly, D. (2024). *Cryptoassets and Employee Incentives – UK Tax Primer*. Goodwin.  
- Ethereum Foundation (2025). *Introduction to Smart Contracts*.  
- Flynn et al. (2025). *Global Human Capital Trends*. Deloitte.  
- Gallup (2025). *State of the Global Workplace*.  
- Grand View Research (2024). *Employee Engagement Software Market*.  
- Hamari et al. (2014). *Does Gamification Work?*.  
- Hauw, G. (2024). *Tokenization and Future Finance*.  
- Iqbal & Matulevičius (2019). *Blockchain Application Risks*.  
- OECD (2020). *Taxing Virtual Currencies*.  
- Pendell, R. (2023). *Employee Engagement Crisis*. Gallup.  
- SHRM Labs (n.d.). *Automating HR with a Human Touch*.  
- Truong et al. (2020). *GDPR-Compliant Blockchain*.  
- Zafar, A. (2025). *Blockchain and Data Protection Laws*. Journal of Cybersecurity.
