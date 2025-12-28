#!/bin/bash

uvicorn api.chat:create_app --factory --port 3001 --reload --reload-dir api