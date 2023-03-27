import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1';
import { toHex } from 'ethereum-cryptography/utils';

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey)
    const address = toHex(secp.getPublicKey(privateKey))
    setAddress(address)
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <select onChange={onChange} className="balance">
          <option value="40b004ffdc550827d5daf7fc3adff1c58ac0d95d247a2efc2bf748d815fc26c9">40b004ffdc550827d5daf7fc3adff1c58ac0d95d247a2efc2bf748d815fc26c9</option>
          <option value="56ec7292f4ce0b9dc5e6871416d83c8fc89cd8e4b7ebe5fe7f9b67ff96cca8d4">56ec7292f4ce0b9dc5e6871416d83c8fc89cd8e4b7ebe5fe7f9b67ff96cca8d4</option>
          <option value="463b2f8d529951a8dcc9f6a28be76ca78b2e71c4c9615405a0e275b3cf257d28">463b2f8d529951a8dcc9f6a28be76ca78b2e71c4c9615405a0e275b3cf257d28</option>
        </select>
      </label>

      <div className="balance">
        Address: {address.slice(0, 10)}...
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
