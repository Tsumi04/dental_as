"use client";

import { useDeleteDoctor, useGetDoctors } from "@/hooks/use-doctors";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  EditIcon,
  MailIcon,
  PhoneIcon,
  PlusIcon,
  StethoscopeIcon,
  TrashIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Doctor } from "@prisma/client";
import AddDoctorDialog from "./AddDoctorDialog";
import EditDoctorDialog from "./EditDoctorDialog";

type DoctorWithAppointmentCount = Doctor & {
  appointmentCount: number;
};
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { toast } from "sonner";

function DoctorsManagement() {
  const { data: doctors = [] } = useGetDoctors();
  const deleteDoctorMutation = useDeleteDoctor();
  const isMobile = useIsMobile();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] =
    useState<DoctorWithAppointmentCount | null>(null);

  const handleEditDoctor = (doctor: DoctorWithAppointmentCount) => {
    setSelectedDoctor(doctor);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedDoctor(null);
  };

  const handleDeleteDoctor = (doctor: DoctorWithAppointmentCount) => {
    setSelectedDoctor(doctor);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedDoctor(null);
  };

  const handleConfirmDelete = () => {
    if (!selectedDoctor) return;

    deleteDoctorMutation.mutate(selectedDoctor.id, {
      onSuccess: (result) => {
        if (result.appointmentCount > 0) {
          toast.success(
            `Doctor deleted successfully. ${result.appointmentCount} appointment(s) were also deleted.`,
          );
        } else {
          toast.success("Doctor deleted successfully");
        }
        handleCloseDeleteDialog();
      },
      onError: (error: any) => {
        const errorMessage = error?.message || "Failed to delete doctor";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <>
      <Card className="mb-8 sm:mb-12">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <StethoscopeIcon className="size-4 sm:size-5 text-primary" />
              Doctors Management
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm mt-1">
              Manage and oversee all doctors in your practice
            </CardDescription>
          </div>

          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/100 w-full sm:w-auto"
            size={isMobile ? "sm" : "default"}
          >
            <PlusIcon className="mr-2 size-4" />
            Add Doctor
          </Button>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-muted/30 rounded-xl border border-border/50"
              >
                <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  <Image
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    width={48}
                    height={48}
                    className="size-10 sm:size-12 rounded-full object-cover ring-2 ring-background shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm sm:text-base truncate">
                      {doctor.name}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                      <span className="truncate block sm:inline">
                        {doctor.speciality}
                      </span>
                      <span className="ml-0 sm:ml-2 px-2 py-0.5 bg-muted rounded text-xs inline-block mt-1 sm:mt-0">
                        {doctor.gender === "MALE" ? "Male" : "Female"}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground truncate">
                        <MailIcon className="h-3 w-3 shrink-0" />
                        <span className="truncate">{doctor.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <PhoneIcon className="h-3 w-3 shrink-0" />
                        <span>{doctor.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 shrink-0 border-t sm:border-t-0 pt-4 sm:pt-0">
                  <div className="text-center hidden sm:block">
                    <div className="font-semibold text-primary text-sm sm:text-base">
                      {doctor.appointmentCount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Appointments
                    </div>
                  </div>
                  <div className="text-center sm:hidden">
                    <div className="font-semibold text-primary text-sm">
                      {doctor.appointmentCount}
                    </div>
                    <div className="text-xs text-muted-foreground">Apps</div>
                  </div>

                  {doctor.isActive ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs shrink-0">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs shrink-0">
                      Inactive
                    </Badge>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-2 sm:px-3 shrink-0"
                    onClick={() => handleEditDoctor(doctor)}
                  >
                    <EditIcon className="size-3 sm:size-4 sm:mr-1" />
                    <span className="hidden sm:inline">Edit</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-2 sm:px-3 text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                    onClick={() => handleDeleteDoctor(doctor)}
                  >
                    <TrashIcon className="size-3 sm:size-4 sm:mr-1" />
                    <span className="hidden sm:inline">Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddDoctorDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />

      <EditDoctorDialog
        key={selectedDoctor?.id}
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        doctor={selectedDoctor}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Doctor</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedDoctor && selectedDoctor.appointmentCount > 0 ? (
                <>
                  Are you sure you want to delete{" "}
                  <strong>{selectedDoctor.name}</strong>? This action will also
                  delete{" "}
                  <strong>
                    {selectedDoctor.appointmentCount} appointment
                    {selectedDoctor.appointmentCount > 1 ? "s" : ""}
                  </strong>{" "}
                  associated with this doctor. This action cannot be undone.
                </>
              ) : (
                <>
                  Are you sure you want to delete{" "}
                  <strong>{selectedDoctor?.name}</strong>? This action cannot be
                  undone.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseDeleteDialog}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteDoctorMutation.isPending}
            >
              {deleteDoctorMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default DoctorsManagement;
