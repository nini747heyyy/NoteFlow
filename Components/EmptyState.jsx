export default function EmptyState({onAddNote}){
    return(
        <div className="flex flex-col items-center justify-center py-24 px-6 text-center ">
            <div className="w-20 h-20 rounded-3xl bg-pastel-lavender flex items-center justify-center text-4xl mb-5">Notes</div>
            <h3 className="font-semibold text-gray-700 text-lg mb-2">No Notes Yet</h3>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed mb-6">
                Start Capturing Your Ideas-Click The button below to create a new note
            </p>
            <button onClick={onAddNote} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-violet-500 hover:bg-violet-600 transition-colors">
                + Create Your First Note
            </button>
        </div>
    )
}