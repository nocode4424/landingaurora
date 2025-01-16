"use client";
import React from "react";

function MainComponent() {
  const [password, setPassword] = useState("");
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);

  useEffect(() => {
    const timer1 = setInterval(() => {
      setCount1((prev) => (prev < 3 ? prev + 1 : 0));
    }, 2000);
    const timer2 = setInterval(() => {
      setCount2((prev) => (prev < 10 ? prev + 1 : 0));
    }, 1000);
    const timer3 = setInterval(() => {
      setCount3((prev) => (prev < 89 ? prev + 1 : 0));
    }, 50);

    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
      clearInterval(timer3);
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && password === "1234") {
      window.location.href = "HTTP://WWW.DATAYALL.COM/upload.html";
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/db/aurora", {
        method: "POST",
        body: JSON.stringify({
          query:
            "INSERT INTO `contact_messages` (`name`, `email`, `message`) VALUES (?, ?, ?)",
          values: [name, email, message],
        }),
      });
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1931] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-8 left-8 z-20">
        <span
          className="text-7xl md:text-9xl font-bold text-[#4A90E2] font-roboto"
          style={{
            WebkitTextStroke: "2px white",
            textShadow: "0 0 15px rgba(74, 144, 226, 0.2)",
            color: "transparent",
          }}
        >
          Data Y'all
        </span>
      </div>
      <div className="absolute inset-0">
        {[...Array.from({ length: 50 })].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full w-[2px] h-[2px]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      <div className="text-center z-10 max-w-3xl mx-auto mt-32">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 mt-20">
          <span className="block">Big Solutions.</span>
          <span className="block">Bigger Impact.</span>
        </h1>
        <p className="text-lg md:text-xl mb-16 text-gray-300">
          We solve the problems others can't.
          <br />
          Just ask the world's largest companies.
        </p>
        <div className="grid grid-cols-3 gap-8 text-center mb-16">
          <div>
            <div className="text-[#4A90E2] text-6xl md:text-7xl font-bold mb-2">
              {count1}B
            </div>
            <div className="text-sm text-gray-300">Annual Client Savings</div>
          </div>

          <div>
            <div className="text-[#4A90E2] text-6xl md:text-7xl font-bold mb-2">
              {count2}M
            </div>
            <div className="text-sm text-gray-300">Daily Transactions</div>
          </div>

          <div>
            <div className="text-[#4A90E2] text-6xl md:text-7xl font-bold mb-2">
              {count3}%
            </div>
            <div className="text-sm text-gray-300">
              Average Performance Gain
            </div>
          </div>
        </div>

        <div
          className={`mt-16 bg-[#0F2544] rounded-lg shadow-xl mx-auto transition-all duration-300 ease-in-out ${
            isFormActive
              ? "p-8 max-w-md"
              : "p-4 max-w-[200px] cursor-pointer hover:bg-[#162d4f]"
          }`}
          onClick={() => !isFormActive && setIsFormActive(true)}
        >
          <h2
            className={`font-bold text-[#4A90E2] transition-all duration-300 ${
              isFormActive ? "text-2xl mb-6" : "text-lg mb-0"
            }`}
          >
            Contact Us
          </h2>
          {isFormActive && (
            <>
              {submitted ? (
                <div className="text-green-400 text-center py-4">
                  Thank you for your message! We'll be in touch soon.
                </div>
              ) : (
                <form
                  onClick={(e) => e.stopPropagation()}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      required
                      className="w-full bg-transparent border-b border-gray-600 p-2 focus:outline-none focus:border-[#4A90E2] transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your Email"
                      required
                      className="w-full bg-transparent border-b border-gray-600 p-2 focus:outline-none focus:border-[#4A90E2] transition-colors"
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your Message"
                      required
                      rows="4"
                      className="w-full bg-transparent border-b border-gray-600 p-2 focus:outline-none focus:border-[#4A90E2] transition-colors"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#4A90E2] text-white py-2 px-4 rounded-md hover:bg-[#357ABD] transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!submitted) setIsFormActive(false);
                }}
                className="mt-4 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </>
          )}
        </div>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          className="bg-transparent border-b border-gray-600 w-16 text-center focus:outline-none focus:border-[#4A90E2] transition-colors mt-8"
          name="password"
        />
      </div>
    </div>
  );
}

export default MainComponent;