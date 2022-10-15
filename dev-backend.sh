#!/bin/sh
uvicorn backend.cmd.main:app --port 8080 --reload
