import Swal from "sweetalert2"

export const popupHelper = ({ error, message }: { error: boolean, message: string }) => {
    if (error) {
        Swal.fire({
            toast: true,
            position: "top",
            icon: "error",
            showConfirmButton: false,
            title: "Failed to save trip",
            titleText: "Please try again",
            timer: 2000,
        })
    } else {
        Swal.fire({
            toast: true,
            position: "top",
            icon: "success",
            showConfirmButton: false,
            title: "Success",
            titleText: message,
            timer: 2000,
        })
    }
}