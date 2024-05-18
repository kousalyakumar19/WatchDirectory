# DirWatcher

## Prerequisites
- Node.js (version - v20.13.1)
- MySQL (version - 8.0.3)

## Installation
1. Clone the repository
2. Install dependencies using command (npm install)

## Execution
1. Run command ---> .\start.cmd
Once the execution starts you can hit the API URL.

## Schema diagram 
schema diagram of the database design is stored as 'Dbschema.jpg' in DirWatch folder.


                                                   API ENDPOINTS
-------------------------------------------------------------------------------------------------------------------------------------------------
Route           | Method   |      Description                    |  Body                                 | Response                             |
----------------|----------|-------------------------------------|---------------------------------------|--------------------------------------|
/config         |   put    | To update the configuration         |  directoryPath, interval,magicString  | Configuration updated successfully   |
/tasks          |   get    | To Get all task details             |                   nil                 | List of tasks                        |
/tasks/start    |   post   | To start background process manually| directoryPath, interval,magicString   | Background task started successfully |
/tasks/stop     |   post   | To stop background process manually |       id in query param               | Background task stopped successfully |
-------------------------------------------------------------------------------------------------------------------------------------------------