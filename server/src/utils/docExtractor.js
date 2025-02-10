import mammoth from "mammoth";
import { appendFileSync } from "fs";


export const extractTextFromDoc = async (file) => {
  const { value: docxText } = await mammoth.extractRawText({ path: file });
  appendFileSync('./public/temp/text.txt', docxText)
  return docxText;
};