import axios from "axios";
import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { Button } from "react-bootstrap";

const Quote = () => {
  const [currentQuote, setCurrentQuote] = useState(
    "Whoever is happy will make others happy too."
  );
  const [currentAuthor, setCurrentAuthor] = useState("Anne Frank");
  const getQuote = async () => {
    const quoteResponse = await axios.get(
      "https://api.api-ninjas.com/v1/quotes",
      {
        headers: {
          "X-Api-Key": process.env.REACT_APP_QUOTE_KEY,
        },
        params: {
          category: "inspirational",
        },
      }
    );
    setCurrentQuote(quoteResponse.data[0].quote);
    setCurrentAuthor(quoteResponse.data[0].author);
  };
  useEffect(() => {
    getQuote();
  }, []);
  const hideQuote = () => {
    const quote = document.getElementById("quote");
    quote.classList.add("hidden");
  };
  return (
    <Draggable>
      <div className="widget container lightMode" id="quote">
        <blockquote>
          {currentQuote}
          <footer> - {currentAuthor}</footer>
        </blockquote>
        <Button onClick={getQuote}>Change Quote</Button>
        <Button onClick={hideQuote}>Hide Quote</Button>
      </div>
    </Draggable>
  );
};

export default Quote;
