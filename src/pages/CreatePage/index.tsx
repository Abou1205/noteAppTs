import CustomForm from "../../components/Form";
import { NoteData, Tag } from "../../types";

export type CreatePageProps = {
  handleSubmit: (noteData: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

const CreatePage = ({
  availableTags,
  createTag,
  handleSubmit,
}: CreatePageProps) => {
  return (
    <div className="container py-5">
      <h2>Create New Note</h2>
      <CustomForm
        handleSubmit={handleSubmit}
        createTag={createTag}
        availableTags={availableTags}
      />
    </div>
  );
};

export default CreatePage;
