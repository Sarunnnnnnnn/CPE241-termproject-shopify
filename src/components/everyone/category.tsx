import { Link } from "react-router-dom";

const Category: React.FC = () => {
    return (
        <div>
            <div className="flex justify-center space-x-[80px] pt-[100px] font-lightgray">
                <Link to="/category" className="hover:text-[#48466D] hover:font-medium">Clothes</Link>
                <Link to="/category" className="hover:text-[#48466D] hover:font-medium">Beauty</Link>
                <Link to="/category" className="hover:text-[#48466D] hover:font-medium">Accessories</Link>
                <Link to="/category" className="hover:text-[#48466D] hover:font-medium">Electronics</Link>
                <Link to="/category" className="hover:text-[#48466D] hover:font-medium">Home</Link>
                <Link to="/category" className="hover:text-[#48466D] hover:font-medium">Sports</Link>
                <Link to="/category" className="hover:text-[#48466D] hover:font-medium">Health</Link>
            </div>
        </div>
    );
};

export default Category;
