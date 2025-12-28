#!/bin/bash

uvicorn api:app --factory --port 3001 --reload --reload-dir api