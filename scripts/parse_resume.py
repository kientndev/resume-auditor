import os
import re
import sys
from typing import List
from pydantic import BaseModel, Field, field_validator
from google import genai
from google.genai import types

class ParsedResume(BaseModel):
    name: str = Field(..., description="The full name of the candidate.")
    email: str = Field(..., description="The contact email address of the candidate.")
    years_of_experience: int = Field(..., description="Total estimated years of professional experience.")
    core_technical_skills: List[str] = Field(..., description="A list of core technical/hard skills.")
    past_job_titles: List[str] = Field(..., description="List of unique job titles held in the past.")
    summary: str = Field(
        ...,
        description="A concise summary of the candidate's professional profile. MUST be exactly two sentences."
    )

    @field_validator("summary")
    @classmethod
    def validate_two_sentences(cls, v: str) -> str:
        # Split into sentences using punctuation delimiters (.!? followed by whitespace or end)
        sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+', v.strip()) if s.strip()]
        if len(sentences) != 2:
            raise ValueError(f"Summary must be exactly 2 sentences long, but got {len(sentences)} sentences.")
        return v

def parse_resume_text(raw_text: str) -> ParsedResume:
    """
    Parses raw resume text into a structured ParsedResume Pydantic model
    using the official Google GenAI SDK with native Pydantic structured output.
    """
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable is not set.")

    # Initialize the client using the official google-genai SDK
    client = genai.Client(api_key=api_key)

    # Enforce native structured JSON schema directly from the Pydantic model
    response = client.models.generate_content(
        model=os.environ.get("GEMINI_MODEL", "gemini-2.5-flash"),
        contents=(
            "Extract structured data from the following resume text. "
            "Ensure the summary field is exactly 2 sentences long:\n\n"
            f"{raw_text}"
        ),
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=ParsedResume,
            temperature=0.1,
        ),
    )

    if not response.text:
        raise RuntimeError("LLM returned an empty response.")

    # Parse and validate the response against the Pydantic schema
    try:
        return ParsedResume.model_validate_json(response.text)
    except Exception as e:
        # Enhanced debugging for schema mismatch
        print(f"Validation failed on LLM output: {response.text}", file=sys.stderr)
        raise e

if __name__ == "__main__":
    # Quick CLI harness for validation
    mock_resume = """
    Jane Doe
    jane.doe@example.com
    Over the last 6 years, I have worked as a Lead Developer and Senior Software Engineer.
    Expertise in Python, TypeScript, React, Docker, and PostgreSQL.
    I love building highly scalable AI applications. I specialize in fast API integrations.
    """
    os.environ.setdefault("GEMINI_API_KEY", "your-api-key-here") # Replace with actual key for manual runs
    
    try:
        parsed = parse_resume_text(mock_resume)
        print("Success! Parsed Resume Object:")
        print(parsed.model_dump_json(indent=2))
    except Exception as err:
        print(f"Error: {err}")
