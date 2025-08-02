import { useNavigate } from "react-router-dom";
import { Button, Card, Input } from "../../components";
import Navbar from "../../components/Navbar";
import { useUser } from "../../contexts/UserContext";
import { useBrewerySearch } from "../../hooks/useBrewerySearch";

const Places: React.FC = () => {
    const navigate = useNavigate();
    const { name, addFavorite, removeFavorite, breweryFavorites } = useUser();
    const { search, setSearch, results, loading, handleSearch } = useBrewerySearch();

    const handleLogout = () => {
        console.log('Logout');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#fefaf0] text-black">
            <Navbar userName={name} onLogout={handleLogout} />

            <main className="max-w-7xl mx-auto px-4 py-8 space-y-10">
                <section>
                    <h2 className="text-5xl font-semibold mb-6">Your favorite breweries</h2>

                    {
                        breweryFavorites.length > 0 ? (
                            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                {breweryFavorites.map((brewery) => (
                                    <Card
                                        key={brewery.id}
                                        title={brewery.name}
                                        address={brewery.street}
                                        location={brewery.city + ", " + brewery.state + " - " + brewery.country}
                                        badges={[brewery.brewery_type, brewery.postal_code, brewery.phone]}
                                        onRemove={() => removeFavorite(brewery.id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-[32px] text-gray-700 my-44">
                                {`You don’t have any favorite brewery :(`}
                            </p>
                        )
                    }
                </section>

                <hr className="border-t border-gray-400 my-6" />

                <section>
                    <div className="flex flex-row justify-between">
                        <h2 className="text-5xl font-semibold mb-4">Add a new brewery</h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                            <Input
                                placeholder="Find for your new favorite brewery"
                                value={search}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setSearch(e.target.value)
                                }
                                aria-label="Search brewery"
                            />
                            <Button onClick={handleSearch}>Search</Button>
                        </div>
                    </div>
                </section>

                {
                    results.length > 0 ? (
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {results.map((result) => (
                                <Card
                                    key={result.id}
                                    title={result.name}
                                    address={result.street}
                                    location={result.city + ", " + result.state + " - " + result.country}
                                    badges={[result.brewery_type, result.postal_code, result.phone]}
                                    onAdd={() => addFavorite(result)}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-[32px] text-gray-700 my-44">
                            Search for a brewery to see the results
                        </p>
                    )
                }
            </main>
        </div>
    );
};

export default Places