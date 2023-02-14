import axios from "axios";
import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { Button } from "react-bootstrap";

const Quote = () => {
  const [currentQuote, setCurrentQuote] = useState("hello");
  const [currentAuthor, setCurrentAuthor] = useState("Author");
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
  return (
    <Draggable>
      <div className="widget container lightMode">
        <blockquote>
          {currentQuote}
          <footer> - {currentAuthor}</footer>
        </blockquote>
        <Button onClick={getQuote}>Change Quote</Button>
      </div>
    </Draggable>
  );
};

export default Quote;
