/* eslint-disable react/prop-types */
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";

const MAX_REVIEW_LENGTH = 200;
const TOTAL_STARS = 5;

const ReviewModal = ({ setIsReviewOpen }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!rating) {
      setStatusMessage("Please select a star rating.");
      return;
    }

    if (!termsAccepted) {
      setStatusMessage("Please accept the terms and conditions.");
      return;
    }

    const reviewData = {
      rating: parseInt(rating, 10), // Ensure integer rating
      title: reviewTitle.trim(),
      review: reviewText.trim(),
      termsAccepted,
    };

    setIsSubmitting(true);
    setStatusMessage("Submitting...");

    try {
      const response = await axios.post("http://localhost:3000/submitReview", reviewData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setStatusMessage("Review submitted successfully!");
        setRating(0);
        setReviewTitle("");
        setReviewText("");
        setTermsAccepted(false);
      } else {
        setStatusMessage("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setStatusMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      // setStatusMessage(error)
    }

    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-brightness-50 backdrop-blur-sm">
      {/* Close Button */}
      <button
        aria-label="Close Review Modal"
        className="absolute top-2 right-5 lg:top-8 lg:right-10 text-secondary_2"
        onClick={() => setIsReviewOpen(false)}
      >
        <CloseIcon style={{ fontSize: "2rem" }} />
      </button>

      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-lg z-10 w-11/12 max-w-lg p-6 relative">
        <h2 className="text-2xl font-semibold mb-4">Write a Review</h2>

        {/* Star Rating */}
        <div className="flex mb-4">
          {[...Array(TOTAL_STARS)].map((_, index) => {
            const starValue = index + 1;
            return (
              <StarIcon
                key={starValue}
                onMouseEnter={() => setHoverRating(starValue)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(starValue)}
                className={`cursor-pointer transition-colors duration-200 ${
                  (hoverRating || rating) >= starValue
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                style={{ fontSize: "2rem" }}
              />
            );
          })}
        </div>

        {/* Review Title */}
        <input
          type="text"
          placeholder="Review Title"
          value={reviewTitle}
          onChange={(e) => setReviewTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-secondary_2"
        />

        {/* Review Text */}
        <div className="relative mb-4">
          <textarea
            placeholder="Your Review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            maxLength={MAX_REVIEW_LENGTH}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary_2 resize-none"
          ></textarea>
          <div className="absolute bottom-2 right-2 text-xs text-gray-500">
            {reviewText.length}/{MAX_REVIEW_LENGTH}
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            id="termsCheckbox"
            className="w-4 h-4 mr-2 cursor-pointer transform transition-transform duration-150"
          />
          <label
            htmlFor="termsCheckbox"
            className="text-sm text-gray-700 select-none"
          >
            I accept the terms and conditions
          </label>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <p className="text-sm text-gray-600 mb-4">{statusMessage}</p>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            disabled={isSubmitting}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
            onClick={() => setIsReviewOpen(false)}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 bg-secondary_2 text-white rounded hover:bg-banner_2 hover:text-secondary_2 transition-transform transform active:scale-95"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
