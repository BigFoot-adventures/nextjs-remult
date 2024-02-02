import Link from 'next/link';
import Image from 'next/image'
import logo from '/public/images/temp-logo.png'
import userico from '/public/images/user-icon-lg-w.png'

function NavLink({ href, inner }: { href: string, inner: string | JSX.Element}) { return (
    <li>
        <Link href={href} className='px-5'>
            <span>{inner}</span>
        </Link>
    </li>
)}

export default function Nav() {
    return (
        <nav className= "sticky flex top-0 justify-between w-screen items-center px-4 bg-gradient-to-r from-emerald-800 to-[310px] to-emerald-400 text-black">
            <Link className="p-1 mr-40 flex-shrink-0" href="/">
                <Image width={100} height={100} src={logo} alt="Temporary Logo"/>
            </Link>
            <ul id="navigation" className="flex flex-grow justify-between items-center text-l max-sm:absolute max-sm:inset max-sm:hidden">
                <NavLink href="/art" inner="Art"/>
                <NavLink href="/artists" inner="Artists"/>
                <NavLink href="/exhibitions" inner="Exhibitions"/>
                <NavLink href="/literature" inner="Literature"/>
                <NavLink href="/media" inner="Media"/>
                <NavLink href="/sales" inner="Sales"/>
            </ul>
            <Link className="p-1 ml-40 flex-shrink-0" href="/">
                <Image width={30} height={30} src={userico} alt="User Icon"/>
            </Link>
            {<button id="nav-toggle" aria-controls="navigation" aria-expanded="false" className='!shadow-none'>
                <span className="sr-only">Menu</span>
            </button>}
        </nav>
    );
} 