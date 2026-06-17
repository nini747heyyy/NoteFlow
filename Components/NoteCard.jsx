const CHIP_COLORS = {
  Learning:  "chip-lavender",
  Ideas:     "chip-mint",
  Work:      "chip-sky",
  Reference: "chip-peach",
  Personal:  "chip-rose",
  General:   "chip-cream",
};

export default function NoteCard({note, onToggleFavorite, onEdit, onDelete}){
    const chipClass = CHIP_COLORS[note.category] || 'chip-cream';
    const preview = note.content?.length > 110 ? note.content.slice(0,110) + "..." : note.content || "No content";

    return(
        <div className="card-hover bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-3 shadow-sm">
            <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2">{note.title}</h3>
                <button onClick={() => onToggleFavorite(note)} className="flex-shrink-0 text-lg">
                    {note.isFavorite ? '⭐' : '☆'}
                </button>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed flex-1">{preview}</p>
            <div className="flex items-center justify-between">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${chipClass}`}>{note.category}</span>
                <div className="flex gap-1">
                    <button onClick={() => onEdit(note)} className="text-xs text-gray-400 hover:text-violet-500 px-2 py-1 rounded-lg hover:bg-violet-50 transition-colors">Edit</button>
                    <button onClick={() => onDelete(note._id)} className="text-xs text-gray-400 hover:text-red-400 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors">Delete</button>
                </div>
            </div>
        </div>
    )
}