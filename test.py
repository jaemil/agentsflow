# import subprocess
# import time

# Start the subprocess with a shell command
# pipe = subprocess.Popen(['python', 'C:/Users/emilh/Desktop/Git/autogen/agents.py', 'What is your purpose?'], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

# print(pipe)

# Sleep for a while to make sure the subprocess has started
# time.sleep(2.5)

# Send input to the subprocess
# pipe.stdin.write(b'test\n')

# out, err = pipe.communicate()

# print(out, err)

# Read the output from the subprocess
# output = pipe.stdout.read().decode('utf-8')

# Print the output

# print(output)


import subprocess
import time

# List of commands to execute
commands = ["command1", "command2", "command3"]

# Launch a new CMD window
cmd_process = subprocess.Popen(["cmd.exe"], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

# Wait for a moment to ensure the CMD window is ready
time.sleep(2)

# Run commands in the CMD window with a 2-second delay
for command in commands:
    cmd_process.stdin.write(command + '\n')
    cmd_process.stdin.flush()
    time.sleep(2)

# Close the CMD window
cmd_process.stdin.close()
cmd_process.wait()

# Check the output and error streams
stdout_output = cmd_process.stdout.read()
stderr_output = cmd_process.stderr.read()

if stdout_output:
    print("Standard Output:")
    print(stdout_output)

if stderr_output:
    print("Standard Error:")
    print(stderr_output)