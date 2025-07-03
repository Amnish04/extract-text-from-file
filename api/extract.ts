import type { VercelRequest, VercelResponse } from "@vercel/node";
const officeParser = require("officeparser");
import formidable from "formidable";
import { promises as fs } from "fs";

// Allow parsing multipart form data
export const config = {
    api: {
        bodyParser: false,
    },
};

async function extractTextFromFile(file: formidable.File): Promise<string> {
    const mimeType = file.mimetype;

    if (mimeType?.includes("text/")) {
        const buffer = await fs.readFile(file.filepath);
        return buffer.toString("utf-8");
    }

    const buffer = await fs.readFile(file.filepath);

    return officeParser.parseOfficeAsync(buffer);
}

function setCorsHeaders(res: VercelResponse) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    setCorsHeaders(res);

    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const form = formidable({ keepExtensions: true });

    try {
        const [_, files] = await form.parse(req);
        const uploadedFileArray = files.file;

        if (!uploadedFileArray || uploadedFileArray.length === 0) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const uploadedFile = uploadedFileArray[0];

        console.log("Uploaded file", uploadedFile);

        if (!uploadedFile) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const text = await extractTextFromFile(uploadedFile);

        return res.status(200).json({ content: text });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
