import React from "react";
import { motion } from "framer-motion";
import classes from "./confirmationModal.module.css";
import {
  onClose,
  selectConfirmationModalState,
} from "../../../store/confirmationModal/confirmationModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useDeleteAddressMutation from "../../../tanstack-query/address/useDeleteAddressMutation";

export const ConfirmationModal = () => {
  const { isOpen, modalData } = useSelector(selectConfirmationModalState);
  const {
    mutateAsync: deleteMutation,
    isLoading: isDeleting,
    isSuccess: isDeleteSuccess,
  } = useDeleteAddressMutation();
  console.log(modalData);

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(onClose());
  };
  const handleDelete = async () => {
    try {
      // Trigger the delete mutation
      const response = await deleteMutation(modalData.id);

      toast.success(response.message.displayMessage);
    } catch (error) {
      toast.error(error.response.data.message.displayMessage);
    } finally {
      dispatch(onClose());
    }
  };
  return isOpen ? (
    <motion.div
      className={classes.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={classes.box}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: -120 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
      >
        <div className={classes.box__content}>
          <div className={classes.box__content__head}>
            <h1 className={classes.box__content__head__title}>
              Confirm Deletion
            </h1>
            <button
              className={classes.box__content__close}
              onClick={handleClose}
            ></button>
          </div>
          <div className={classes.box__content__info}>
            <p className={classes.box__content__info__quest}>
              Are you sure you want to delete this address?
            </p>
            <div className={classes.box__content__info__address}>
              <p className={classes.box__content__info__para}>
                {`${modalData.address_line1}, `}
              </p>
              <p className={classes.box__content__info__para}>
                {`${modalData.address_line2}`}
              </p>
              <p className={classes.box__content__info__para}>
                {`${modalData.city}, ${modalData.state} ${modalData.postal_code}`}
              </p>
              <p className={classes.box__content__info__para}>
                {modalData.country}
              </p>
              <p className={classes.box__content__info__para}>
                Phone Number: {modalData.mobile_no}
              </p>
            </div>

            <hr className={classes.box__sep} />
          </div>
          <div className={classes.box__content__btns}>
            <button
              className={classes.box__content__btn__no}
              onClick={handleClose}
            >
              No
            </button>
            <button
              className={classes.box__content__btn__yes}
              onClick={handleDelete}
            >
              Yes
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  ) : null;
};
