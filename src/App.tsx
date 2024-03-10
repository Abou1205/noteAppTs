import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import CreatePage from "./pages/CreatePage";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Note, NoteData, Tag } from "./types";
import { v4 } from "uuid";
import Layout from "./components/Layout";

const App = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);

  // new tag
  const createTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  // new note
  const createNote = (noteData: NoteData) => {
    // add id
    const newNote: Note = {
      id: v4(),
      ...noteData,
    };

    setNotes((prev) => [...prev, newNote]);
  };

  // delete note
  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  // update note
  const updateNote = (id: string, updatedData: NoteData) => {
    const updated = notes.map((note) =>
      note.id == id ? { id, ...updatedData } : note
    );

    setNotes(updated);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage notes={notes} availableTags={tags} />}
        />
        <Route
          path="/new"
          element={
            <CreatePage
              handleSubmit={createNote}
              createTag={createTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<Layout notes={notes} />}>
          <Route index element={<DetailPage deleteNote={deleteNote} />} />
          <Route
            path="edit"
            element={
              <EditPage
                createTag={createTag}
                availableTags={tags}
                onSubmit={updateNote}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
