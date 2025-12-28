#!/bin/bash

uvicorn src.app:app --factory --port 3001 --reload --reload-dir src