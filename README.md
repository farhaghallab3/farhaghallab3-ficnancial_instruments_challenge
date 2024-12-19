# Financial Instrument Display Web Application

## Project Overview
This project is a web application designed to display various financial instruments in an optimized, user-friendly interface. It is built with a focus on showcasing financial data, including different types of financial instruments, such as stocks, cryptocurrencies, commodities, and more. The application features three main sections (buttons) that allow users to view data related to **Exchange**, **Metadata**, and **Candle** for each financial instrument.

## Project Features
The application displays the following types of financial instruments:
- **Stock**
- **Cryptocurrency**
- **Exchange Traded Commodity (ETC)**
- **Exchange Traded Fund (ETF)**
- **Fund**
- **Index**
- **Commodity**
- **Mutual Fund**

Each financial instrument is represented with data from three unique JSON files: `exchange.json`, `metadata.json`, and `candle.json`. These files contain different data structures based on the instrument type and include essential details for each type, such as market information, historical data, and performance indicators. Each financial instrument is identified by either its **symbol** or **ISIN** (International Securities Identification Number).

## Key Features
- **Three Buttons on Home Page**: 
  - **Exchange**: Displays exchange-related information for the selected instrument.
  - **Metadata**: Displays metadata like the name, description, and category of the instrument.
  - **Candle**: Shows historical data in a candlestick chart format.

- **Responsive Design**: The website is designed to be fully responsive and accessible across all devices with appropriate media queries to optimize UI/UX.

## Technologies Used
- **Frontend**:
  - React: For building the user interface.
  - HTML/CSS: For structuring and styling the web page.
  - JavaScript: For interactive elements and data manipulation.
  - Docker: For containerizing the application and ensuring consistent environments.
  
- **Backend**:
  - Node.js: For handling server-side logic.
  - Express: For setting up the server and API endpoints.
  
- **Testing**:
  - **Cypress**: For end-to-end testing to ensure the functionality of the web application.
  - **Jest**: For unit testing and ensuring code quality.
  
- **Version Control**:
  - GitHub: For managing the codebase and version control.

- **CI/CD**:
  - GitHub Actions: For automating deployment and continuous integration.

## Setup Instructions

### 1. Clone the Repository
Clone this repository to your local machine:
```bash
git clone https://github.com/farhaghallab3/farhaghallab3-ficnancial_instruments_challenge
