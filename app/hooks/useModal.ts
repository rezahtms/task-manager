import { useEffect, useRef } from "react";

interface UseModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
  disableFocusTrap?: boolean;
  modalRef?: React.RefObject<HTMLDivElement | null>;
}

export const useModal = ({
  isOpen,
  onClose,
  closeOnOverlayClick = true,
  disableFocusTrap = false,
  modalRef,
}: UseModalProps) => {
  const firstFocusElementRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen || disableFocusTrap) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, disableFocusTrap]);

  useEffect(() => {
    if (!isOpen || disableFocusTrap) return;

    const currentModal = modalRef?.current;
    if (!currentModal) return;

    const focusableElements = currentModal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ) as NodeListOf<HTMLElement>;

    if (focusableElements?.length) {
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener("keydown", handleTabKey);
      firstElement?.focus();

      return () => document.removeEventListener("keydown", handleTabKey);
    }
  }, [isOpen, disableFocusTrap, modalRef]);

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return {
    handleOverlayClick,
    firstFocusElementRef,
  };
};
