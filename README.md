<p align="center">
  <img src="./packages/app/assets/lumukso.png">
</p>

----------

Lumukso is a multifactor social recovery app made for [Lukso Universal Profile](https://docs.lukso.tech/guides/universal-profile/create-profile/).

The application utilizes external key managers such as Magic.link & web3auth.io to help Lukso universal profile users recover their access using SSO.

There's also a new concept of "Guardian Invitation" being introduced into Lumukso's smart contract. This concept applies a 2-phase consent flow that requires a signature from invited addresses to confirm their agreement on becoming a guardian.

## Workflow

- Alice is the original owner
- Bob is the new owner
- Charlie is the guardian

[![](https://mermaid.ink/img/pako:eNp1Uk1rwzAM_SvCl126wL5HDoVuHWMwGCywUy6ara6miZX5I1BK__ucJhluuvlkPb8nPUneCcmKRC4cfQcykpYavyzWpYF4UHq2sKi0pB5o0HotdYPGw2uow8Zxynxco600pdADf_bhIcv5fD7IcrjIYElNxVsoWGqs4J0kt2S3__AvM1goBUXxBujgOaBVGo07Zg8OcrjK4MW02tNoKhX1muEhrXEda0hJjQfdidFrHsixj5R4k0Hh4zDADqahsSzJOWg1dh5T1a-p2xNTnqHlGK_iqOxR_3-4u8vgY0oGXnVVzlyc96F-zJgsbGL7PuuQUexgFapqKhQzUZOtUav4LXZdmlL4NdVUijxeFdpNKUqzj7zQKPT0pHTctMi9DTQTGDwXWyPHuOcM36oH9z8iAdJQ)](https://mermaid.live/edit#pako:eNp1Uk1rwzAM_SvCl126wL5HDoVuHWMwGCywUy6ara6miZX5I1BK__ucJhluuvlkPb8nPUneCcmKRC4cfQcykpYavyzWpYF4UHq2sKi0pB5o0HotdYPGw2uow8Zxynxco600pdADf_bhIcv5fD7IcrjIYElNxVsoWGqs4J0kt2S3__AvM1goBUXxBujgOaBVGo07Zg8OcrjK4MW02tNoKhX1muEhrXEda0hJjQfdidFrHsixj5R4k0Hh4zDADqahsSzJOWg1dh5T1a-p2xNTnqHlGK_iqOxR_3-4u8vgY0oGXnVVzlyc96F-zJgsbGL7PuuQUexgFapqKhQzUZOtUav4LXZdmlL4NdVUijxeFdpNKUqzj7zQKPT0pHTctMi9DTQTGDwXWyPHuOcM36oH9z8iAdJQ)

## Concepts

### SSO Guardians

External key managers like Magic.link and Web3auth.io enable users to become their own social recovery guardian via SSO. The private keys of these key managers are accessible to end users as long as they have access to the configured SSO methods.

### Guardian Invitation & Confirmation

2-Phase guardian address configuration is applied to Lumukso in order to make sure that every added guardian has made a consent to confirm their intention to become a guardian. This consent is made via a specially crafted signature defined in Lumukso smart contract. 

### Social Recovery Fault Tolerance

This concept is used to determine the LSP11 guardians threshold parameter using Byzantine Fault Tolerance theorem where there can be only one-third of the guardians being faulty. 

$$Number of Guardians = 3Faulty Guardians + 1$$

$$Guardians Threshold = Number of Guardians - Faulty Guardians = 2Faulty Guardians + 1$$

For example when fault tolerance is configured as 1, then 3 guardians are required to recover the access of a user.

## Supported Guardians

- [x] Universal Profile
- [x] magic.link
- [x] web3auth.io

## Utilized Standards

- LSP0 - Universal Profile
- LSP6 - Key Manager
- LSP11 - Social Recovery

## Build

### Contracts

```
cd packages/contracts
pnpm install
forge script script/deploy.s.sol --broadcast \
    --optimize --optimizer-runs 200 --via-ir \
    --rpc-url $ETH_RPC_URL \
    --private-key $RAW_PRIVATE_KEY \
    --chain-id $CHAIN_ID \
    -vvvv
```

### App

```
cd packages/app
pnpm install
pnpm dev
```

## Contact

- Peter Chung <touhonoob@gmail.com>
