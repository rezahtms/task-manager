import CustomModal from "../ui/CustomModal";
import ModalButton from "../ui/ModalButton";
import TaskForm from "./TaskForm";

export default function TaskCreator() {
  return (
    <CustomModal
      trigger={
        <ModalButton
          className=" focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 text-slate-700 bg-slate-100 hover:bg-slate-200"
          aria-label="افزودن وظیفه"
        >
          افزودن وظیفه
        </ModalButton>
      }
      title="افزودن وظیفه "
      ariaLabel="افزودن وظیفه"
      size="sm"
    >
      <TaskForm />
    </CustomModal>
  );
}
