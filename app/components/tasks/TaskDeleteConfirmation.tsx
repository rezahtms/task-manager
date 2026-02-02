import { memo } from "react";

type Props = {
  handleConfirmDelete: () => void;
  handleCancelDelete: () => void;
  taskDescription?: string;
};

function TaskDeleteConfirmation({
  handleConfirmDelete,
  handleCancelDelete,
  taskDescription = "",
}: Props) {
  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-label="تایید حذف کار"
      className="absolute inset-0 bg-red-50 bg-opacity-90 rounded-lg z-10 flex items-center justify-center"
    >
      <div className="p-4 text-center" role="document">
        <h2
          id="delete-dialog-heading"
          className="text-sm mb-4 font-semibold text-gray-800"
        >
          آیا از حذف {taskDescription && `"${taskDescription}"`} اطمینان دارید؟
        </h2>

        <div className="flex justify-center gap-2">
          <button
            onClick={handleConfirmDelete}
            aria-label={"تایید حذف"}
            title={"تایید حذف"}
            className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors cursor-pointer"
          >
            تایید
          </button>
          <button
            onClick={handleCancelDelete}
            aria-label={"انصراف از حذف"}
            title={"انصراف از حذف"}
            className="px-3 py-1 bg-gray-300 text-gray-800 rounded text-xs hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors cursor-pointer"
          >
            انصراف
          </button>
        </div>
      </div>
    </section>
  );
}

export default memo(TaskDeleteConfirmation);
