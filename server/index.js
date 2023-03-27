const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04448e1a4e3415ca8eb210b21008c628fc621ca6c0da954d45dc922474f9da698cd5a21a7b26841ea0d3e197a8635ad3775676c63addd76d2f416a9b2fc6a1f87c": 100,
  "0449c9f3698b37896fba10291daab21210e0084226961c435400897651210e340c5220c10056a1a5deba4e479e6d8ee3d710046a0ca17c1e0176a66b085bcbe68f": 50,
  "040b414e5c8df92705d91c45da44bf517e0b7c40ddaf656a8f2df5b9ea2d925fd75c64fde3d76164fae39af1c2345f7ee6b53b6f4d3f748e4dcae5f9a1d57ef2dd": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
