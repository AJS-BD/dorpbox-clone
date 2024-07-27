"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { db, storage } from "@/firebase";

import { useAppState } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-hot-toast";

export function DeleteModal() {
  const { user } = useUser();

  const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] =
    useAppState((state) => [
      state.isDeleteModalOpen,
      state.setIsDeleteModalOpen,
      state.fileId,
      state.setFilename,
    ]);

  async function deleteFile() {
    if (!user || !fileId) return;

    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

    try {
      deleteObject(fileRef).then(async () => {
        const toastId = toast.loading("Deleting...");

        deleteDoc(doc(db, "users", user.id, "files", fileId))
          .then(() => toast.success("Delete Successfully", { id: toastId }))
          .finally(() => {
            setIsDeleteModalOpen(false);
          });
      });
    } catch (error) {
      toast.error("Error");
      setIsDeleteModalOpen(false);
    }
  }
  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        setIsDeleteModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure, you want to Delete? </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            file!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex">
          <Button
            className="px-3 flex-1 py-2 sm:py-4"
            size="sm"
            variant={"ghost"}
            onClick={() => setIsDeleteModalOpen(false)}
          >
            <span className="sr-only">Go Back!</span>
            <span>Go Back!</span>
          </Button>
          <Button
            variant={"destructive"}
            className="px-3 flex-1 py-2 sm:py-4"
            size={"sm"}
            onClick={() => deleteFile()}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
