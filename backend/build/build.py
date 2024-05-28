import os
import subprocess
import sys

def run_command(command):
    """Run a system command and handle errors."""
    result = subprocess.run(command, shell=True)
    if result.returncode != 0:
        print(f"Error: Command '{command}' failed with exit code {result.returncode}")
        sys.exit(result.returncode)

def build_project():
    """Build the project."""
    print("Building the project...")
    # Add your build commands here if needed
    # Example: run_command("python setup.py sdist bdist_wheel")
    pass  # Assuming no specific build steps are needed for this project

def run_tests():
    """Run the test suite."""
    print("Running tests...")
    # Using pytest for running tests
    run_command("pytest")

def create_docker_image():
    """Create a Docker image."""
    print("Creating Docker image...")
    image_name = "alphalegal.azurecr.io/backend:v1"  
    run_command(f"docker build -f Dockerfile.dev -t {image_name} .")

def upload_docker_image():
    """Upload the Docker image to Azure Container Registry."""
    print("Uploading Docker image...")
    image_name = "alphalegal.azurecr.io/backend:v1" 
    run_command(f"docker push {image_name}")

if __name__ == "__main__":
    build_project()
    run_tests()
    create_docker_image()
    upload_docker_image()
