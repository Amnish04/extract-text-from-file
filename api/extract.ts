import type { VercelRequest, VercelResponse } from "@vercel/node";
const officeParser = require("officeparser");
import formidable from "formidable";

// Allow parsing multipart form data
export const config = {
    api: {
        bodyParser: false,
    },
};

export async function extractTextFromFile(file: File): Promise<string> {
    if (file.type.includes("text/")) {
        return file.text();
    }

    const fileBuffer = await file.arrayBuffer();

    return officeParser.parseOfficeAsync(fileBuffer);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const form = formidable({ keepExtensions: true });

    try {
        const [_, files] = await form.parse(req);
        const uploadedFile = files.file;

        if (!uploadedFile) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const text = await extractTextFromFile(uploadedFile);

        return res.status(200).json({ content: text });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
