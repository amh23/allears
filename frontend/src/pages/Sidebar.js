const Sidebar = () => {
    return (
        <div class="fixed w-64 mt-24 pt-1 bg-white text-slate-950 h-full flex flex-col justify-between shadow-sm shadow-gray-300">
            <div class="p-4 space-y-4">
                <a href="#" class="flex items-center space-x-4 p-2 hover:bg-indigo-200 rounded-md">
                    <i class="fas fa-home"></i>
                    <span>Home</span>
                </a>
                <a href="#" class="flex items-center space-x-4 p-2 hover:bg-indigo-200 rounded-md">
                    <i class="fas fa-user"></i>
                    <span>Profile</span>
                </a>
                <a href="#" class="flex items-center space-x-4 p-2 hover:bg-indigo-200 rounded-md">
                    <i class="fas fa-cog"></i>
                    <span>Settings</span>
                </a>
                <a href="#" class="flex items-center space-x-4 p-2 hover:bg-indigo-200 rounded-md">
                    <i class="fas fa-bell"></i>
                    <span>Notifications</span>
                </a>
                <a href="#" class="flex items-center space-x-4 p-2 hover:bg-indigo-200 rounded-md">
                    <i class="fas fa-envelope"></i>
                    <span>Messages</span>
                </a>
            </div>
            <div class="p-4">
                <a href="#" class="flex items-center space-x-4 p-2 hover:bg-indigo-200  rounded-md">
                    <i class="fas fa-question-circle"></i>
                    <span>Help</span>
                </a>
            </div>
        </div>
    );
}

export default Sidebar;