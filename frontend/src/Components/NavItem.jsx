import {Link} from "react-router-dom"

export default function NavItem({ icon, label, link, active = false, onClick }) {
    return (
      <Link to={link}
        className={`w-full flex items-center space-x-4 p-3 rounded-md transition-colors ${active ? 'text-teal-400 bg-neutral-800' : 'hover:bg-neutral-800'}`}
        onClick={onClick}
      >
            {icon}
            <span>{label}</span>
      </Link>
    );
  }
