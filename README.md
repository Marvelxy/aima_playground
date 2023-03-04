This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Install dependencies

```bash
$ npm install
```

## Env variable and API key
You need to create a `.env.local` file in the root directory and place the following variable:

```
OPENAI_API_KEY=YOUR_API_KEY_HERE
```

Replace YOUR_API_KEY_HERE with your openAI API key

You can obtain your free API KEY from [openai's site](https://platform.openai.com/account/api-keys)

## Starting the dev server

Run the development server:

```bash
$ npm run dev
```

Open [http://localhost:3000/api/rephrase/](http://localhost:3000/api/rephrase/) with your browser to see the result.

## Changing the text

You can change the text by modifying the value of the `original_text` variable on "**line 8**" of the `/src/app/api/rephrase/route.ts` file.