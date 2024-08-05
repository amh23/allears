import  Navbar  from './Navbar';
import Sidebar  from './Sidebar';

const DashboardPage = () => {
  const menu_items = [
    { id: 1, name: 'My Events', link: '/events'},
    { id: 2, name: 'My Teams', link: '/teams'},
    { id: 3, name: 'Tutorials', link: '/tutorials'},
    { id: 4, name: 'Analytics', link: '/analytics'},
    { id: 5, name: 'Contact Us', link: '/contactus'},
    { id: 6, name: 'About Us', link: '/aboutus'},
  ];

  return (
    <div>
      <Navbar menuItems={menu_items} />
      <Sidebar menuItems={menu_items} />
    </div>
  );
};

export default DashboardPage;
