"use client";

import { db, storage } from "@/firebase";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import DropzoneComponent from "react-dropzone";
import { toast } from "react-hot-toast";

function Dropzone() {
  const [loading, setLoading] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("File Reading was Aborted");
      reader.onerror = () => console.log("File Reading was Failed");
      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };
  const uploadPost = async (selectedFiles: File) => {
    if (loading) return;
    if (!user) return;

    setLoading(true);

    const toastId = toast.loading("Uploading...");

    //Do what needs to be done...

    const docRef = await addDoc(collection(db, "users", user.id, "files"), {
      userId: user.id,
      filename: selectedFiles.name,
      fullName: user.fullName,
      profileImg: user.imageUrl,
      timestamp: serverTimestamp(),
      type: selectedFiles.type,
      size: selectedFiles.size,
    });

    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);

    uploadBytes(imageRef, selectedFiles).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
        downloadURL: downloadURL,
      });
    });

    toast.success("Upload Successfully", { id: toastId });

    setLoading(false);
  };

  const maxsize = 20971520; //Max File Size is 20MB

  return (
    <DropzoneComponent
      minSize={0}
      maxSize={maxsize}
      onDrop={onDrop}
    >
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFiletooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxsize;

        return (
          <section className="m-6 ">
            <div
              {...getRootProps()}
              className={cn(
                "w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center ",
                isDragActive
                  ? "bg-[#035fff] text-white animate-pulse"
                  : "bg-[#f0f0f0] dark:bg-slate-900 "
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click or Drop a File to Upload!"}
              {isDragActive && !isDragReject && "Drop to Upload your File!"}
              {isDragReject && "File Type not Accepted!!!"}
              {isFiletooLarge && (
                <div className="text-danger mt-2">File is too Large</div>
              )}
            </div>
          </section>
        );
      }}
    </DropzoneComponent>
  );
}

export default Dropzone;
