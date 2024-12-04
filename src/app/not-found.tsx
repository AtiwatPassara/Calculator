import Link from "next/link";

const Notfound : React.FC = () => {
    return      <div>
                    <div>
                        <h1>Page not found</h1>
                    </div>
                    <div>
                        <h2>Return to <span><Link href='/' className="font-bold">Home</Link></span></h2>
                    </div>
                </div>
}

export default Notfound;