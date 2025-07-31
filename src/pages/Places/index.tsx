import { useState } from "react";
import { Button, Input } from "../../components";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const Places: React.FC = () => {
    const navigate = useNavigate();
    const { name } = useUser();
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        console.log('Searching for:', query);
    };

    const handleLogout = () => {
        console.log('Logout');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#fefaf0] text-black">
            <Navbar userName={name} onLogout={handleLogout} />

            <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
                <section>
                    <h2 className="text-4xl font-bold mb-6">Your favorite breweries</h2>
                    <p className="text-center text-lg text-gray-700 my-44">
                        {`You don’t have any favorite brewery :(`}
                    </p>
                </section>

                <hr className="border-t border-gray-400 my-6" />

                <section>
                    <div className="flex flex-row justify-between">
                        <h2 className="text-4xl font-bold mb-4">Add a new brewery</h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                            <Input
                                placeholder="Find for your new favorite brewery"
                                value={query}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setQuery(e.target.value)
                                }
                                aria-label="Search brewery"
                            />
                            <Button onClick={handleSearch}>Search</Button>
                        </div>
                    </div>
                </section>

                <p className="text-center text-lg text-gray-700 my-44">
                    Search for a brewery to see the results
                </p>
            </main>
        </div>
    );
};

export default Places