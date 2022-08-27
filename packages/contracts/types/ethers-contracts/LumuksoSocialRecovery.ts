/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface LumuksoSocialRecoveryInterface extends utils.Interface {
  functions: {
    "account()": FunctionFragment;
    "addGuardian(address)": FunctionFragment;
    "addPendingGuardian(address)": FunctionFragment;
    "confirmPendingGuardian(address,bytes)": FunctionFragment;
    "getConfirmationMessage(address)": FunctionFragment;
    "getGuardianVote(bytes32,address)": FunctionFragment;
    "getGuardians()": FunctionFragment;
    "getGuardiansThreshold()": FunctionFragment;
    "getInvitations()": FunctionFragment;
    "getPendingGuardianExpiration(address)": FunctionFragment;
    "getRecoverProcessesIds()": FunctionFragment;
    "isGuardian(address)": FunctionFragment;
    "isInvited(address)": FunctionFragment;
    "isThresholdMet(bytes32)": FunctionFragment;
    "isValidRecoveryProcessId(bytes32)": FunctionFragment;
    "owner()": FunctionFragment;
    "pendingGuardians(address)": FunctionFragment;
    "recoverOwnership(bytes32,string,bytes32)": FunctionFragment;
    "recoverProcessIds()": FunctionFragment;
    "removeGuardian(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setSecret(bytes32)": FunctionFragment;
    "setThreshold(uint256)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "voteToRecover(bytes32,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "account"
      | "addGuardian"
      | "addPendingGuardian"
      | "confirmPendingGuardian"
      | "getConfirmationMessage"
      | "getGuardianVote"
      | "getGuardians"
      | "getGuardiansThreshold"
      | "getInvitations"
      | "getPendingGuardianExpiration"
      | "getRecoverProcessesIds"
      | "isGuardian"
      | "isInvited"
      | "isThresholdMet"
      | "isValidRecoveryProcessId"
      | "owner"
      | "pendingGuardians"
      | "recoverOwnership"
      | "recoverProcessIds"
      | "removeGuardian"
      | "renounceOwnership"
      | "setSecret"
      | "setThreshold"
      | "supportsInterface"
      | "transferOwnership"
      | "voteToRecover"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "account", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "addGuardian",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "addPendingGuardian",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "confirmPendingGuardian",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getConfirmationMessage",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getGuardianVote",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getGuardians",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getGuardiansThreshold",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getInvitations",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPendingGuardianExpiration",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRecoverProcessesIds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isGuardian",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isInvited",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isThresholdMet",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "isValidRecoveryProcessId",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pendingGuardians",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "recoverOwnership",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "recoverProcessIds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "removeGuardian",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setSecret",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "setThreshold",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "voteToRecover",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "account", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addGuardian",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addPendingGuardian",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "confirmPendingGuardian",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getConfirmationMessage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getGuardianVote",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getGuardians",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getGuardiansThreshold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getInvitations",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPendingGuardianExpiration",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRecoverProcessesIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isGuardian", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isInvited", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isThresholdMet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isValidRecoveryProcessId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingGuardians",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "recoverOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "recoverProcessIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeGuardian",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setSecret", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setThreshold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "voteToRecover",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "PendingGuardianAdded(address,uint256)": EventFragment;
    "PendingGuardianConfirmed(address)": EventFragment;
    "VoteCast(bytes32,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PendingGuardianAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PendingGuardianConfirmed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VoteCast"): EventFragment;
}

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface PendingGuardianAddedEventObject {
  guardian: string;
  expiration: BigNumber;
}
export type PendingGuardianAddedEvent = TypedEvent<
  [string, BigNumber],
  PendingGuardianAddedEventObject
>;

export type PendingGuardianAddedEventFilter =
  TypedEventFilter<PendingGuardianAddedEvent>;

export interface PendingGuardianConfirmedEventObject {
  guardian: string;
}
export type PendingGuardianConfirmedEvent = TypedEvent<
  [string],
  PendingGuardianConfirmedEventObject
>;

export type PendingGuardianConfirmedEventFilter =
  TypedEventFilter<PendingGuardianConfirmedEvent>;

export interface VoteCastEventObject {
  recoveryProcessId: string;
  newOwner: string;
  voter: string;
}
export type VoteCastEvent = TypedEvent<
  [string, string, string],
  VoteCastEventObject
>;

export type VoteCastEventFilter = TypedEventFilter<VoteCastEvent>;

export interface LumuksoSocialRecovery extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: LumuksoSocialRecoveryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    account(overrides?: CallOverrides): Promise<[string]>;

    addGuardian(
      newGuardian: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addPendingGuardian(
      guardian: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    confirmPendingGuardian(
      guardian: PromiseOrValue<string>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getConfirmationMessage(
      guardian: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getGuardianVote(
      recoverProcessId: PromiseOrValue<BytesLike>,
      guardian: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getGuardians(overrides?: CallOverrides): Promise<[string[]]>;

    getGuardiansThreshold(overrides?: CallOverrides): Promise<[BigNumber]>;

    getInvitations(overrides?: CallOverrides): Promise<[string[]]>;

    getPendingGuardianExpiration(
      guardian: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getRecoverProcessesIds(overrides?: CallOverrides): Promise<[string[]]>;

    isGuardian(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isInvited(
      pendingGuardian: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isThresholdMet(
      recoverProcessId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isValidRecoveryProcessId(
      recoveryProcessId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pendingGuardians(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber] & { guardian: string; expiration: BigNumber }
    >;

    recoverOwnership(
      recoverProcessId: PromiseOrValue<BytesLike>,
      plainSecret: PromiseOrValue<string>,
      newHash: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    recoverProcessIds(overrides?: CallOverrides): Promise<[string[]]>;

    removeGuardian(
      currentGuardian: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setSecret(
      newHash: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setThreshold(
      newThreshold: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      _interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    voteToRecover(
      recoverProcessId: PromiseOrValue<BytesLike>,
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  account(overrides?: CallOverrides): Promise<string>;

  addGuardian(
    newGuardian: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addPendingGuardian(
    guardian: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  confirmPendingGuardian(
    guardian: PromiseOrValue<string>,
    signature: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getConfirmationMessage(
    guardian: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  getGuardianVote(
    recoverProcessId: PromiseOrValue<BytesLike>,
    guardian: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  getGuardians(overrides?: CallOverrides): Promise<string[]>;

  getGuardiansThreshold(overrides?: CallOverrides): Promise<BigNumber>;

  getInvitations(overrides?: CallOverrides): Promise<string[]>;

  getPendingGuardianExpiration(
    guardian: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getRecoverProcessesIds(overrides?: CallOverrides): Promise<string[]>;

  isGuardian(
    _address: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isInvited(
    pendingGuardian: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isThresholdMet(
    recoverProcessId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isValidRecoveryProcessId(
    recoveryProcessId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  pendingGuardians(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber] & { guardian: string; expiration: BigNumber }>;

  recoverOwnership(
    recoverProcessId: PromiseOrValue<BytesLike>,
    plainSecret: PromiseOrValue<string>,
    newHash: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  recoverProcessIds(overrides?: CallOverrides): Promise<string[]>;

  removeGuardian(
    currentGuardian: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setSecret(
    newHash: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setThreshold(
    newThreshold: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    _interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  voteToRecover(
    recoverProcessId: PromiseOrValue<BytesLike>,
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    account(overrides?: CallOverrides): Promise<string>;

    addGuardian(
      newGuardian: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    addPendingGuardian(
      guardian: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    confirmPendingGuardian(
      guardian: PromiseOrValue<string>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    getConfirmationMessage(
      guardian: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getGuardianVote(
      recoverProcessId: PromiseOrValue<BytesLike>,
      guardian: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getGuardians(overrides?: CallOverrides): Promise<string[]>;

    getGuardiansThreshold(overrides?: CallOverrides): Promise<BigNumber>;

    getInvitations(overrides?: CallOverrides): Promise<string[]>;

    getPendingGuardianExpiration(
      guardian: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRecoverProcessesIds(overrides?: CallOverrides): Promise<string[]>;

    isGuardian(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isInvited(
      pendingGuardian: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isThresholdMet(
      recoverProcessId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isValidRecoveryProcessId(
      recoveryProcessId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    pendingGuardians(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber] & { guardian: string; expiration: BigNumber }
    >;

    recoverOwnership(
      recoverProcessId: PromiseOrValue<BytesLike>,
      plainSecret: PromiseOrValue<string>,
      newHash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    recoverProcessIds(overrides?: CallOverrides): Promise<string[]>;

    removeGuardian(
      currentGuardian: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setSecret(
      newHash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    setThreshold(
      newThreshold: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      _interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    voteToRecover(
      recoverProcessId: PromiseOrValue<BytesLike>,
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "PendingGuardianAdded(address,uint256)"(
      guardian?: PromiseOrValue<string> | null,
      expiration?: null
    ): PendingGuardianAddedEventFilter;
    PendingGuardianAdded(
      guardian?: PromiseOrValue<string> | null,
      expiration?: null
    ): PendingGuardianAddedEventFilter;

    "PendingGuardianConfirmed(address)"(
      guardian?: PromiseOrValue<string> | null
    ): PendingGuardianConfirmedEventFilter;
    PendingGuardianConfirmed(
      guardian?: PromiseOrValue<string> | null
    ): PendingGuardianConfirmedEventFilter;

    "VoteCast(bytes32,address,address)"(
      recoveryProcessId?: PromiseOrValue<BytesLike> | null,
      newOwner?: PromiseOrValue<string> | null,
      voter?: PromiseOrValue<string> | null
    ): VoteCastEventFilter;
    VoteCast(
      recoveryProcessId?: PromiseOrValue<BytesLike> | null,
      newOwner?: PromiseOrValue<string> | null,
      voter?: PromiseOrValue<string> | null
    ): VoteCastEventFilter;
  };

  estimateGas: {
    account(overrides?: CallOverrides): Promise<BigNumber>;

    addGuardian(
      newGuardian: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addPendingGuardian(
      guardian: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    confirmPendingGuardian(
      guardian: PromiseOrValue<string>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getConfirmationMessage(
      guardian: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getGuardianVote(
      recoverProcessId: PromiseOrValue<BytesLike>,
      guardian: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getGuardians(overrides?: CallOverrides): Promise<BigNumber>;

    getGuardiansThreshold(overrides?: CallOverrides): Promise<BigNumber>;

    getInvitations(overrides?: CallOverrides): Promise<BigNumber>;

    getPendingGuardianExpiration(
      guardian: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRecoverProcessesIds(overrides?: CallOverrides): Promise<BigNumber>;

    isGuardian(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isInvited(
      pendingGuardian: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isThresholdMet(
      recoverProcessId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isValidRecoveryProcessId(
      recoveryProcessId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pendingGuardians(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    recoverOwnership(
      recoverProcessId: PromiseOrValue<BytesLike>,
      plainSecret: PromiseOrValue<string>,
      newHash: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    recoverProcessIds(overrides?: CallOverrides): Promise<BigNumber>;

    removeGuardian(
      currentGuardian: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setSecret(
      newHash: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setThreshold(
      newThreshold: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      _interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    voteToRecover(
      recoverProcessId: PromiseOrValue<BytesLike>,
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    account(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    addGuardian(
      newGuardian: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addPendingGuardian(
      guardian: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    confirmPendingGuardian(
      guardian: PromiseOrValue<string>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getConfirmationMessage(
      guardian: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getGuardianVote(
      recoverProcessId: PromiseOrValue<BytesLike>,
      guardian: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getGuardians(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getGuardiansThreshold(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getInvitations(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPendingGuardianExpiration(
      guardian: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRecoverProcessesIds(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isGuardian(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isInvited(
      pendingGuardian: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isThresholdMet(
      recoverProcessId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isValidRecoveryProcessId(
      recoveryProcessId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pendingGuardians(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    recoverOwnership(
      recoverProcessId: PromiseOrValue<BytesLike>,
      plainSecret: PromiseOrValue<string>,
      newHash: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    recoverProcessIds(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeGuardian(
      currentGuardian: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setSecret(
      newHash: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setThreshold(
      newThreshold: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      _interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    voteToRecover(
      recoverProcessId: PromiseOrValue<BytesLike>,
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
