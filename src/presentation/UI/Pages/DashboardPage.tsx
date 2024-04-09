import ProjectsMenu from "@/presentation/components/organisms/Dashboard/ProjectsMenu";

const DashboardPage = () => {
  return (
    <>
      <header className='text-center'>
        <h1>Dashboard</h1>
      </header>
      <main className='px-5 grid md:grid-cols-12 gap-4'>
        <ProjectsMenu />
        <p className="col-span-10">Other stuffs</p>
      </main>
    </>
  );
};

export default DashboardPage;
