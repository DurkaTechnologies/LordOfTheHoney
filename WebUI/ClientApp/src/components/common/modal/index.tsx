import * as React from "react";
import classNames from "classnames";

export interface IModalProps {
  content: string;
  isActive: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

const BulmaModal = ({
  content,
  isActive,
  onSuccess,
  onCancel,
}: IModalProps) => {
  return (
    <div className={classNames("modal", { "is-active": isActive })}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modal title</p>
          <button className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">{content}</section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={onSuccess}>
            Success
          </button>
          <button className="button" onClick={onCancel}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default BulmaModal;
