#!/bin/bash
docker run --detach --name sql_server -e MYSQL_ROOT_PASSWORD=123azerty --network unetwork mysql:5.7
