#!/bin/bash

uvicorn backend.api.app:app --factory --port 3001