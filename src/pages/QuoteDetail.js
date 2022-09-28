import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";

import HighlightedQuote from "../components/quotes/HighlightedQuote";
import Comments from "../components/comments/Comments";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

function QuoteDetail(props) {
  // const [addComment, setAddComment] = useState(false);
  const { quotesId } = useParams();
  const match = useRouteMatch();

  console.log(match);
  console.log(`/quotes${match.url}`);

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quotesId);
  }, [sendRequest, quotesId]);
  // const location = useLocation();

  // const url = location.pathname;

  // let addComment = true;
  // if (url.includes("comments")) {
  //   addComment = false;
  // } else {
  //   addComment = true;
  // }

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="centered">{error}</div>;
  }

  if (!loadedQuote.text) {
    return <p>No Quote Found</p>;
  }

  return (
    <section>
      <h1>Quote Detail Page</h1>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />

      <Route path={`/quotes/${quotesId}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </section>
  );
}

export default QuoteDetail;
