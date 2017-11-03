#!/bin/bash
docker run --detach --name ubot -p 5000:8080 --network unetwork ubot_img:latest main.py
