import subprocess

command = ["pdm", "run", "uvicorn", "server:app", "--port", "8999"]


def uvi():
    try:
        process = subprocess.Popen(command)
        process.wait()
    except Exception as e:
        print(f"Error occurred: {e}")
