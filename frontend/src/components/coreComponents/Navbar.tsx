
import { ChessKnight } from "lucide-react"
import { NavLink } from "react-router-dom"

export default function Navbar() {
    return (
        <div>
            <nav className="h-20 border-b border-white/10 px-10 flex items-center justify-between bg-black text-white">
                <NavLink to={"/"} className="flex items-center gap-3">
                    <ChessKnight className="text-green-500" size={34} />
                    <h1 className="text-3xl font-bold">
                        Check<span className="text-green-500">Mate</span>
                    </h1>
                </NavLink>

                <div className="hidden md:flex items-center gap-10 text-lg">
                <button className="hover:text-green-500 transition">
                    Features
                </button>

                <button className="hover:text-green-500 transition">
                    About
                </button>

                <NavLink to={"/signin"} className="border border-green-500 px-6 py-2 rounded-xl hover:bg-green-500 hover:text-black transition">
                    Signin
                </NavLink>
                </div>
            </nav>
        </div>
    )
}