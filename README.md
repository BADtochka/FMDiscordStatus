<p align="center">
  <img src="https://raw.githubusercontent.com/BADtochka/FMDiscordStatus/main/logo.svg">
</p>

<p align="center">
Discord Bot for parse status of FiveM server in text channel.
</p>

<p align="center">
  <img src="https://i.imgur.com/nEiOyWg.png">
</p>




## How to use?
**Require [NodeJS ](https://nodejs.org/en/download/)**

### Clone the repository
```bash
git clone https://github.com/BADtochka/FMDiscordStatus
```

### Install dependencies with `npm` / `pnpm` / `yarn`
```bash
npm install
```

<details>
<summary>using pnpm</summary>

```bash
pnpm install
```
</details>

<details>
<summary>using yarn</summary>

```bash
yarn install
```
</details>

### Setup config in `src/config/app.ts`

### That's it, you can run it like this
```bash
npm run start
```

<details>
<summary>using pnpm</summary>

```bash
pnpm run start
```
</details>

<details>
<summary>using yarn</summary>

```bash
yarn start
```
</details>

### **...or if you use `pm2` you can run it like this**
```bash
pm2 start "npm run start" -n FMDiscordStatus
```
