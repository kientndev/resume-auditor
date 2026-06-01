import os
import logging
from convex import ConvexClient
from parse_resume import parse_resume_text

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger("convex_bridge")

def calculate_match_score(parsed_data) -> float:
    """
    Placeholder/heuristic matching score logic.
    Calculates a match score (0.0 to 100.0) based on skills and experience.
    """
    base_score = min(parsed_data.years_of_experience * 10.0, 50.0)  # Up to 50 pts for experience
    skills_score = min(len(parsed_data.core_technical_skills) * 5.0, 50.0) # Up to 50 pts for skills
    return float(base_score + skills_score)

def process_unparsed_candidates():
    """
    Automated bridge that fetches unparsed candidates from Convex,
    processes their resumes using LLM structured extraction,
    and updates the database with structured JSON, match scores, and parsed status.
    """
    convex_url = os.environ.get("CONVEX_URL")
    if not convex_url:
        logger.error("CONVEX_URL environment variable is missing.")
        return

    # Initialize the Convex Python client
    client = ConvexClient(convex_url)

    logger.info("Fetching unparsed candidates from Convex...")
    try:
        # Fetch unparsed candidates (mocked Convex query)
        candidates = client.query("candidates:getUnparsed")
        logger.info(f"Found {len(candidates)} candidate(s) to process.")
    except Exception as e:
        logger.error(f"Failed to fetch candidates from Convex: {e}")
        return

    for candidate in candidates:
        candidate_id = candidate.get("_id")
        raw_text = candidate.get("rawText") # Assumes raw resume text is stored on the candidate record

        if not candidate_id:
            logger.warning("Skipping candidate record with missing ID.")
            continue

        if not raw_text:
            logger.warning(f"Candidate {candidate_id} has no raw resume text to process. Skipping.")
            continue

        logger.info(f"Processing candidate {candidate_id} ({candidate.get('name', 'Unknown')})...")

        try:
            # Step 1: Parse the raw text to structured Pydantic object
            parsed_resume = parse_resume_text(raw_text)

            # Step 2: Compute a match score based on parsed results
            match_score = calculate_match_score(parsed_resume)

            # Step 3: Mutate the record in Convex with structured JSON and parsed status
            client.mutation(
                "candidates:updateParsedData",
                {
                    "id": candidate_id,
                    "parsedJson": parsed_resume.model_dump(), # Serialize Pydantic object to dict
                    "matchScore": match_score,
                    "status": "parsed"
                }
            )
            logger.info(f"Successfully processed and updated candidate {candidate_id}.")

        except Exception as err:
            # Log the error and continue processing the rest of the queue
            logger.error(f"Failed to process candidate {candidate_id}: {err}", exc_info=True)

if __name__ == "__main__":
    # Ensure environment variables are set or loaded before execution
    os.environ.setdefault("CONVEX_URL", "https://your-convex-deployment-url.convex.cloud")
    process_unparsed_candidates()
