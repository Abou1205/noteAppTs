import { useOutletContext } from "react-router-dom";
import { Note, NoteData, Tag } from "../../types";
import CustomForm from "../../components/Form";

type EditNoteProps = {
  onSubmit: (id: string, updatedData: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const EditPage = ({ onSubmit, createTag, availableTags }: EditNoteProps) => {
  const found: Note = useOutletContext();
  return (
    <div className="container py-5">
      <h2>Edit Note</h2>
      <CustomForm
        handleSubmit={(updatedNote) => onSubmit(found.id, updatedNote)}
        availableTags={availableTags}
        createTag={createTag}
        title={found.title}
        markdown={found.markdown}
        tags={found.tags}
      />
    </div>
  );
};

export default EditPage;
