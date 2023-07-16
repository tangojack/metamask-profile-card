
import React, { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import './Profile.css'
const Profile: React.FC = () => {
  const [wallet, setWallet] = useState({ accounts: [] })
  const [chainId, setChainId] = useState<number | null>(null)
  const [ensName, setEnsName] = useState<string | null>(null)
  const [ensAvatar, setEnsAvatar] = useState<string | null>(null)
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0))
  const [message, setMessage] = useState<string>("")
  const [signedMessage, setSignedMessage] = useState<string>("")
  // Injecting Web3 Provider provided by MetaMask
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const updateProfile = async () => {
    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts.length > 0) {
        setWallet({ accounts })
        const ensName = await provider.lookupAddress(accounts[0])
        setEnsName(ensName)
        if (ensName) {
          const ensAvatar = await provider.getAvatar(ensName)
          setEnsAvatar(ensAvatar)
        }
        const balance = await provider.getBalance(accounts[0]);
        setBalance(balance)
        const network = await provider.getNetwork()
        setChainId(network.chainId)
        setMessage("")
        setSignedMessage("")
      }
      else {
        // length 0 implies no connection to MetaMask
        setWallet({ accounts: [] })
      }
    }
    catch (error) {
      console.error("Error in updating profile: ", error)
    }
  }
  useEffect(() => {
    window.ethereum.on('accountsChanged', updateProfile)
    updateProfile()
    return () => {
      window.ethereum?.removeListener('accountsChanged', updateProfile)
    }
  }, [])

  const signMessage = async () => {
    const signedMessage = await signer.signMessage(message)
    setSignedMessage(signedMessage)
  }
  return (
    <div className="profile">
      {/* If there is no connection to MetaMask or no accounts in MetaMask or user has disconnected, show button */}
      {wallet.accounts.length == 0 && <button onClick={updateProfile} className="btn btn-primary">Connect to MetaMask and Show Wallet Info</button>}
      {/* accounts.length > 0 controls logic to show if connected to metamask or not since there is no api to check if we are connected to metamask */}
      {wallet.accounts.length > 0 &&
        <div className="card text-center">
          {ensAvatar && <img className="card-img-top" src={ensAvatar}></img>}
          <div className="card-body">
            {chainId && <p className="card-text"><b>Chain ID: </b>{chainId}</p>}
            {ensName && <p className="card-text"><b>ENS Name: </b>{ensName}</p>}
            <p className="card-text"><b>Address: </b>{wallet.accounts[0]}</p>
            <p className="card-text"><b>Balance: </b>{balance.toString()} ETH</p>
            <div className="input-group">
              <span className="input-group-text">Message: </span>
              <textarea value={message} onChange={(event) => setMessage(event.target.value)} className="form-control"></textarea>
              <button onClick={signMessage} className="btn btn-primary">Sign</button>
            </div>
            <br></br>
            <textarea value={signedMessage} className="form-control" readOnly></textarea>
            <br></br>
            <button onClick={() => setWallet({ accounts: [] })} className="btn btn-primary">Disconnect</button>
          </div>
        </div >
      }
    </div >
  );
};

export default Profile;