import useScreenSize from "../util/useScreenSize";
const Sidebar = ({ menuItems = [] }) => {
    const { width } = useScreenSize();

    return (
        <div class={`fixed lg:w-64 md:w-58 mt-24 pt-1 bg-white text-slate-950 h-full flex flex-col justify-between shadow-sm shadow-gray-300 transform 
        ${width > 640 ? 'translate-x-0' : '-translate-x-full' } transition-transform duration-300 ease-in-out z-20`}>
            <div class="p-4 space-y-4">
                {   menuItems.map(item => (
                    <div key={item.id}>
                        <a href={item.link}  class="flex items-center space-x-4 p-2 hover:bg-blue-300 rounded-md">
                        <i className={`${item.icon} text-xl text-blue-500 px-5`}></i>
                        {item.name}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;