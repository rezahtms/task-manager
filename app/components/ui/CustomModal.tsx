"use client";

import { Box, Fade, IconButton, Modal, Slide } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CloseIcon from "../icon/CloseIcon";

interface Props {
  trigger: React.ReactNode;
  title?: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  ariaLabel?: string;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  animationType?: "fade" | "scale" | "slide" | "flip";
}

const CustomModal: React.FC<Props> = ({
  trigger,
  title,
  children,
  className = "",
  size = "md",
  ariaLabel = "dialog",
  closeOnOverlayClick = true,
  showCloseButton = true,
  animationType = "scale",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal();
    }
  }, []);

  const handleBackdropClick = useCallback(() => {
    if (closeOnOverlayClick) {
      closeModal();
    }
  }, [closeOnOverlayClick]);

  const handleModalClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) {
    return <div onClick={openModal}>{trigger}</div>;
  }

  const modalStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: sizeClasses[size],
    maxWidth: "100%",
    maxHeight: "calc(100vh - 4rem)",
    overflow: "auto",
    bgcolor: "background.paper",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    boxShadow: 24,
    p: 0,
    outline: "none",
  };

  const renderModalContent = () => (
    <Box
      sx={modalStyle}
      ref={modalRef}
      onClick={handleModalClick}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 pt-4 px-6">
        {title && (
          <h2 className="text-sm font-semibold text-gray-800 m-0">{title}</h2>
        )}

        {showCloseButton && (
          <IconButton
            ref={initialFocusRef}
            onClick={closeModal}
            aria-label="Close dialog"
            sx={{
              color: "#64748b",
              "&:hover": {
                color: "#334155",
              },
              transition: "color 0.2s ease",
              "&:focus": {
                outline: "none",
                boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
                borderRadius: "50%",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </div>

      <div className={title ? "p-6 pt-4" : "p-6"}>{children}</div>
    </Box>
  );

  const renderTransitionedModal = () => {
    switch (animationType) {
      case "fade":
        return (
          <Fade in={isOpen} timeout={{ enter: 300, exit: 200 }}>
            {renderModalContent()}
          </Fade>
        );
      case "slide":
        return (
          <Slide direction="up" in={isOpen} timeout={{ enter: 300, exit: 200 }}>
            {renderModalContent()}
          </Slide>
        );
      case "scale":
      case "flip":
      default:
        return renderModalContent();
    }
  };

  return (
    <>
      <div onClick={openModal}>{trigger}</div>
      <Modal
        open={isOpen}
        onClose={handleBackdropClick}
        className={`${className}`}
        closeAfterTransition
        BackdropProps={{
          onClick: handleBackdropClick,
          timeout: 300,
        }}
      >
        {renderTransitionedModal()}
      </Modal>
    </>
  );
};

export default CustomModal;
