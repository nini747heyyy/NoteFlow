import { useState, useEffect } from "react";

export default function NoteForm({ onClose, note, onSave, loading }) {
  const isEditing = !!note;
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: 'General',
  });

  useEffect(() => {
    if (note) {
      setForm({
        title: note.title || '',
        content: note.content || '',
        category: note.category || 'General',
      });
    }
  }, [note]);

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave(form);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(109,40,217,0.15)', backdropFilter: 'blur(4px)' }}
      onClick={handleBackdrop}
    >
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">
            {isEditing ? 'Edit Note' : 'New Note'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Title *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Note Title..."
              required
              className="input-focus w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="e.g Work, Personal..."
              className="input-focus w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Content</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Write your note here..."
              rows={5}
              className="input-focus w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 resize-none"
            />
          </div>
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-violet-500 hover:bg-violet-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}