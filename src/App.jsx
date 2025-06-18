import { useState, useCallback, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolAllowed, setSymbolAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) string += "0123456789";
    if (symbolAllowed) string += "~!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * string.length);
      pass += string.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, symbolAllowed]); //does not re-render the function as long as the dependencies do not change


  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, symbolAllowed]);

  const copyPasswordToClipboard = ()=>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select();
  }

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Password Generator
        </h1>

        <div className="flex mb-6">
          <input
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
            className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={copyPasswordToClipboard} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md transition duration-200">
            Copy
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="w-3/4 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="length" className="text-gray-700">
              Length: {length}
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="number"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="number" className="ml-2 text-gray-700">
              Include Numbers
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              defaultChecked={symbolAllowed}
              id="symbol"
              onChange={() => {
                setSymbolAllowed((prev) => !prev);
              }}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="symbol" className="ml-2 text-gray-700">
              Include Symbols
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
