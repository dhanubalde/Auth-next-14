import Navbar from "./_components/navbar"

interface ProtectedLayoutProps { 
  children: React.ReactNode
}

const ProtectedLayout = ({ 
  children
}: ProtectedLayoutProps) => {
  return (
    <div className=" h-full w-full flex flex-col gap-y-5 items-center bg-gradient-to-tr from-sky-400 via-rose-400 to-blue-800">
        <Navbar/>
      {children}
    </div>
  )
}

export default ProtectedLayout