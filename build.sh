#!/usr/bin/env bash

set -ex
npm install -g pnpm
cd packages/app && pnpm install && pnpm build
