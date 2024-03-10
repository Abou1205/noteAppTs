import { Button, Stack, Form, Row, Col } from "react-bootstrap";
import { Note, Tag } from "../../types";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import ReactSelect from "react-select";
import NoteCard from "../../components/Card";

type MainPageProps = {
  notes: Note[];
  availableTags: Tag[];
};

const MainPage = ({ notes, availableTags }: MainPageProps) => {
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const filteredNotes = useMemo(
    () =>
      notes.filter((note) => {
        return (
          (title === "" ||
            note.title.toLowerCase().includes(title.toLowerCase())) &&
          (selectedTags.length === 0 ||
            selectedTags.every((s_tags) =>
              note.tags.some((noteTag) => noteTag.value === s_tags.value)
            ))
        );
      }),
    [title, selectedTags, notes]
  );

  return (
    <div className="container py-5">
      {/* top */}
      <Stack direction="horizontal" className="justify-content-between ">
        <h1>Notes</h1>
        <Link to="/new">
          <Button>Create</Button>
        </Link>
      </Stack>

      {/* filter */}
      <Form className="mt-4">
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Search By Title</Form.Label>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                className="shadow"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Search By Tag</Form.Label>
              <ReactSelect
                onChange={(all_tags) => setSelectedTags(all_tags)}
                className="text-black"
                isMulti
                options={availableTags}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {/* notes list*/}
      <Row xs={1} sm={2} lg={3} xl={4} className="container g-2 mt-4">
        {filteredNotes.map((note) => (
          <Col>
            <NoteCard key={note.id} note={note} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MainPage;
