# MetaMask Profile Card

A project that connects to MetaMask and displays a simple profile card

# Workflow

Create a minimum config react app\
Add dependencies\
List states of Profile Component\
Programatically retrieve state using ethers.js API\
Configure JSX to show state\
CSS\
Functional testing of requirements\

# Notes

Unable to retrieve public key of Message. Having gone through the documentation, I could only find a way to retrieve using Wallet (a type of Signer) but to create a Wallet, one needs a private key
 
https://docs.ethers.org/v5/api/signer/#Wallet--properties

There is no way to programmatically Disconnect to MetaMask. There are just events that we can listen to such as accountsChanged. So I have configured the disconnect logic to set accounts as an empty array. Which is the inital state of the Profile Component

https://docs.metamask.io/wallet/reference/provider-api/#accountsChanged

# Dev Dependencies

typescript\
webpack webpack-cli webpack-dev-server css-loader html-webpack-plugin\ mini-css-extract-plugin ts-loader\

# Dependencies

react react-dom\
@types/react @types/react-dom\
ethers@5.7.2\

Bootstrap 5.3 used in this project. CDN added in index.html
Ethers 5.7.2 used since documentation isn't available for 6.6.4

# References

https://dev.to/alekseiberezkin/setting-up-react-typescript-app-without-create-react-app-oph

https://docs.ethers.org/v5/getting-started/

https://docs.metamask.io/wallet/
