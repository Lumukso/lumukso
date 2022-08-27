/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  LumuksoSocialRecovery,
  LumuksoSocialRecoveryInterface,
} from "../LumuksoSocialRecovery";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract UniversalProfile",
        name: "profile",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "faultTolerance",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "guardian",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "expiration",
        type: "uint256",
      },
    ],
    name: "PendingGuardianAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "guardian",
        type: "address",
      },
    ],
    name: "PendingGuardianConfirmed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "recoveryProcessId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "voter",
        type: "address",
      },
    ],
    name: "VoteCast",
    type: "event",
  },
  {
    inputs: [],
    name: "account",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newGuardian",
        type: "address",
      },
    ],
    name: "addGuardian",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "guardian",
        type: "address",
      },
    ],
    name: "addPendingGuardian",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "guardian",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "confirmPendingGuardian",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "recoverProcessId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "countVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "guardian",
        type: "address",
      },
    ],
    name: "getConfirmationMessage",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "recoverProcessId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "guardian",
        type: "address",
      },
    ],
    name: "getGuardianVote",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getGuardians",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getGuardiansThreshold",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getInvitations",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "guardian",
        type: "address",
      },
    ],
    name: "getPendingGuardianExpiration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRecoverProcessesIds",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "isGuardian",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pendingGuardian",
        type: "address",
      },
    ],
    name: "isInvited",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "recoverProcessId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "isThresholdMet",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "recoveryProcessId",
        type: "bytes32",
      },
    ],
    name: "isValidRecoveryProcessId",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "pendingGuardians",
    outputs: [
      {
        internalType: "address",
        name: "guardian",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "expiration",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "recoverProcessId",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "plainSecret",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "newHash",
        type: "bytes32",
      },
    ],
    name: "recoverOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "recoveryProcessIds",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "currentGuardian",
        type: "address",
      },
    ],
    name: "removeGuardian",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "newHash",
        type: "bytes32",
      },
    ],
    name: "setSecret",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newThreshold",
        type: "uint256",
      },
    ],
    name: "setThreshold",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "_interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "recoverProcessId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "voteToRecover",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002809380380620028098339810160408190526200003491620000f8565b600180546001600160a01b0319166001600160a01b03841617905581620000678162000091602090811b62000f2417901c565b50620000758160026200015d565b6200008290600162000189565b60ff1660025550620001ab9050565b6000546001600160a01b03828116911614620000f557600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a3505b50565b600080604083850312156200010c57600080fd5b82516001600160a01b03811681146200012457600080fd5b602084015190925060ff811681146200013c57600080fd5b809150509250929050565b634e487b7160e01b600052601160045260246000fd5b600060ff821660ff84168160ff048111821515161562000181576200018162000147565b029392505050565b60ff8181168382160190811115620001a557620001a562000147565b92915050565b61264e80620001bb6000396000f3fe608060405234801561001057600080fd5b50600436106101a95760003560e01c806371404156116100f9578063a526d83b11610097578063d4adf36211610071578063d4adf362146103b6578063d72e76df146103f9578063f20499e814610425578063f2fde38b1461043857600080fd5b8063a526d83b14610370578063b31b41e014610383578063c42e3ed5146103a357600080fd5b80637a118daf116100d35780637a118daf146103265780638da5cb5b146103395780638e59474a1461034a578063960bfe041461035d57600080fd5b806371404156146102f8578063715018a61461030b578063733782a91461031357600080fd5b80631dcbe500116101665780633f6e9749116101405780633f6e9749146102a557806355bd2980146102a55780635dab2420146102ba578063624d7ffb146102e557600080fd5b80631dcbe5001461022d5780632d1836f81461024057806335a9c82f1461029257600080fd5b806301ffc9a7146101ae5780630665f04b146101d65780630c68ba21146101eb57806316845714146101fe578063187c5348146102065780631c2c8f5714610218575b600080fd5b6101c16101bc366004611f70565b61044b565b60405190151581526020015b60405180910390f35b6101de610482565b6040516101cd9190611f8d565b6101c16101f9366004611fef565b610493565b6101de6104a0565b6002545b6040519081526020016101cd565b61022b6102263660046120b9565b6104ac565b005b6101c161023b366004611fef565b610816565b61027361024e366004611fef565b600960205260009081526040902080546001909101546001600160a01b039091169082565b604080516001600160a01b0390931683526020830191909152016101cd565b61022b6102a036600461211d565b610823565b6102ad61087f565b6040516101cd9190612171565b6001546102cd906001600160a01b031681565b6040516001600160a01b0390911681526020016101cd565b61022b6102f3366004612184565b61089c565b61022b610306366004611fef565b610a3e565b61022b610b2e565b61022b610321366004611fef565b610b42565b61022b6103343660046121e8565b610bf3565b6000546001600160a01b03166102cd565b61020a6103583660046121e8565b610c8b565b61022b61036b36600461211d565b610d15565b61022b61037e366004611fef565b610da4565b610396610391366004611fef565b610e1e565b6040516101cd9190612268565b6101c16103b13660046121e8565b610e78565b6102cd6103c43660046121e8565b60035460009081526005602090815260408083209483529381528382206001600160a01b039384168352905291909120541690565b61020a610407366004611fef565b6001600160a01b031660009081526009602052604090206001015490565b6101c161043336600461211d565b610e90565b61022b610446366004611fef565b610eab565b60006001600160e01b0319821663cb81043b60e01b148061047c57506301ffc9a760e01b6001600160e01b03198316145b92915050565b606061048e6007610f89565b905090565b600061047c600783610f9d565b606061048e600a610f89565b6104b7600a83610f9d565b6104ff5760405162461bcd60e51b815260206004820152601460248201527311d550549112505397d393d517d253959255115160621b60448201526064015b60405180910390fd5b6001600160a01b03808316600081815260096020526040902054909116146105695760405162461bcd60e51b815260206004820152601860248201527f494e56414c49445f50454e44494e475f475541524449414e000000000000000060448201526064016104f6565b6001600160a01b03821660009081526009602052604090206001015442106105d35760405162461bcd60e51b815260206004820152601860248201527f50454e44494e475f475541524449414e5f45585049524544000000000000000060448201526064016104f6565b6001600160a01b0382163b1515801561065657506040516301ffc9a760e01b8152630b135d3f60e11b60048201526001600160a01b038316906301ffc9a790602401602060405180830381865afa158015610632573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610656919061227b565b1561073257630b135d3f60e11b6001600160a01b038316631626ba7e61068361067e86610e1e565b610fbf565b846040518363ffffffff1660e01b81526004016106a192919061229d565b602060405180830381865afa1580156106be573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106e291906122b6565b6001600160e01b0319161461072d5760405162461bcd60e51b815260206004820152601160248201527014d251d3905515549157d2539590531251607a1b60448201526064016104f6565b61079c565b816001600160a01b03166107528261074c61067e86610e1e565b90610ffa565b6001600160a01b03161461079c5760405162461bcd60e51b815260206004820152601160248201527014d251d3905515549157d2539590531251607a1b60448201526064016104f6565b6107a7600a8361101e565b506001600160a01b038216600090815260096020526040812080546001600160a01b0319168155600101556107dd600783611033565b506040516001600160a01b038316907f6aeafaeb9d36be3b604b139c3ffda6390c2e5787c08168bfbf3ebc357e3d519e90600090a25050565b600061047c600a83610f9d565b61082b611048565b80806108795760405162461bcd60e51b815260206004820181905260248201527f53656372657420486173682063616e6e6f74206265206279746573333228302960448201526064016104f6565b50600455565b600354600090815260066020526040902060609061048e906110b1565b80806108ea5760405162461bcd60e51b815260206004820181905260248201527f53656372657420486173682063616e6e6f74206265206279746573333228302960448201526064016104f6565b6108f484846110bc565b60048281556003805460019081019091555460408051638da5cb5b60e01b815290516000936001600160a01b0390931692638da5cb5b928082019260209290918290030181865afa15801561094d573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061097191906122d3565b90506109848163c403d48f60e01b6111f0565b6109ea5760405162461bcd60e51b815260206004820152603160248201527f4f776e6572206f66206163636f756e7420646f65736e277420737570706f7274604482015270081314d40d88125b9d195c999858d95259607a1b60648201526084016104f6565b60015460408051617fbf60208201526000928392610a25926001600160a01b03909216913391016040516020818303038152906040526112d9565b91509150610a3483838361155b565b5050505050505050565b610a46611048565b610a51600782610f9d565b610aa85760405162461bcd60e51b815260206004820152602260248201527f50726f76696465642061646472657373206973206e6f7420612067756172646960448201526130b760f11b60648201526084016104f6565b600254610ab56007611619565b11610b1f5760405162461bcd60e51b815260206004820152603460248201527f477561726469616e73206e756d6265722063616e206e6f74206265206c6f77656044820152731c881d1a185b881d1a19481d1a1c995cda1bdb1960621b60648201526084016104f6565b610b2a60078261101e565b5050565b610b36611048565b610b406000610f24565b565b610b4a611048565b610b55600a82611033565b506040518060400160405280826001600160a01b031681526020014262093a80610b7f9190612306565b90526001600160a01b03828116600081815260096020908152604091829020855181546001600160a01b031916951694909417845593840151600190930183905551918252917f64f461c7505c2f7383d025fa3f18fb6c1e3fb2c800da52163d09493256efa1d6910160405180910390a250565b610bfe600733610f9d565b610c455760405162461bcd60e51b815260206004820152601860248201527721b0b63632b91034b9903737ba10309033bab0b93234b0b760411b60448201526064016104f6565b610c4f8282611623565b60405133906001600160a01b0383169084907f2c997ea55aa73539e02cfab572b9fad413a324a83475795fc4907756a31d461090600090a45050565b6003546000908180610c9d6007611619565b905060005b81811015610d0a5760008481526005602090815260408083208a845290915281206001600160a01b03881691610cd96007856116d3565b6001600160a01b0390811682526020820192909252604001600020541603610d02576001909201915b600101610ca2565b509095945050505050565b610d1d611048565b610d276007611619565b8111158015610d365750600081115b610d9f5760405162461bcd60e51b815260206004820152603460248201527f5468726573686f6c642073686f756c64206265206265747765656e203120616e60448201527319081d1a194819dd585c991a585b9cd0dbdd5b9d60621b60648201526084016104f6565b600255565b610dac611048565b610db7600782610f9d565b15610e135760405162461bcd60e51b815260206004820152602660248201527f50726f7669646564206164647265737320697320616c7265616479206120677560448201526530b93234b0b760d11b60648201526084016104f6565b610b2a600782611033565b6001600160a01b038116600090815260096020526040902060010154606090610e46906116df565b610e513060146117e8565b604051602001610e62929190612319565b6040516020818303038152906040529050919050565b6000600254610e878484610c8b565b10159392505050565b600354600090815260066020526040812061047c9083611984565b610eb3611048565b6001600160a01b038116610f185760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016104f6565b610f2181610f24565b50565b6000546001600160a01b03828116911614610f2157600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60606000610f968361199c565b9392505050565b6001600160a01b03811660009081526001830160205260408120541515610f96565b6000610fcb82516116df565b82604051602001610fdd9291906123b8565b604051602081830303815290604052805190602001209050919050565b600080600061100985856119f8565b9150915061101681611a66565b509392505050565b6000610f96836001600160a01b038416611c1c565b6000610f96836001600160a01b038416611d0f565b3361105b6000546001600160a01b031690565b6001600160a01b031614610b405760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104f6565b606061047c8261199c565b6003546000806110cc6007611619565b905060005b81811015611130576000848152600560209081526040808320898452909152812033916110ff6007856116d3565b6001600160a01b0390811682526020820192909252604001600020541603611128576001909201915b6001016110d1565b506002548210156111835760405162461bcd60e51b815260206004820152601d60248201527f596f75206469646e7420726561636820746865207468726573686f6c6400000060448201526064016104f6565b600454846040516020016111979190612413565b60405160208183030381529060405280519060200120146111e95760405162461bcd60e51b815260206004820152600c60248201526b15dc9bdb99c81cd958dc995d60a21b60448201526064016104f6565b5050505050565b604080516001600160e01b0319831660248083019190915282518083039091018152604490910182526020810180516001600160e01b03166301ffc9a760e01b179052905160009190829081906001600160a01b0387169061753090611257908690612413565b6000604051808303818686fa925050503d8060008114611293576040519150601f19603f3d011682016040523d82523d6000602084013e611298565b606091505b50915091506020815110156112b3576000935050505061047c565b8180156112cf5750808060200190518101906112cf919061227b565b9695505050505050565b604080516003808252608082019092526060918291906020820183803683370190505060408051600380825260808201909252919350816020015b6060815260200190600190039081611314579050506040516354f6127f60e01b81527fdf30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e360048201529091506000906001600160a01b038716906354f6127f90602401600060405180830381865afa158015611393573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526113bb919081019061242f565b6113c49061249d565b905060006113d3826001612306565b90507fdf30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e360001b8460008151811061140c5761140c6124c4565b6020026020010181815250508060405160200161142b91815260200190565b6040516020818303038152906040528360008151811061144d5761144d6124c4565b60209081029190910101526114827fdf30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e383611d5e565b84600181518110611495576114956124c4565b602002602001018181525050856040516020016114ca919060609190911b6bffffffffffffffffffffffff1916815260140190565b604051602081830303815290604052836001815181106114ec576114ec6124c4565b60200260200101819052506115136b4b80742de2bf82acb363000060a01b8760601b611db4565b84600281518110611526576115266124c4565b6020026020010181815250508483600281518110611546576115466124c4565b60200260200101819052505050935093915050565b6060600083836040516024016115729291906124da565b60408051601f198184030181529181526020820180516001600160e01b03166314a6e29360e01b179052516304e2f55f60e11b81529091506001600160a01b038616906309c5eabe906115c9908490600401612268565b6000604051808303816000875af11580156115e8573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052611610919081019061242f565b95945050505050565b600061047c825490565b61162e600733610f9d565b6116755760405162461bcd60e51b815260206004820152601860248201527721b0b63632b91034b9903737ba10309033bab0b93234b0b760411b60448201526064016104f6565b60035460008181526006602052604090206116909084611dfe565b50600090815260056020908152604080832094835293815283822033835290529190912080546001600160a01b0319166001600160a01b03909216919091179055565b6000610f968383611e0a565b6060816000036117065750506040805180820190915260018152600360fc1b602082015290565b8160005b8115611730578061171a8161254c565b91506117299050600a8361257b565b915061170a565b60008167ffffffffffffffff81111561174b5761174b61200c565b6040519080825280601f01601f191660200182016040528015611775576020820181803683370190505b5090505b84156117e05761178a60018361258f565b9150611797600a866125a2565b6117a2906030612306565b60f81b8183815181106117b7576117b76124c4565b60200101906001600160f81b031916908160001a9053506117d9600a8661257b565b9450611779565b949350505050565b606060006117f78360026125b6565b611802906002612306565b67ffffffffffffffff81111561181a5761181a61200c565b6040519080825280601f01601f191660200182016040528015611844576020820181803683370190505b509050600360fc1b8160008151811061185f5761185f6124c4565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061188e5761188e6124c4565b60200101906001600160f81b031916908160001a90535060006118b28460026125b6565b6118bd906001612306565b90505b6001811115611935576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106118f1576118f16124c4565b1a60f81b828281518110611907576119076124c4565b60200101906001600160f81b031916908160001a90535060049490941c9361192e816125d5565b90506118c0565b508315610f965760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016104f6565b60008181526001830160205260408120541515610f96565b6060816000018054806020026020016040519081016040528092919081815260200182805480156119ec57602002820191906000526020600020905b8154815260200190600101908083116119d8575b50505050509050919050565b6000808251604103611a2e5760208301516040840151606085015160001a611a2287828585611e34565b94509450505050611a5f565b8251604003611a575760208301516040840151611a4c868383611f21565b935093505050611a5f565b506000905060025b9250929050565b6000816004811115611a7a57611a7a6125ec565b03611a825750565b6001816004811115611a9657611a966125ec565b03611ae35760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e6174757265000000000000000060448201526064016104f6565b6002816004811115611af757611af76125ec565b03611b445760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e6774680060448201526064016104f6565b6003816004811115611b5857611b586125ec565b03611bb05760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b60648201526084016104f6565b6004816004811115611bc457611bc46125ec565b03610f215760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b60648201526084016104f6565b60008181526001830160205260408120548015611d05576000611c4060018361258f565b8554909150600090611c549060019061258f565b9050818114611cb9576000866000018281548110611c7457611c746124c4565b9060005260206000200154905080876000018481548110611c9757611c976124c4565b6000918252602080832090910192909255918252600188019052604090208390555b8554869080611cca57611cca612602565b60019003818190600052602060002001600090559055856001016000868152602001908152602001600020600090556001935050505061047c565b600091505061047c565b6000818152600183016020526040812054611d565750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915561047c565b50600061047c565b600080611da9848460801b604080516fffffffffffffffffffffffffffffffff1980851660208301528316603082015260609101604051602081830303815290604052905092915050565b90506117e08161249d565b604080516001600160a01b0319841660208201526bffffffffffffffffffffffff198316602c8201526000918291016040516020818303038152906040529050806117e09061249d565b6000610f968383611d0f565b6000826000018281548110611e2157611e216124c4565b9060005260206000200154905092915050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115611e6b5750600090506003611f18565b8460ff16601b14158015611e8357508460ff16601c14155b15611e945750600090506004611f18565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015611ee8573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116611f1157600060019250925050611f18565b9150600090505b94509492505050565b6000806001600160ff1b03831681611f3e60ff86901c601b612306565b9050611f4c87828885611e34565b935093505050935093915050565b6001600160e01b031981168114610f2157600080fd5b600060208284031215611f8257600080fd5b8135610f9681611f5a565b6020808252825182820181905260009190848201906040850190845b81811015611fce5783516001600160a01b031683529284019291840191600101611fa9565b50909695505050505050565b6001600160a01b0381168114610f2157600080fd5b60006020828403121561200157600080fd5b8135610f9681611fda565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561204b5761204b61200c565b604052919050565b600067ffffffffffffffff82111561206d5761206d61200c565b50601f01601f191660200190565b600061208e61208984612053565b612022565b90508281528383830111156120a257600080fd5b828260208301376000602084830101529392505050565b600080604083850312156120cc57600080fd5b82356120d781611fda565b9150602083013567ffffffffffffffff8111156120f357600080fd5b8301601f8101851361210457600080fd5b6121138582356020840161207b565b9150509250929050565b60006020828403121561212f57600080fd5b5035919050565b600081518084526020808501945080840160005b838110156121665781518752958201959082019060010161214a565b509495945050505050565b602081526000610f966020830184612136565b60008060006060848603121561219957600080fd5b83359250602084013567ffffffffffffffff8111156121b757600080fd5b8401601f810186136121c857600080fd5b6121d78682356020840161207b565b925050604084013590509250925092565b600080604083850312156121fb57600080fd5b82359150602083013561220d81611fda565b809150509250929050565b60005b8381101561223357818101518382015260200161221b565b50506000910152565b60008151808452612254816020860160208601612218565b601f01601f19169290920160200192915050565b602081526000610f96602083018461223c565b60006020828403121561228d57600080fd5b81518015158114610f9657600080fd5b8281526040602082015260006117e0604083018461223c565b6000602082840312156122c857600080fd5b8151610f9681611f5a565b6000602082840312156122e557600080fd5b8151610f9681611fda565b634e487b7160e01b600052601160045260246000fd5b8082018082111561047c5761047c6122f0565b7f6f7065726174696f6e3d636f6e6669726d50656e64696e67477561726469616e8152742665787069726174696f6e54696d657374616d703d60581b60208201526000835161236f816035850160208801612218565b7f26736f6369616c5265636f76657279416464726573733d00000000000000000060359184019182015283516123ac81604c840160208801612218565b01604c01949350505050565b7f19457468657265756d205369676e6564204d6573736167653a0a0000000000008152600083516123f081601a850160208801612218565b83519083019061240781601a840160208801612218565b01601a01949350505050565b60008251612425818460208701612218565b9190910192915050565b60006020828403121561244157600080fd5b815167ffffffffffffffff81111561245857600080fd5b8201601f8101841361246957600080fd5b805161247761208982612053565b81815285602083850101111561248c57600080fd5b611610826020830160208601612218565b805160208083015191908110156124be576000198160200360031b1b821691505b50919050565b634e487b7160e01b600052603260045260246000fd5b6040815260006124ed6040830185612136565b6020838203818501528185518084528284019150828160051b85010183880160005b8381101561253d57601f1987840301855261252b83835161223c565b9486019492509085019060010161250f565b50909998505050505050505050565b60006001820161255e5761255e6122f0565b5060010190565b634e487b7160e01b600052601260045260246000fd5b60008261258a5761258a612565565b500490565b8181038181111561047c5761047c6122f0565b6000826125b1576125b1612565565b500690565b60008160001904831182151516156125d0576125d06122f0565b500290565b6000816125e4576125e46122f0565b506000190190565b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052603160045260246000fdfea2646970667358221220c3e8ddd211dc1b0626399b17bc0197d487cca3981c5f85dc7f700f839c5834b864736f6c63430008100033";

type LumuksoSocialRecoveryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LumuksoSocialRecoveryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LumuksoSocialRecovery__factory extends ContractFactory {
  constructor(...args: LumuksoSocialRecoveryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    profile: PromiseOrValue<string>,
    faultTolerance: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<LumuksoSocialRecovery> {
    return super.deploy(
      profile,
      faultTolerance,
      overrides || {}
    ) as Promise<LumuksoSocialRecovery>;
  }
  override getDeployTransaction(
    profile: PromiseOrValue<string>,
    faultTolerance: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(profile, faultTolerance, overrides || {});
  }
  override attach(address: string): LumuksoSocialRecovery {
    return super.attach(address) as LumuksoSocialRecovery;
  }
  override connect(signer: Signer): LumuksoSocialRecovery__factory {
    return super.connect(signer) as LumuksoSocialRecovery__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LumuksoSocialRecoveryInterface {
    return new utils.Interface(_abi) as LumuksoSocialRecoveryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LumuksoSocialRecovery {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as LumuksoSocialRecovery;
  }
}
