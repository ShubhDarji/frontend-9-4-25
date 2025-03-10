export function Button({ children, className, size }) {
    return (
      <button className={`px-4 py-2 bg-blue text-black rounded ${className} ${size === "lg" ? "text-lg px-6 py-3" : ""}`}>
        {children}
      </button>
    );
  }
  