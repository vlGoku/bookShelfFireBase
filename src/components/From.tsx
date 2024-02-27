import { Label } from "@mui/icons-material";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import useBooks, { TBook } from "./useBooks";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export default function Form({ open, handleClose }: Props) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    pages: 0,
    read: false,
  });
  const [, addBook] = useBooks();

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Book</DialogTitle>
      <DialogContent>
        <DialogContentText>Add a Book to the Bookshelf</DialogContentText>
        <TextField
          required
          autoFocus
          margin="dense"
          id="title"
          label="Book Title"
          type="text"
          fullWidth
          variant="standard"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <TextField
          required
          autoFocus
          margin="dense"
          id="author"
          label="Author"
          type="text"
          fullWidth
          variant="standard"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        />
        <TextField
          required
          autoFocus
          margin="dense"
          id="pages"
          label="Pages"
          type="number"
          fullWidth
          variant="standard"
          value={formData.pages}
          onChange={(e) =>
            setFormData({ ...formData, pages: Number(e.target.value) })
          }
        />

        <FormControlLabel
          control={<Checkbox />}
          title="read"
          value={formData.read}
          label="Read?"
        />
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button
          onClick={() => {
            (addBook as (book: TBook) => Promise<void>)(formData as TBook);
            setFormData({
              title: "",
              author: "",
              pages: 0,
              read: false,
            });
            handleClose();
          }}
        >
          Add Book
        </Button>
      </DialogActions>
    </Dialog>
  );
}
