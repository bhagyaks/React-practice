# React practice
Verification engine is based on checks. Every verification session has a set of required checks that must be answered for the decision to be made.

# Tech Stack
● React.js

● Javascript

● Html

● css

# Details
In api.js file you can see a simple implementation of mock API with 2 functions:

● fetchChecks – returns a list of checks in the format { id: string,
priority: number, description: string }[]

● submitCheckResults – intended to submit check results in the format of {
checkId: string, value: string }[]

I have fetched and display a list of checks, allow them to be answered as Yes /
No and display the Submit button. When Submit is clicked, check results will be
submitted and show a success screen.

Next checks should be disabled unless all checks above are answered. Submit
button becomes available when either:
1. All checks are answered as Yes
2. At least one check is answered as No

Checks can be answered by either mouse (click on Yes or No) or via keyboard
shortcuts. Keyboard shortcuts work as follows:

● Arrow Up and Arrow Down to move between checks

● 1 to answer check as Yes

● 2 to answer check as No

# Demo

1. Mouse capture

![mouse-capture](https://user-images.githubusercontent.com/88626686/137091288-26a45aad-ddab-445a-bcec-4328d6bc3013.gif)


2. Keyboard capture

![keyboard-capture](https://user-images.githubusercontent.com/88626686/137091326-fb197ee6-5f0d-4c21-9ee1-f482f419afc3.gif)

