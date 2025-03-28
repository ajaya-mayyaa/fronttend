import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

function CodeReview({ review }) {
  return (
    <div className="right">
      <Markdown rehypePlugins={[rehypeHighlight]}>
        {review}
      </Markdown>
    </div>
  );
}

export default CodeReview;
