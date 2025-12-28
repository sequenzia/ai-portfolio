#!/bin/bash

uvicorn api.app:app --factory --port 3001 --reload --reload-dir api