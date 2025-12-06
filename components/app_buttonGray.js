// Source - https://stackoverflow.com/q
// Posted by Ricardo
// Retrieved 2025-12-07, License - CC BY-SA 4.0

// /components/app_buttonGray.js
export default function AppButtonGray({ size, onClick, children }){
    return(
        <button onClick={onClick} className={`flex w-${size ? size : "36"} mt-2 p-1 rounded-md bg-gray-500 hover:bg-gray-800 shadow-lg justify-center`}>
            {children}
        </button>
        
    )
}
// https://stackoverflow.com/questions/68187303/whats-the-right-way-to-do-onclick-in-a-nextjs-component