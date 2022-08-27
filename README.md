# Lumukso

Lumukso is a multifactor social recovery app made for [Lukso Universal Profile](https://docs.lukso.tech/guides/universal-profile/create-profile/).

The application utilizes external key managers such as Magic.link & web3auth.io to help Lukso universal profile users recover their access using SSO.

There's also a new concept of "Fault Tolerance" introduced in this application. This concept is used to determine the guardians threshold using Byzantine Fault Tolerance theorem where there can be only one-third of the guardians being faulty. 

```
f = Number of faulty guardians
Number of guardians = 3f + 1
Guardians threshold = Number of guardians - f = 2f + 1
```

For example when fault tolerance is configured as 1, then 3 guardians are required to recover the access of a user.

## Supported Guardians

- [x] Universal Profile
- [x] magic.link
- [x] web3auth.io

## Utilized Standards

- LSP0 - Universal Profile
- LSP6 - Key Manager
- LSP11 - Social Recovery

## Deployments

- Lumukso Factory: 0xb98fbee836e763ac9205061526c99b0d319ee5d7
