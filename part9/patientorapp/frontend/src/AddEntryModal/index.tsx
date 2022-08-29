import { Dialog, DialogContent, DialogTitle, Divider } from "@material-ui/core";
import { EntryWithoutId } from "../types";
import { AddEntryForm } from "./addEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

const addEntryModal = ({ modalOpen, onClose, onSubmit }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add new entry</DialogTitle>
    <Divider />
    <DialogContent>
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

export default addEntryModal;
