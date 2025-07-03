# Document Parser API – Vercel Serverless Function

A Node.js + Vercel serverless function that accepts a file upload via `POST`, extracts its text content using `extractTextFromFile()`, and returns it in the response.

## Motivation

I wanted a lightweight service to parse text from different file types for my side projects. I could have also used the dockerized version of [apache/tika](https://hub.docker.com/r/apache/tika) but didn't wanna add unnecessary complications.

So, I decided to vibe code one 😎

## 🛠 How It Works

- Accepts `multipart/form-data` file uploads via `POST /api/parse`
- Responds with extracted text in JSON format

## 🚀 How to Use

You can choose from one of the following two methods:

### One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/examples/tree/main/solutions/node-hello-world&project-name=document-parser-api&repository-name=document-parser-api)


### Clone and Deploy

```bash
git clone https://github.com/vercel/examples/tree/main/solutions/node-hello-world
```

### Install Dependencies

```
pnpm install
```

### Install the Vercel CLI (if not already installed):

```
pnpm add -g vercel
```

### Run the development server:

```
vercel dev
```

## 📤 Example Request (Frontend)
Here’s how to call the API from a browser (e.g., React):

```js
const formData = new FormData();
formData.append('file', selectedFile);

const res = await fetch('/api/parse', {
  method: 'POST',
  body: formData,
});

const data = await res.json();
console.log(data.content);
```

## 📝 Notes

- This project uses [formidable](https://www.npmjs.com/package/formidable) for handling file uploads.
- Text extraction is powered by [officeparser](https://www.npmjs.com/package/officeparser).
