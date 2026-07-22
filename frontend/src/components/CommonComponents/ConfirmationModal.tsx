




export default function ConfirmationModal({text, button1Text, button2Text, button1Handler, button2Handler} :
    {text : string, button1Text : string, button2Text : string, button1Handler : () => void, button2Handler : () => void}
){
    return(
        <div className="absolute top-0 flex justify-center items-center h-screen w-screen backdrop-blur-xs">
            <div className="flex flex-col gap-6 bg-slate-900 rounded-2xl py-10 px-5">
                <p>{text}</p>
                <div className="flex items-center justify-between">
                    <button onClick={() => button1Handler()}
                        className="rounded-md px-4 py-2 bg-green-500 text-white font-bold hover:scale-95">
                        {button1Text}
                    </button>
                    <button onClick={() => button2Handler()}
                        className="rounded-md px-4 py-2 bg-red-500 text-white font-bold hover:scale-95">
                        {button2Text}
                    </button>
                </div>
            </div>
        </div>
    )
}