import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import profile from '../../assets/profile.svg';
import down from '../../assets/down.svg';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full bg-white z-50">
            <div className="flex items-center px-[70px] pt-[5px] h-[70px]">
                <Link to="/" className="mr-[20px]">
                    <img src={logo} alt="Logo" className="w-[230px]" />
                </Link>
                <div className="font-general font-medium text-[20px] flex w-full justify-center">Shop Name</div>
                <div className="flex items-center justify-center gap-[10px] mr-[20px]" >
                    <img src={profile} alt="Profile" />
                    <div className="font-general" >username</div>
                    <img src={down} alt="Down" />
                </div>
            </div>
            <div className="border-b border-[#48466D] mx-[56px]"></div>
        </nav>
    )
}

export default Navbar;
