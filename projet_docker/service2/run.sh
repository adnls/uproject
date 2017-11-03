#!/bin/bash
docker run --detach --name scanner --network unetwork scanner_img:latest main_v2.py
