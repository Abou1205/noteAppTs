import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { Tag } from "../../types";
import { v4 } from "uuid";
import { CreatePageProps } from "../../pages/CreatePage";

const CustomForm = ({
  availableTags,
  handleSubmit,
  createTag,
  title = "",
  tags = [],
  markdown = "",
}: CreatePageProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });

    navigate(-1);
  };
  return (
    <Form onSubmit={handleSend}>
      <Stack>
        {/* top */}
        <Row>
          <Col>
            <Form.Label>Title</Form.Label>
            <Form.Control
              defaultValue={title}
              ref={titleRef}
              required
              className="shadow"
            />
          </Col>
          <Col>
            <Form.Label>Tags</Form.Label>
            <CreatableSelect
              onChange={(all_tags) => setSelectedTags(all_tags)}
              onCreateOption={(text) => {
                // create tag obj and add id
                const newTag: Tag = { label: text, value: v4() };

                // save the new tag to the local
                createTag(newTag);

                // add new tag to the state
                setSelectedTags([...selectedTags, newTag]);
              }}
              options={availableTags}
              value={selectedTags}
              isMulti
              className="text-black shadow"
            />
          </Col>
        </Row>
        {/* content */}
        <Form.Group className="mt-4">
          <Form.Label>Content (support markdown)</Form.Label>
          <Form.Control
            defaultValue={markdown}
            ref={markdownRef}
            as="textarea"
            className="shadow"
            style={{ minHeight: "300px", maxHeight: "500px" }}
          />
        </Form.Group>
        {/* bottom */}
        <Stack
          direction="horizontal"
          gap={4}
          className="mt-3 justify-content-end "
        >
          <Button type="submit">Save</Button>
          <Button
            onClick={() => navigate(-1)}
            type="button"
            variant="secondary"
          >
            Back
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default CustomForm;
