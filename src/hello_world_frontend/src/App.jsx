import { useState } from "react";
import { hello_world_backend } from "declarations/hello_world_backend";

function App() {
  const [greeting, setGreeting] = useState("");
  const [submittedNames, setSubmittedNames] = useState([]);
  const [showNames, setShowNames] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    try {
      const greeting = await hello_world_backend.greet(name);
      setGreeting(greeting);
      event.target.elements.name.value = "";
    } catch (error) {
      console.error("Error submitting name:", error);
    }
    return false;
  }

  async function handleShowNames() {
    try {
      const names = await hello_world_backend.getSubmittedNames();
      setSubmittedNames(names);
      setShowNames(true);
    } catch (error) {
      console.error("Error fetching names:", error);
    }
  }

  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <div className="text-center">
        <img src="/logo2.svg" alt="DFINITY logo" className="mx-auto" />
        <br />
        <br />

        {/* Greeting Form */}
        <form action="#" onSubmit={handleSubmit} className="mb-6">
          <div className="flex items-center justify-center gap-2">
            <label htmlFor="name" className="text-gray-700">
              Enter your name:{" "}
            </label>
            <input
              id="name"
              alt="Name"
              type="text"
              className="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition-colors"
            >
              Click Me!
            </button>
          </div>
        </form>

        {/* Greeting Display */}
        <section id="greeting" className="text-xl font-medium my-4">
          {greeting}
        </section>

        {/* Show Names Button */}
        <button
          onClick={handleShowNames}
          className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition-colors mt-4"
        >
          Show Submitted Names
        </button>

        {/* Names List */}
        {showNames && submittedNames.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Previously Submitted Names:</h3>
            <ul className="list-disc list-inside">
              {submittedNames.map((name, index) => (
                <li key={index} className="text-gray-700">
                  {name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {showNames && submittedNames.length === 0 && (
          <div className="mt-4 text-gray-600">
            No names have been submitted yet.
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
