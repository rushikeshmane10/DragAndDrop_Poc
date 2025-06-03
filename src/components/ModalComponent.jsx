import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";



export default function ModalComponent({
  content,
  openModal,
  onCloseEvent,
  size="3xl",
  showCrossButton = false,
  ForFeedsCreateForm = false,
}) {
  const handleOverlayClick = (event) => {
    // Close only if clicked outside modal content and ForFeedsCreateForm is false
    if (!event.target.closest(".modal-content") && !ForFeedsCreateForm) {
      onCloseEvent();
    }
  };

  useEffect(() => {
    if (openModal) {
      const modalBody = document.querySelector(".modal-body");
      if (modalBody) {
        modalBody.scrollTop = 0;
      }
    }
  }, [openModal]);

  const disableRightClick = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {openModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-transparent bg-opacity-30 "
          onClick={handleOverlayClick}
          onContextMenu={disableRightClick}
        >
          <Modal
            show={true}
            dismissible={false} 
            size={size}
            className="relative rounded-lg overflow-auto max-h-screen "
          >
            <div className="modal-content   ">
              <div className="flex items-center relative">
                {showCrossButton && (
                  <button
                    onClick={onCloseEvent}
                    className="absolute right-3 top-3"
                  >
                    <IoClose className="text-2xl" />
                  </button>
                )}
              </div>
              <ModalBody className="modal-body  overflow-auto ">
                {content}
              </ModalBody>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
}

