#!/bin/bash

uvicorn api.chat:app --factory --port 3001 --reload --reload-dir api