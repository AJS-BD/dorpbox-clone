"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/firebase";
import { FileType } from "@/typing";
import { useUser } from "@clerk/nextjs";
import { collection, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { Button } from "../ui/button";
import { DataTable } from "./Table";
import { columns } from "./colums";

function TableWrapper({ skeletonFiles }: { skeletonFiles: FileType[] }) {
  const { user } = useUser();
  const [initalFile, setInitialFile] = useState<FileType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const [docs, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user.id, "files"),
        orderBy("timestamp", sort)
      )
  );

  useEffect(() => {
    if (!docs) return;

    const files: FileType[] = docs.docs.map((doc) => ({
      id: doc.id,
      filename: doc.data().filename || doc.id,
      fullName: doc.data().fullName,
      downloadURL: doc.data().downloadURL,
      type: doc.data().type,
      size: doc.data().size,
      timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    }));

    setInitialFile(files);
  }, [docs]);

  if (docs?.docs.length === undefined)
    return (
      <div className="flex flex-col">
        <Button
          variant={"outline"}
          className="ml-auto w-32 h-10 mb-5"
        >
          <Skeleton className="h-5 w-full" />
        </Button>

        <div className="border rounded-lg">
          <div className="border-b h-12" />
          {skeletonFiles.map((file) => (
            <div
              className="flex items-center space-x-4 p-5 w-full"
              key={file.id}
            >
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-12" />
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="flex flex-col space-y-5 pb-10">
      <Button
        className="ml-auto w-fit"
        variant={"outline"}
        onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
      >
        Sort by {sort === "desc" ? "Newest" : "Oldest"}
      </Button>

      <DataTable
        columns={columns}
        data={initalFile}
      />
    </div>
  );
}

export default TableWrapper;
