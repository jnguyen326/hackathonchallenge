"use client"; // Add this line to mark the component as a client component

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Wrapper from "@/components/wrapper";
import { Button } from "@/components/ui/button";
import robot from "@/public/images/robot.png";
export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    // Handle file selection here
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        // Create a FormData object to send the file to the server
        const formData = new FormData();
        formData.append("file", selectedFile);

        // Upload the file to the server
        const response = await axios.post("/api/upload.js", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file upload
          },
        });

        // Assuming Vertex AI processing and response handling here
        const vertexResponse = await axios.post("/api/vertex.js", {
          uploadedFileUrl: response.data.fileUrl, // Provide the URL of the uploaded file
        });

        // Handle the response from Vertex AI (vertexResponse) as needed

        // Optionally, you can provide feedback to the user based on the response
        if (vertexResponse.data.success) {
          alert("File uploaded and processed successfully.");
        } else {
          alert("File upload and processing failed.");
        }
      } catch (error) {
        console.error("Error uploading and processing file:", error);
        alert("An error occurred while uploading and processing the file.");
      }
    }
  };

  return (
      <section className="flex flex-col lg:flex-row">
        <section className="flex h-screen w-full flex-col justify-between p-9 lg:h-auto bg-gradient-to-r from-blue-500 to-blue-300">
          <Wrapper>
            <div className="mx-auto flex max-w-sm flex-col justify-between bg-white p-6 rounded-lg shadow-lg">
            <span
                className={`-mt-14 inline-block text-[64px] font-bold text-black dark:text-white`}
            >
              01
            </span>
              <p className="pb-6 font-medium">
                Kami (short for Kaminari) is a modern Next.js, Tailwind CSS, and shadcn-ui boilerplate that includes all you need to build amazing projects. No need to spend time on configuring the basic needs of a project. I did that for you - Created by{" "}
                <a
                    href="https://obedd.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    className="pb-1 text-blue-600 dark:text-blue-300 underline font-medium"
                >
                  Virgil.
                </a>{" "}
              </p>

              <div className="">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Button size="xl" className="w-full font-bold" variant="brand">
                    Upload PDF
                  </Button>
                </label>
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                />
                <button
                    onClick={handleUpload}
                    className="hidden"
                    type="button"
                    id="upload-button"
                >
                  Upload
                </button>
              </div>
            </div>
          </Wrapper>
        </section>

        {/* second half */}

        <section className="hidden lg:flex h-screen w-full flex-col justify-center items-center bg-gradient-to-r from-blue-300 to-blue-100">
          <Image src={robot} alt="Man sitting in wheelchair" />
        </section>
      </section>
  );
}
