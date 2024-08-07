import MainContent from './MainContent';
import  Navbar  from './Navbar';
import Sidebar  from './Sidebar';

const DashboardPage = () => {
  const menu_items = [
    { id: 1, name: 'My Events', link: '/events', icon: 'fa-solid fa-calendar-check'},
    { id: 2, name: 'My Teams', link: '/teams', icon: 'fa-solid fa-people-group'},
    { id: 3, name: 'Tutorials', link: '/tutorials', icon: 'fa-solid fa-graduation-cap'},
    { id: 4, name: 'Analytics', link: '/analytics', icon: 'fa-solid fa-chart-line'},
    { id: 5, name: 'Contact Us', link: '/contactus', icon: 'fa-regular fa-address-book'},
    { id: 6, name: 'About Us', link: '/aboutus', icon: 'fa-regular fa-address-card'},
  ];

  return (
    <div>
      <Navbar menuItems={menu_items} />
      <div className="flex flex-col"> {/* To place sidebar and main content correctly */}
      <Sidebar menuItems={menu_items} />
      <MainContent />
      </div>
    </div>
  );
};

export default DashboardPage;
