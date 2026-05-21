import sys
import os
import re

def parse_pdf(file_path):
    try:
        from pypdf import PdfReader
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            t = page.extract_text()
            if t:
                text += t + "\n"
        return text.strip()
    except Exception as e:
        raise RuntimeError(f"Error parsing PDF: {str(e)}")

def parse_docx(file_path):
    try:
        import docx
        doc = docx.Document(file_path)
        text = []
        for para in doc.paragraphs:
            text.append(para.text)
        return "\n".join(text).strip()
    except Exception as e:
        raise RuntimeError(f"Error parsing DOCX: {str(e)}")

def parse_doc(file_path):
    # Try win32com.client if available (requires MS Word on Windows)
    try:
        import win32com.client
        # Ensure we use the absolute path
        abs_path = os.path.abspath(file_path)
        
        # Initialize COM
        import pythoncom
        pythoncom.CoInitialize()
        
        word = win32com.client.DispatchEx("Word.Application")
        word.Visible = False
        doc = word.Documents.Open(abs_path)
        text = doc.Content.Text
        doc.Close()
        word.Quit()
        return text.strip()
    except Exception as e:
        # Fallback: Extract printable strings from binary file
        try:
            with open(file_path, 'rb') as f:
                content = f.read()
            # Extract sequences of printable characters (ASCII/UTF-8 compatible)
            matches = re.findall(b'[\x20-\x7e\n\r\t]{4,}', content)
            extracted = []
            for m in matches:
                try:
                    extracted.append(m.decode('utf-8', errors='ignore'))
                except Exception:
                    pass
            text = "\n".join(extracted)
            # Remove excessive consecutive whitespaces/newlines to make it clean
            text = re.sub(r'\n+', '\n', text)
            text = re.sub(r' +', ' ', text)
            return text.strip()
        except Exception as fallback_err:
            raise RuntimeError(f"Error parsing DOC (both Word COM and binary fallback failed): {str(e)} | {str(fallback_err)}")

def parse_txt(file_path):
    encodings = ['utf-8', 'latin-1', 'utf-16', 'utf-16le', 'utf-16be', 'cp1252']
    for encoding in encodings:
        try:
            with open(file_path, 'r', encoding=encoding) as f:
                return f.read().strip()
        except (UnicodeDecodeError, LookupError):
            continue
    # Absolute fallback
    try:
        with open(file_path, 'r', errors='ignore') as f:
            return f.read().strip()
    except Exception as e:
        raise RuntimeError(f"Error parsing TXT: {str(e)}")

def main():
    if len(sys.argv) < 2:
        print("Usage: python parser.py <file_path>", file=sys.stderr)
        sys.exit(1)

    file_path = sys.argv[1]

    # --- Path traversal guard ---
    # Resolve symlinks and normalize to an absolute path, then confirm
    # the file lives inside the OS temp directory to prevent traversal attacks.
    import tempfile
    resolved_path = os.path.realpath(os.path.abspath(file_path))
    temp_dir = os.path.realpath(tempfile.gettempdir())
    if not resolved_path.startswith(temp_dir + os.sep) and resolved_path != temp_dir:
        print(f"Error: Refusing to process file outside of temp directory: {resolved_path}", file=sys.stderr)
        sys.exit(1)
    file_path = resolved_path
    # ----------------------------

    if not os.path.exists(file_path):
        print(f"Error: File not found: {file_path}", file=sys.stderr)
        sys.exit(1)

    ext = os.path.splitext(file_path)[1].lower()

    # Reconfigure stdout to use utf-8 to prevent Windows console encoding errors
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')

    try:
        if ext == '.pdf':
            text = parse_pdf(file_path)
        elif ext == '.docx':
            text = parse_docx(file_path)
        elif ext == '.doc':
            text = parse_doc(file_path)
        elif ext == '.txt':
            text = parse_txt(file_path)
        elif ext in ['.xlsx', '.xls', '.csv']:
            print("Error: Excel files are explicitly blocked.", file=sys.stderr)
            sys.exit(2)
        else:
            print(f"Error: Unsupported file type: {ext}", file=sys.stderr)
            sys.exit(1)

        if not text:
            print("Warning: No text could be extracted from this document.", file=sys.stderr)
            
        print(text)
        sys.exit(0)

    except Exception as e:
        print(f"Error processing file: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()
