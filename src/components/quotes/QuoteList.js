import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuote = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();

  //Access the Location of current Location
  const queryParams = new URLSearchParams(location.search);

  //Update the state with respect to the location state
  const isSortAscending = queryParams.get("sort") === "asc";

  //Since this compoenent rerenders before every sort the state would always be reevaluated
  const sortedQuote = sortQuote(props.quotes, isSortAscending);

  //Sort's the app using query parameters
  const changeSortOrder = () => {
    history.push(
      `${location.pathname}?sort=${!isSortAscending ? "asc" : "dsc"}`
    );
  };
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortOrder}>
          Sort {isSortAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuote.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
