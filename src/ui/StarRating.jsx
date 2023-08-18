import { useState } from "react";
import { BsStarFill, BsStar } from "react-icons/bs";

function StarRating({ stars, isEditing, rating, setRating }) {
  const [tempRating, setTempRating] = useState(0);
  function handleRating(rating) {
    setRating(rating);
  }
  if (!isEditing) {
    return (
      <div className="flex gap-1 mb-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} fill={i < stars ? true : false} inactive={true} />
        ))}
      </div>
    );
  }
  return (
    <div className="flex gap-1 mb-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          fill={
            tempRating
              ? i < tempRating
                ? true
                : false
              : i < rating
              ? true
              : false
          }
          onRate={() => handleRating(i + 1)}
          onHoverIn={() => setTempRating(i + 1)}
          onHoverOut={() => setTempRating(0)}
        />
      ))}
    </div>
  );
}

export default StarRating;

function Star({ fill, onRate, onHoverIn, onHoverOut, inactive = false }) {
  return (
    <span
      role={inactive ? "" : "button"}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {fill ? <BsStarFill className="h-2.5" /> : <BsStar className="h-2.5" />}
    </span>
  );
}
