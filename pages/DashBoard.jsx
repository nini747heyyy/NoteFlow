import Navbar from "../Components/Navbar";
import NoteCard from "../Components/NoteCard";
import EmptyState from "../Components/EmptyState";
import NoteForm from "../Components/NoteForm";
import { useState } from "react";

const DUMMY_NOTES = [
  {
    _id: "1",
    title: "React Component Notes",
    content: "Components are functions that return JSX.",
    category: "Learning",
    isFavorite: true,
    createdAt: "2025-01-15T10:30:00Z",
  },
  {
    _id: "2",
    title: "Bootcamp Project Ideas",
    content: "Build a weather app, expense tracker, or notes app.",
    category: "Ideas",
    isFavorite: false,
    createdAt: "2025-01-16T14:00:00Z",
  },
  {
    _id: "3",
    title: "Tailwind Cheat Sheet",
    content: "flex, grid, p-4, m-2, text-lg, font-bold, rounded-xl",
    category: "Reference",
    isFavorite: false,
    createdAt: "2025-01-17T09:00:00Z",
  },
];

export default function DashBoard() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState(DUMMY_NOTES);
  const [editingNote, setEditingNote] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditingNote(null);
    setShowModal(true);
  };

  const openEdit = (note) => {
    setEditingNote(note);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this note?")) return;
    setNotes(notes.filter((note) => note._id !== id));
  };

  const handleToggleFavorite = (noteToUpdate) => {
    setNotes(
      notes.map((note) =>
        note._id === noteToUpdate._id
          ? { ...note, isFavorite: !note.isFavorite }
          : note
      )
    );
  };

  const handleSave = (formData) => {
    setSaving(true);
    if (editingNote) {
      setNotes(
        notes.map((note) =>
          note._id === editingNote._id ? { ...note, ...formData } : note
        )
      );
    } else {
      const newNote = {
        _id: Date.now().toString(),
        ...formData,
        isFavorite: false,
        createdAt: new Date().toISOString(),
      };
      setNotes([newNote, ...notes]);
    }
    setSaving(false);
    setShowModal(false);
    setEditingNote(null);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-main)" }}>
      <Navbar
        search={search}
        onSearchChange={setSearch}
        totalNotes={filteredNotes.length}
      />
      <main className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-sm font-bold text-gray-800">My Notes</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {search ? `Results for '${search}'` : "All Your Notes"}
            </p>
          </div>
          <button
            onClick={openCreate}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-violet-500 hover:bg-violet-600 transition-colors shadow-sm"
          >
            + New Note
          </button>
        </div>

        {filteredNotes.length === 0 ? (
          <EmptyState onAddNote={openCreate} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={openEdit}
                onDelete={handleDelete}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <NoteForm
          note={editingNote}
          onClose={() => {
            setShowModal(false);
            setEditingNote(null);
          }}
          onSave={handleSave}
          loading={saving}
        />
      )}
    </div>
  );
}