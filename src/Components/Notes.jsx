import { useState, useEffect } from 'react';
import './styles/notes.css'; // Remember to create this CSS file with the provided styles

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes'));

    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  const addNote = () => {
    const newNote = {
      id: new Date().getTime(),
      content: '',
    };
    setNotes([...notes, newNote]);
  };

  const handleNoteChange = (id, content) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, content } : note
    );
    setNotes(updatedNotes);
  };

  const handleSave = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
    alert('Notes saved successfully!');
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div className="notes-container">
      <h2>Notes</h2>
      <div className="notes-buttons">
        <button onClick={addNote}>Add Note</button>
        <button onClick={handleSave}>Save Notes</button>
      </div>
      {notes.map((note) => (
        <div className="note-item" key={note.id}>
          <textarea
            value={note.content}
            onChange={(e) => handleNoteChange(note.id, e.target.value)}
            className="note-textarea"
            placeholder="Enter your note here..."
          />
          <button onClick={() => handleDeleteNote(note.id)} className="delete-button">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notes;
