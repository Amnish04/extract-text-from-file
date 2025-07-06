# Document Parser API – Vercel Serverless Function

A Node.js + Vercel serverless function that accepts a file upload via `POST`, extracts its text content using `extractTextFromFile()`, and returns it in the response.

## Motivation

I wanted a lightweight service to parse text from different file types for my side projects. I could have also used the dockerized version of [apache/tika](https://hub.docker.com/r/apache/tika) but didn't wanna add unnecessary complications.

So, I decided to vibe code one 😎

## 🛠 How It Works

- Accepts `multipart/form-data` file uploads via `POST /api/extract`
- Responds with extracted text in JSON format

## 📤 Example Request
Here’s how to call the API from a browser:

```js
const formData = new FormData();
formData.append('file', selectedFile);

const url = new URL('api/extract', 'https://extract-text-from-file.vercel.app/');
const res = await fetch(url, {
  method: 'POST',
  body: formData,
});

const data = await res.json(); // { "content": "parsed file text" }
console.log(data.content);
```

## 📝 Notes

- This project uses [formidable](https://www.npmjs.com/package/formidable) for handling file uploads.
- Text extraction is powered by [officeparser](https://www.npmjs.com/package/officeparser).
