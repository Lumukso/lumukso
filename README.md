<p align="center">
  <img src="./packages/app/assets/lumukso.png">
</p>

<p align="center">
<a href="https://lumukso.app/" target="_blank">App</a> | 
<a href="https://youtu.be/QLu0rdujZxg" target="_blank">Demo Video</a> |
<a href="mailto:contact@lumukso.app" target="_blank">Contact</a>
</p>

----------

Lumukso is a multifactor social recovery app made for [Lukso Universal Profile](https://docs.lukso.tech/guides/universal-profile/create-profile/).

The application utilizes external key managers such as Magic.link & web3auth.io to help Lukso universal profile users recover their access using SSO.

There's also a new concept of "Guardian Invitation" being introduced into Lumukso's smart contract. This concept applies a 2-phase consent flow that requires a signature from invited addresses to confirm their agreement on becoming a guardian.

## Prerequisite

Please make sure you have installed **v1.0.0-develop.298-MV3** Lukso UP browser extension and disabled Metamask and other browser wallets.

Visit https://docs.lukso.tech/guides/browser-extension/install-browser-extension/ for the download link and instruction.

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
pnpm test
```

### App

```
cd packages/app
pnpm install
pnpm dev
```

## Contact

- Peter Chung <touhonoob@gmail.com>
