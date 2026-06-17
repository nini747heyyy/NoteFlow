export default function Navbar({search, onSearchChange, totalNotes}){
    return(
        <header className="bg-white border-b border-gray-100 px-4 md:px-6 h-14 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
                <div className="w-8 h-8 rounded-xl bg-violet-500 flex items-center justify-center text-white font-bold text-sm">N</div>
                <span className="font-semibold text-gray-800 hidden sm:inline">NoteFlow</span>
            </div>
            {/* Search Bar */}
            <div className="flex-1 max-w-sm relative">
                <input
                   type="text"
                   placeholder="Search Notes..."
                   value={search}
                   onChange={(e) => onSearchChange(e.target.value)}
                   className="input-focus w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-4 py-2 text-sm text-gray-700 placeholder-gray-300 transition-all"
                />
            </div>
            <div className="flex-1" />
            {/* Note Badge */}
            <span className="text-sm bg-pastel-lavender text-violet-600 font-medium px-3 py-1.5 rounded-full">
                {totalNotes} {totalNotes === 1 ? 'note' : 'notes'}
            </span>
        </header>
    )
}