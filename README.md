<!-- MIT License>
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/eth-teamx/Rentify">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Rentify</h3>

  <p align="center">
    Fluidify rental contracts in a decentralised way.
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/eth-teamx/Rentify/BUG-TEMPLATE.md">Report Bug</a>
    ·
    <a href="https://github.com/eth-teamx/Rentify/FEATURE-REQUEST.md">Request Feature</a>
  </p>
</p>

<p align="center">
  <img src="images/cover.png" alt="cover" width="600" height="335">
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

One of the great things about holidays is to ease off your mind and enjoy your deserved free time without having to think about mundane practicalities. Sometimes, it is good to just pick a location and stay as much as you like without having to arrange everything beforehand.

That's why we have created *Rentify*. A decentralised platform that allows you to rent a property in a fluid way as we say, without any time limits just pay as you go on an hourly basis. The tenant can then enjoy a hassle-free rental experience while the landlord is paid continuously and is protected against accidental damage by a security deposit stored on the contract.
By investing the security deposit, *Rentify* can be financially self sustainable without having to rely on fees, thus making the whole platform completely free of charge to its users.

A few key features of the platform:
* completely decentralised
* privacy preserving
* security by default
* collateral deposit as insurance
* pay as you go, no hidden fees

### Built With

To bring Rentify to life we integrated the following awesome projects:

* [SuperFluid](https://www.superfluid.finance)
* [Torus](https://tor.us)
* [Aave](https://aave.com)
* [IPFS](https://ipfs.io/)
* And a sprinkle of *ReactJs*

In particular, *SuperFluid* allows us to create dynamic cashflows, *Torus* acts as the main user wallet also providing email and username data, security deposits are invested into *Aave*'s lending pools to generate interests to keep the app alive (and free!) while the data and images are stored on *IPFS*.


<!-- GETTING STARTED -->
## Getting Started

Deploy a local copy of the project and test it yourself.

### Prerequisites

To setup the development environment, run the following commands:

* npm
  ```sh
  npm install --global npm@latest
  ```

* yarn
  ```sh
  npm install --global yarn@latest
  ```

### Installation

To install the repository and run it locally:

1. Clone the repo
   ```sh
   git clone https://github.com/eth-teamx/Rentify.git
   ```
2. Install nodejs packages with *yarn*
   ```sh
   yarn install
   ```
3. Start the app with
   ```sh
   yarn start
   ```

<!-- USAGE EXAMPLES -->
## Usage

Using *Rentify* is very simple, just head off the [Homepage]() and login with your Torus wallet. On the _rent_ page you can see a list of all properties to let and their location pinpointed on a map while on the _let_ page you can list your property and start earning. Once a new tenant accepts the rental agreement you will both receive a welcome email to exchange contacts and you're good to go.
In the _dashboard_ you can find all your properties to let and the ones you're currently renting and eventually stop the rental agreement once you want to leave the guest house.

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/eth-teamx/Rentify/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request and describe your proposal

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Web Link: [Homepage]()

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [ReactJs](https://reactjs.org)
* [Ethereum](https://ethereum.org)
* [ETHGlobal](https://ethglobal.co)
* [Bootstrap](https://getbootstrap.com)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/eth-teamx/Rentify.svg?style=for-the-badge
[contributors-url]: https://github.com/eth-teamx/Rentify/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/eth-teamx/Rentify.svg?style=for-the-badge
[forks-url]: https://github.com/eth-teamx/Rentify/network/members
[stars-shield]: https://img.shields.io/github/stars/eth-teamx/Rentify.svg?style=for-the-badge
[stars-url]: https://github.com/eth-teamx/Rentify/stargazers
[issues-shield]: https://img.shields.io/github/issues/eth-teamx/Rentify.svg?style=for-the-badge
[issues-url]: https://github.com/eth-teamx/Rentify/issues
[license-shield]: https://img.shields.io/github/license/eth-teamx/Rentify.svg?style=for-the-badge
[license-url]: https://github.com/eth-teamx/Rentify/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.png