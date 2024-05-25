
![Logo](https://i.ibb.co/tK5Dcnr/crypto-exhange-logo.png)

# 🪙 Crypto Exchange

This platform is the proposed MVP for a business test where the objective is to provide detailed information about the cryptocurrency market. It features an initially simple interface that clearly displays prices, trends, and real-time market value updates.


## 🧑🏻‍💻 Project Technologies

- ### VueJS (3.4)
    - VueJS was the chosen technology to create a responsive front-end for major mobile and desktop devices. In version 3, Vue presents a much simpler and more organized syntax for consuming APIs and creating clean, user-friendly interfaces. With a very simple structure masked through an object-oriented paradigm, Vue shines by properly separating the parameters and props that will be used dynamically within the component. It features functions that use parameters to alter information during rendering and in real-time on the screen.
- ### Tailwind
    - Tailwind greatly facilitates styling to achieve a syntactically clean and easily maintainable final result, both for responsiveness and for complex stylings of certain UI sections. The contribution of well-organized cascading styles transforms a project that might initially take around 2 to 3 weeks to reach its MVP, reducing the time to 3 or 4 days.
- ### Pinia
    - Pinia was the state management used to achieve the final result, facilitating data flow between the API and how it is consumed on the front end so that information is dynamically displayed and shared between the UI and the back end.
- ### Vite
    - Vite is a manager that enables quick initialization with only the necessary tools, featuring a pre-built initial template ready to be used in the project from the start.
- ### CoinGecko API
    - CoinGecko was the API selected by the team to consume the required data for the test. It provides precise information on various areas of the cryptocurrency market, from trends to currency volatility over specific periods, which can be queried using simple and clean query parameters. A total of 6 routes were consumed to deliver the MVP in question, providing information on selected currencies, line charts showing periods that can be selected by the end user, and displaying the depreciation or appreciation of the currency within the chosen timeframe.
## ⚙️ API routes used in the project

#### Route to fetch the chart history for the current time and the period selected by the user.


```http
  GET /coins/${coin}/market_chart/range?vs_currency=${currency}&from=${from_timestamp}&to=${to_timestamp}
```

| Parameters  | Type       | Default Value                          |
| :---------- | :--------- | :---------------------------------- |
| `coin` | `string` | bitcoin |
| `currency` | `string` | usd |
| `from_timestamp` | `number` | 1 day before the current date (UNIX Timestamp) |
| `to_timestamp` | `number` | current date (UNIX Timestamp) |

#### Route used to fetch precise information for the currency selected by the user.

```http
  GET /coins/${coin}
```

| Parameter   | Type      | Default Value                                   |
| :---------- | :--------- | :------------------------------------------ |
| `coin`      | `string` | bitcoin |

#### Route to fetch the top 15 most used currencies at the moment.

```http
  GET /search/trending
```

#### Note

Every route and other informations can be checked on [CoinGecko](https://docs.coingecko.com/reference/introduction)


## 🚀 Improvements

Due to time constraints and some limitations of the free version of the CoinGecko API, the project did not allow for the full expansion of the initial test objective. These limitations included additional market information and reactions based on cryptocurrency usage, which are permitted within the API routes. As CoinGecko allows users of the demo version of the API to make 30 requests per minute, we successfully achieved our goal while working within these limits.

With that said, the improvements for a second sprint, aimed at delivering features related to the crypto market, are partially implemented in the code. These improvements are represented by the components currently commented out within pages/Home.vue. The 'CompanyHoldings' component displays the currencies currently used by companies and their major applications, while 'CoinCategory' presents the currencies used and created by specific companies.


## 🏋️ API routes used aiming for a second sprint

#### Route used to display the companies that use a certain currency within their investments.


```http
  GET /companies/public_treasury/${coin}
```

| Parâmetro   | Type       | Default Value                          |
| :---------- | :--------- | :---------------------------------- |
| `coin` | `string` | bitcoin |

#### Route that displays global data about cryptocurrencies.

```http
  GET /global
```

#### Route that displays the corresponding categories of the currencies.

```http
  GET /coins/categories
```


## 🎯 Project Specifications
In this project, there were several obstacles related to requests, responsiveness, and code optimization for easy and quick understanding. The entire code was designed for a low learning curve, allowing developers to easily add new features or fixes.

- ### Problem: Request Limit
    - **Solution:** To ensure that requests do not fail to display in their last state within the application, a cache manager was implemented during the API call. This way, when the user enters the site and updates information, they will not miss seeing the data as it will be saved in its initial state in case the API returns an error.
- ### Problem: Responsiveness
    - **Solution:** To ensure users have no issues with quick and direct data visualization, a playful approach was taken in presenting the data with direct text separated lightly with emojis and key information emphasized in bold text, catering to the end user's interests.
## Project Initialization

To initiate the project, open your bash within the project folder and start with:

```bash
  npm install
  or
  yarn
```

To run the tests:

```bash
  npm run uitest
  or
  yarn run uitest
```

To start the project:

```bash
  npm run dev
  or
  yarn run dev
```
## 🧑🏻‍🎨 Author

- [Pedro Lucas Lopes Paraguai](https://www.github.com/PedroLucasLopes)
I have always been determined about what I want as a developer, curious to learn new technologies, and deepen my knowledge in those I work with. Five years ago, I entered the market aiming to showcase my potential by bringing innovations to both Front-end and Back-end realms within the web.


## Tags
![Javascript](https://img.shields.io/badge/-Javascript-grey?logo=javascript)
![Typescript](https://img.shields.io/badge/Typescript-grey?logo=typescript)
![Yarn](https://img.shields.io/badge/Yarn-grey?logo=yarn)
![Git](https://img.shields.io/badge/Git-grey?logo=git)
![Yarn](https://img.shields.io/badge/Github-grey?logo=github)
![Netlify](https://img.shields.io/badge/Netlify-grey?logo=netlify)
![Playwright](https://img.shields.io/badge/Playwright-grey?logo=playwright)
![Jest](https://img.shields.io/badge/Jest-grey?logo=jest)
![VueJS](https://img.shields.io/badge/VueJS-grey?logo=vuedotjs)

