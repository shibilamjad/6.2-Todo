import { Button } from "../../ui/Button";
import "./EditSection.css";

export function EditSection({
  handleId,
  fieldInput,
  description,
  handleUpdate,
  setTodoValue,
  newTodoValue,
}) {
  function handleEditSubmit(e) {
    e.preventDefault();
    if (!newTodoValue) return;
    if (!description) return;
    handleUpdate();
    setTodoValue("");
    handleId();
  }

  function handleChange(e) {
    setTodoValue(e.target.value);
  }

  return (
    <form className="EditSection-container" onSubmit={handleEditSubmit}>
      <input
        type="text"
        id={fieldInput}
        placeholder="New Todo"
        value={fieldInput}
        onChange={handleChange}
      />

      <Button type="submit" onClick={handleId}>
        Add
      </Button>
      <Button onClick={handleId}>cancel</Button>
    </form>
  );
}
