import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

function NewQoute(props) {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
  }, [status, history]);

  const addQouteHandler = (quoteData) => {
    sendRequest(quoteData);
  };
  return (
    <div>
      <QuoteForm
        isLoading={status === "pending"}
        onAddQuote={addQouteHandler}
      />
    </div>
  );
}

export default NewQoute;
