


export default function Button({onClick, text} : {onClick : () => void; text : string}){
    return (
        <button onClick={onClick} className="bg-green-500/80 rounded-md px-4 py-2
            hover:bg-green-500/90 mt-10 w-full text-xl font-bold">
            {text}
        </button>
    )
}