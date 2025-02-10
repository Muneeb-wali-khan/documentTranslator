import { PassThrough } from "stream";
import { google } from "googleapis";
import dotenv from "dotenv";

const SCOPE = ["https://www.googleapis.com/auth/drive"];
dotenv.config({ path: "./.env" });

const apikeys = {
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY?.toString()?.replace(
    /\\n/g,
    "\n"
  ),
};

// A Function that can provide access to google drive api
export async function authorize() {
  const jwtClient = new google.auth.JWT(
    apikeys.client_email,
    null,
    apikeys.private_key,
    SCOPE
  );
  await jwtClient.authorize();
  return jwtClient;
}

export async function uploadFile(authClient, file, fileName) {
  try {
    const drive = google.drive({ version: "v3", auth: authClient });

    const fileMetaData = {
      name: fileName, // file name custom
      parents: ["1bxNs8oPLagRnyWera9JQ0v1oZutoGZbS"],
    };

    const mimeType = file?.mimeType

    // Create a PassThrough stream
    const passThroughStream = new PassThrough();
    passThroughStream.end(file?.buffer);

    const media = {
      mimeType,
      body: passThroughStream,
    };

    const uploadedFile = await drive.files?.create({
      resource: fileMetaData,
      media,
      fields: "id", // Specify fields to return
    });

    return uploadedFile; // Resolve with uploaded file metadata
  } catch (error) {
    console.error("Error uploading file to Google Drive:", error);
    throw error; // Re-throw for proper handling in controller
  }
}

export async function deleteFileFromDrive(authClient, fileId) {
  const drive = google.drive({ version: "v3", auth: authClient });
  await drive.files
    .delete({ fileId })
    .then((res) => {
      console.log(`File with ID: ${res?.data} deleted successfully.`);
    })
    .catch((err) => {
      console.error("Error deleting file from Google Drive:", err);
    });
}

export async function UpdateFileNameInDrive(authClient, fileId, fileName) {
  const drive = google.drive({ version: "v3", auth: authClient });
  const fileMetadata = {
    name: fileName,
  };
  await drive.files
    .update({
      fileId,
      resource: fileMetadata,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error("Error deleting file from Google Drive:", err);
    });
}
