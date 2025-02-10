import { PDFExtract } from "pdf.js-extract";
import { existsSync, writeFileSync, appendFileSync } from "fs";

// const pdfPath = "./public/temp/pdf.pdf";
const outputPath = "./public/temp/text.txt";

// if (!existsSync(pdfPath)) {
//   console.error("PDF file does not exist at path:", pdfPath);
//   process.exit(1);
// }

const options = {
  firstPage: 1,
  lastPage: undefined, // Extract until the last page (no limit)
  normalizeWhitespace: false, // Keep original spacing
  disableCombineTextItems: true, // Do not combine text items
};

const pdfExtract = new PDFExtract();

export const pdfExtraction = (pdfPath) => {
  if (!existsSync(pdfPath)) {
    console.error("PDF file does not exist at path:", pdfPath);
    process.exit(1);
  }

  return new Promise((resolve, reject) => {
    pdfExtract.extract(pdfPath, options, (err, data) => {
      if (err) {
        console.error("Error extracting text:", err);
        return reject(err);
      }

      writeFileSync(outputPath, "", "utf8");
      let fullText = "";

      data.pages.forEach((page, index) => {
        console.log(`Processing Page ${index + 1}...`);

        let pageText = "";
        let lastY = 100;

        page.content.forEach((item) => {
          const { str, y } = item;

          if (lastY !== null) {
            const spacing = Math.floor(y - lastY);
            const lineHeightThreshold = 2;

            if (spacing > lineHeightThreshold) {
              pageText += "\n\n";
            }
          }

          pageText += str;
          lastY = y;
        });

        appendFileSync(outputPath, `${pageText}\n\n`, "utf8");
        fullText += `${pageText}\n\n`;
        // console.log(`Page ${index + 1} Text:\n${pageText}`);
      });
      resolve(fullText);
    });
  });
};
