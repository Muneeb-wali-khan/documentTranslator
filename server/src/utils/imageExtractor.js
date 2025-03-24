import { ocrSpace } from "ocr-space-api-wrapper";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config({ path: "./.env" });

const OCR_API_KEY = process.env.OCR_SPACE_API_KEY;
// const imagePath = "./public/temp/abc.jpeg";
// const imagePath = "./public/temp/thumbnail.png";
// const outputPath = "./public/temp/text.txt";

export const extractTextWithOCRSpace = async (imagePath) => {
  const options = {
    apiKey: OCR_API_KEY,
    // language: "eng",
    OCREngine: 2,
    isOverlayRequired: false,
  };

  const result = await ocrSpace(imagePath, options);

  if (result?.ParsedResults?.[0]?.parsedText) {
    //   fs.writeFileSync(outputPath, result?.ParsedResults?.[0]?.ParsedText);
    return result?.parsedResults?.[0]?.parsedText;
  }
};









// import { createWorker } from "tesseract.js";
// import fs from "fs";
// // const imgPath = "./public/temp/Gemini_Generated_Image_iycr41iycr41iycr-removebg-preview.png";
// // const outputPath = "./public/temp/text.txt";

// export const extractTextWithOCRSpace = async (imgPath) => {

//   const worker = await createWorker("eng");
//   const ret = await worker.recognize(imgPath);
//   // fs.writeFileSync(outputPath, ret.data.text);
//   await worker.terminate();
//   return ret.data.text;
// };
