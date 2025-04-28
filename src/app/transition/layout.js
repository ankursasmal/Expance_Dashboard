// app/dashboard/layout.js
export const metadata = {
    title: 'Dashboard - My App',
    description: 'Dashboard section with custom layout',
  };
  
  export default function DashboardLayout({ children }) {
    return (
      <div >
       
  
        {/* Main content */}
        <main className="flex-1 p-6 ">

          {/* all component are write */}
          {children} 
          {/* all component are write */}

        </main>
      </div>
    );
  }
  