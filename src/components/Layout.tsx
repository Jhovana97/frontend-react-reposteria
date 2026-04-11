import Navbar from "./Navbar";

const Layout = ({ children }: any) => {
    return (
        <>
            <Navbar />
            <div className="p-6">
                {children}
            </div>
        </>
    );
};

export default Layout;