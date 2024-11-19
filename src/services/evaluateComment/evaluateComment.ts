import { GoogleGenerativeAI } from "@google/generative-ai";
import { AppError } from "../../error";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function evaluateComment(
  imageDescription: string,
  postDescription: string,
  comment: string
): Promise<string> {
  try {
    const prompt = `
      Consider the following scenario:
      - Image description: "${imageDescription}"
      - Post description: "${postDescription}"
      - Comment: "${comment}"
      
      Question: Is the comment offensive or inappropriate in relation to the post or the image? Respond with "Yes, it is offensive" or "No, it is not offensive," followed by a brief explanation.
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    throw new AppError("Failed to evaluate the comment.");
  }
}
