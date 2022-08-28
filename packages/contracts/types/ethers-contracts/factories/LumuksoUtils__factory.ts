/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { LumuksoUtils, LumuksoUtilsInterface } from "../LumuksoUtils";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract UniversalProfile",
        name: "profile",
        type: "address",
      },
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "checkProfileAccessRecovered",
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
        internalType: "contract UniversalProfile",
        name: "profile",
        type: "address",
      },
      {
        internalType: "contract LumuksoSocialRecovery",
        name: "socialRecovery",
        type: "address",
      },
    ],
    name: "checkSocialRecoveryPermissions",
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
        internalType: "contract UniversalProfile",
        name: "profile",
        type: "address",
      },
      {
        internalType: "contract LumuksoSocialRecovery",
        name: "socialRecovery",
        type: "address",
      },
    ],
    name: "getSocialRecoveryPermissionKeyValues",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
      {
        internalType: "bytes[]",
        name: "",
        type: "bytes[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061074e806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80631ab4202914610046578063a9fd03221461006e578063d467ad471461008f575b600080fd5b6100596100543660046104ea565b6100a2565b60405190151581526020015b60405180910390f35b61008161007c3660046104ea565b6100c2565b604051610065929190610547565b61005961009d3660046104ea565b6100fd565b6000806100af8484610118565b90506026808216145b9150505b92915050565b6060806100f284846040516020016100de906026815260200190565b6040516020818303038152906040526101b3565b915091509250929050565b60008061010a8484610118565b9050617fbf808216146100b8565b6000806001600160a01b0384166354f6127f610145694b80742de2bf82acb36360b01b606087901b610488565b6040518263ffffffff1660e01b815260040161016391815260200190565b600060405180830381865afa158015610180573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526101a8919081019061060d565b90506100b8816106ba565b604080516003808252608082019092526060918291906020820183803683370190505060408051600380825260808201909252919350816020015b60608152602001906001900390816101ee579050506040516354f6127f60e01b81527fdf30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e360048201529091506000906001600160a01b038716906354f6127f90602401600060405180830381865afa15801561026d573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610295919081019061060d565b61029e906106ba565b905060006102ad8260016106e1565b90507fdf30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e360001b846000815181106102e6576102e6610702565b6020026020010181815250508060405160200161030591815260200190565b6040516020818303038152906040528360008151811061032757610327610702565b602090810291909101810191909152604080516f6f986dd036db5187329aa6cd326304c360811b818401526fffffffffffffffffffffffffffffffff19608086901b16603082015281518082039093018352810190526103af907fdf30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e390849060009081906101a8565b846001815181106103c2576103c2610702565b602002602001018181525050856040516020016103f7919060609190911b6bffffffffffffffffffffffff1916815260140190565b6040516020818303038152906040528360018151811061041957610419610702565b60200260200101819052506104406b4b80742de2bf82acb363000060a01b8760601b610488565b8460028151811061045357610453610702565b602002602001018181525050848360028151811061047357610473610702565b60200260200101819052505050935093915050565b604080516001600160a01b0319841660208201526bffffffffffffffffffffffff198316602c8201526000918291016040516020818303038152906040529050806100b8906106ba565b6001600160a01b03811681146104e757600080fd5b50565b600080604083850312156104fd57600080fd5b8235610508816104d2565b91506020830135610518816104d2565b809150509250929050565b60005b8381101561053e578181015183820152602001610526565b50506000910152565b604080825283519082018190526000906020906060840190828701845b8281101561058057815184529284019290840190600101610564565b50505083810382850152845180825282820190600581901b8301840187850160005b838110156105e857601f1980878503018652825180518086526105ca818b88018c8501610523565b96890196601f019091169390930187019250908601906001016105a2565b50909998505050505050505050565b634e487b7160e01b600052604160045260246000fd5b60006020828403121561061f57600080fd5b815167ffffffffffffffff8082111561063757600080fd5b818401915084601f83011261064b57600080fd5b81518181111561065d5761065d6105f7565b604051601f8201601f19908116603f01168101908382118183101715610685576106856105f7565b8160405282815287602084870101111561069e57600080fd5b6106af836020830160208801610523565b979650505050505050565b805160208083015191908110156106db576000198160200360031b1b821691505b50919050565b808201808211156100bc57634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fdfea2646970667358221220de5d7b40f71881e64646f1dee79b94258a75d42c155be27ef17841de0396aa6d64736f6c63430008100033";

type LumuksoUtilsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LumuksoUtilsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LumuksoUtils__factory extends ContractFactory {
  constructor(...args: LumuksoUtilsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<LumuksoUtils> {
    return super.deploy(overrides || {}) as Promise<LumuksoUtils>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): LumuksoUtils {
    return super.attach(address) as LumuksoUtils;
  }
  override connect(signer: Signer): LumuksoUtils__factory {
    return super.connect(signer) as LumuksoUtils__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LumuksoUtilsInterface {
    return new utils.Interface(_abi) as LumuksoUtilsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LumuksoUtils {
    return new Contract(address, _abi, signerOrProvider) as LumuksoUtils;
  }
}
