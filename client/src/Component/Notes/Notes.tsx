// App.tsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Note, NoteFormData, noteSchema } from "./schema";
import { createNote, deleteNote, getNotes, updateNote } from "./services";




const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
  });

  const fetchNotes = async () => {
    const data= await getNotes();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const onSubmit = async (data: NoteFormData) => {
    if (editingNote) {
      await updateNote(editingNote._id, data);
      setEditingNote(null)
    } else {
      await createNote(data);
    }
    reset({ title: "", content: "" });
    fetchNotes();
  
  };

  const handleDelete = async (id: string) => {
    await deleteNote(id);
    reset({ title: "", content: "" });
    fetchNotes();
  };
const handleUpdate=async(note:Note)=>{
  setEditingNote(note); // set note being edited
  reset({ title: note.title, content: note.content }); 
}
  return (
    <div style={{ padding: 20 }}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 400 }}>
        <input type="text" placeholder="Title" {...register("title")} />
        {errors.title && <span style={{ color: "red" }}>{errors.title.message}</span>}

        <textarea placeholder="Content" {...register("content")} />
        {errors.content && <span style={{ color: "red" }}>{errors.content.message}</span>}

        <button type="submit"> {editingNote ? "Update Note" : "Add Note"}</button>
        {editingNote && ( <button type="button" onClick={() => {  setEditingNote(null); reset({ title: "", content: "" });; }}> Cancel Edit</button>)}
        
      </form>

      <div style={{ marginTop: 30 }}>
        {notes.map((note) => (
          <div key={note._id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <small>{new Date(note.createdAt).toLocaleString()}</small>
            <br />
          <div style={{display:'flex',gap:'10px'}}>
            <button onClick={() => handleDelete(note._id)} style={{ marginTop: 5 }}>
              Delete
            </button>
            <button onClick={() => handleUpdate(note)} style={{ marginTop: 5 }}>
              Edit
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
